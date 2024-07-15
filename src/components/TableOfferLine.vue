<template>
  <div>
    <b-container fluid>
      <!-- Table -->
      <b-table
        striped
        bordered
        head-variant="dark"
        foot-variant="white"
        small
        responsive="sm"
        show-empty
        :items="offer.offerLines"
        :fields="fields"
      >
        <template #head()="data">
          <span style="font-size:16px">{{ data.label }}</span>
        </template>

        <template #cell(productCode)="data">
          <b-form-input class="border-0 no-shadow p-1" type="text" v-model="offer.offerLines[data.index].productCode"></b-form-input>
        </template>

        <template #cell(productDescription)="data">
          <b-form-input class="border-0 no-shadow p-1" type="text" v-model="offer.offerLines[data.index].productDescription"></b-form-input>
        </template>

        <template #cell(productBrand.name)="data">
          <b-form-select
            v-model="offer.offerLines[data.index].productBrand"
            class="mb-3"
            disabled-field="notEnabled"
          >
            <option v-for="brand in brands" :value="brand">
              {{ brand.name }}
            </option>
          </b-form-select>
        </template>

        <template #cell(quantity)="data">
          <b-form-input class="border-0 no-shadow p-1" type="number" step="0.01" v-model="offer.offerLines[data.index].quantity"></b-form-input>
        </template>

        <template #cell(purchasingCost)="data">
          <b-form-input class="border-0 no-shadow p-1" type="number" step="0.01" v-model="offer.offerLines[data.index].purchasingCost"></b-form-input>
        </template>

        <template #cell(costingType)="data">
          <b-form-select
            v-model="offer.offerLines[data.index].costingType"
            class="mb-3"
            disabled-field="notEnabled"
          >
            <option v-for="theCostingType in costingTypes" :value="theCostingType[0]">
              {{ theCostingType[1] }}
            </option>
          </b-form-select>
        </template>

        <template #cell(factor)="data">
          <b-form-input class="border-0 no-shadow p-1" type="number" step="0.01" v-model="offer.offerLines[data.index].factor"></b-form-input>
        </template>

        <template #cell(duration)="data">
          <b-form-input class="border-0 no-shadow p-1" type="text" v-model="offer.offerLines[data.index].duration"></b-form-input>
        </template>

        <template #cell(unitPrice)="data">
          <span><b>{{ Math.round( (Number(offer.offerLines[data.index].purchasingCost) * Number(offer.offerLines[data.index].factor)) * 100.0) / 100.0 }}</b></span>
        </template>

        <template #cell(totalPrice)="data">
          <span><b>{{ Math.round( (Number(offer.offerLines[data.index].purchasingCost) * Number(offer.offerLines[data.index].quantity) * Number(offer.offerLines[data.index].factor)) * 100.0) / 100.0 }}</b></span>
        </template>

        <template #cell(actions)="data">
          <b-button size="sm" @click="removeRowHandler(data.index)" class="mr-1">
            <i class="ti-trash"></i>
          </b-button>
        </template>

      </b-table>
    </b-container>


    <div class="p-3">
      <b-row>
        <b-col>
          <b-button variant="secondary" @click="addRowHandler">
            <i class="ti-plus"></i>
          </b-button>
        </b-col>
        <b-col>
          <div style="text-align:right">
            <p>Toplam Teklif Tutarı: <b>{{ totalAll }}</b></p>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapMutations } from "vuex";


export default {
  props: ["brands", "costingTypes"],
  data() {
    return {
      fields: [
        {
          key: "productCode",
          label: "Ürün Kodu"
        },
        {
          key: "productDescription",
          label: "Ürün Tanımı"
        },
        {
          key: "productBrand.name",
          label: "Marka"
        },
        {
          key: "quantity",
          label: "Miktar"
        },
        {
          key: "purchasingCost",
          label: "Alış Fiyatı"
        },
        {
          key: "costingType",
          label: "Alış Tipi"
        },
        {
          key: "factor",
          label: "Faktör"
        },
        {
          key: "duration",
          label: "Teslim Süresi"
        },
        {
          key: "unitPrice",
          label: "Birim Fiyatı"
        },
        {
          key: "totalPrice",
          label: "Toplam"
        },
        {
          key: "actions",
          label: "Actions"
        }
      ],
    };
  },
  created() {

  },
  computed: {
    ...mapGetters(['getConf', 'getOffer']),
    offer:{
      get(){
        return this.getOffer;
      },
      set(val){
        this.setOffer(val);
      }
    },

    totalAll(){
      return this.offer.offerLines.reduce(function(partialSum, x){return partialSum + (Number(x.purchasingCost)*Number(x.quantity)*Number(x.factor) || 0)}, 0);
    }
  },
  methods: {
    ...mapMutations([
      "setOffer"
    ]),
    addRowHandler(event) {
      //event.preventDefault()
      console.log(this.offer.offerLines);
      this.offer.offerLines.push({id: 0});
    },
    removeRowHandler(index) {
      this.offer.offerLines = this.offer.offerLines.filter((item, i) => i !== index);
      this.$emit('input', this.offer.offerLines);
    }
  }
};
</script>

<style scope>

</style>
