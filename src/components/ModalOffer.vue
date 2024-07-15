<template>
  <div>
    <b-form @submit="onSubmit">
      <div class="p-2">
        <b-form-row>
          <b-col class="p-2">
            <b-form-group id="input-group-1" label-for="input-group-1" label="Teklif Numarası:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-input id="input-1" v-model="offer.id" size="sm" disabled></b-form-input>
            </b-form-group>
          </b-col>
          <b-col class="p-2">
            <b-form-group id="input-group-2" label-for="input-2" label="Durum:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-select id="input-2" v-model="offer.status" class="mb-3" disabled-field="notEnabled">
                <option v-for="theStatus in offerStatus" :value="theStatus[0]">
                  {{ theStatus[1] }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="p-2">
            <b-form-group id="input-group-3" label-for="input-3" label="Müşteri:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-select id="input-3" v-model="offer.customer.id" class="mb-3" disabled-field="notEnabled">
                <option v-for="customer in customers" :value="customer.id">
                  {{ customer.name }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col class="p-2">
            <b-form-group id="input-group-4" label-for="input-group-4" label="Vergi Oranı:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-input id="input-4" v-model="offer.taxRate" size="sm"></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="p-2">
            <b-form-group id="input-group-5" label-for="input-group-5" label="Oluşturma Tarihi:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-input id="input-5" v-model="compDateCreated" type="date" size="sm" disabled></b-form-input>
            </b-form-group>
          </b-col>
          <b-col class="p-2">
            <b-form-group id="input-group-6" label-for="input-6" label="Birim:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-select id="input-6" v-model="offer.currency.id" class="mb-3" disabled-field="notEnabled">
                <option v-for="currency in currencies" :value="currency.id">
                  {{ currency.name }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="p-2">
            <b-form-group id="input-group-7" label-for="input-7" label="Müşteri Kontak:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-select id="input-7" v-model="offer.contact.id" class="mb-3" disabled-field="notEnabled">
                <option v-for="contact in contacts" :value="contact.id">
                  {{ contact.name }}
                </option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col class="p-2">
            <b-form-group id="input-group-8" label-for="input-group-8" label="Son Güncellme:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-input id="input-8" v-model="offer.salesman.fullName" size="sm" disabled></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="p-2">
            <b-form-group id="input-group-9" label-for="input-group-9" label="Teklif Tutarı:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-input id="input-9" v-model="offer.amount" size="sm" disabled></b-form-input>
            </b-form-group>
          </b-col>
          <b-col class="p-2">
            <b-form-group id="input-group-10" label-for="input-group-10" label="Toplam Vergi:" label-size="sm" label-cols="4" label-cols-lg="4">
              <b-form-input id="input-10" v-model="offer.taxAmount" size="sm" disabled></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

        <b-form-row>
          <b-col class="p-2">
            <b-form-group id="input-group-11" label-for="input-group-11" label="Toplam Tutar:" label-size="sm" label-cols="8" label-cols-lg="2">
              <b-form-input id="input-11" v-model="offer.totalAmount" size="sm" disabled></b-form-input>
            </b-form-group>
          </b-col>
        </b-form-row>

      </div>
      <div class="p-2">
        <table-offer-line 
        :brands="brands"
        :costingTypes="costingTypes" 
        ></table-offer-line>
      </div>
      <div>
        <b-row align-v="end">
          <b-col>
            <b-button type="submit" variant="primary" style="float: right;">Submit</b-button>
          </b-col>
        </b-row>
      </div>
    </b-form>
  </div>
</template>

<script>

import TableOfferLine from '../components/TableOfferLine.vue';
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    TableOfferLine
  },
  props: ["offerStatus", "customers", "currencies", "brands", "costingTypes"],
  data() {
    return {
      contacts: null
    };
  },
  mounted(){

  },
  created: async function () {
    console.log("Offer: ", this.getOffer);

    await axios.get(`/contacts`, this.getConf)
    .then((response) => {
      this.contacts = response.data;
    })
    .catch((e) => {
      console.log(e);
    });

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

    compDateCreated(){
      return this.getOffer.dateCreated.substring(0,10);
    }
  },
  methods: {
    ...mapMutations([
      "setOffer"
    ]),
    async onSubmit(event) {
      event.preventDefault()

      console.log(JSON.stringify(this.getOffer));

      await axios.put(`/offers`, JSON.stringify(this.getOffer), this.getConf)
        .then((response) => {
          this.setOffer(response.data);
        })
        .catch((e) => {
          console.log(e);
        });

      console.log(JSON.stringify(this.getOffer));
    },
  }
};
</script>

<style scope>

</style>