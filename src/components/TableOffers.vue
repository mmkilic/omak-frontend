<template>
  <div>
    <b-container fluid>

      <!-- Top Fillter Area -->
      <b-row>
        <b-col lg="2" class="my-1">
          <b-button-group>
            <b-button @click="newOfferModal">Yeni Teklif</b-button>
          </b-button-group>
        </b-col>
        <b-col lg="10" class="my-1">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input id="filter-input" v-model.trim="filter" type="search" placeholder="Type to Search"></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Table -->
      <b-table
        striped
        bordered
        head-variant="dark"
        small
        responsive="sm"
        show-empty
        sort-icon-right
        :items="offers"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-ignored-fields="filterOn"
        @filtered="onFiltered"
      >
        <template #head()="data">
          <span style="font-size:16px">{{ data.label }}</span>
        </template>
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>
        <template #cell(dateCreated)="data">
          {{ data.item.dateCreated.split('T')[0] }}
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" @click="editModalOpen(row.item, $event.target)" class="mr-1">
            <i class="ti-pencil" title="Düzenle"></i>
          </b-button>
          <b-button size="sm" @click="downloadOfferLetter(row.item)" class="mr-1">
            <i class="ti-download" title="Sipariş Mektubu"></i>
          </b-button>
          <b-button size="sm" @click="offerToOrder(row.item)" class="mr-1">
            <i class="ti-wand" title="Sipariş"></i>
          </b-button>
          <b-button size="sm" @click="cancelOffer(row.item)" class="mr-1">
            <i class="ti-na" title="İptal"></i>
          </b-button>
        </template>
      </b-table>

      <!-- Bottom Page Area -->
      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>

      <!-- Info modal -->
      <b-modal 
      id="offer-modal" 
      class="bg-variant-dark" 
      size="xl" 
      scrollable 
      hide-footer 
      bg-dark 
      v-b-modal.modal-offer
      :title="modalTitle" 
      @hide="closeModal">
        <modal-offer 
        :modalEdit="modalEdit"
        :customers="customers"
        :currencies="currencies"
        :brands="brands" 
        :costingTypes="costingTypes" ></modal-offer>
      </b-modal>

    </b-container>
  </div>
</template>

<script>

import ModalOffer from '../components/ModalOffer.vue';
import { mapGetters, mapMutations } from "vuex";
import axios from "axios";

export default {
  components: {
    ModalOffer,
  },
  props: ["offers", "customers", "currencies", "brands", "costingTypes"],
  data() {
    return {
      fields: [
        {
          key: "Index",
          label: "Idx"
        },
        {
          key: "id",
          label: "Teklif Numarası",
          sortable: true,
        },
        {
          key: "dateCreated",
          label: "Teklif Tarihi",
          sortable: true,
        },
        {
          key: "customer.name",
          label: "Firma",
          sortable: true,
        },
        {
          key: "contact.fullName",
          label: "Müşteri",
          sortable: true,
        },
        {
          key: "salesman.fullName",
          label: "Satış Personali",
          sortable: true,
        },
        {
          key: "currency.symbol",
          label: "Birim",
          sortable: true,
        },
        {
          key: "amount",
          label: "Teklif Tutarı",
          sortable: true,
        },
        {
          key: "totalAmount",
          label: "Tolam Tutar",
          sortable: true,
        },
        {
          key: "status",
          label: "Durum",
          sortable: true,
        },
        { 
          key: 'actions', 
          label: 'Actions' 
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 50, 100],
      filter: null,
      filterOn: ['dateCreated', 'currency.symbol', 'amount', 'totalAmount', 'actions'],
      modalTitle: "",
      modalEdit: false,
      offerNew: null
    };
  },
  mounted() {
    this.totalRows = this.offers.length;
  },
  computed: {
    ...mapGetters(['getConf', 'getOffer']),
  },
  created: async function () {
    
  },
  methods: {
    ...mapMutations([
      "setOffer"
    ]),
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    editModalOpen(item, button) {
      this.modalTitle = `Teklif Numarası: ${item.id}`;
      this.modalEdit = true;
      this.setOffer(item);
      this.$root.$emit('bv::show::modal', "offer-modal", button);
    },
    async downloadOfferLetter(item) {
      let conf = this.getConf;
      conf.responseType = 'blob';
      conf.maxBodyLength = 'Infinity';
      conf.url = `/offers/excel?offerId=${item.id}`;
      conf.method = 'post';
      console.log(conf);

      await axios.request(conf)
      .then((response) => {
        const url = URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a');
        link.href = url;
        link.download = `offer-letter-${item.id}.xlsx`;
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(url);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    closeModal() {
      this.modalTitle = '';
      this.modalEdit = false;
      this.$router.go()
    },
    async offerToOrder(item) {
      await axios.put(`/offers/order?offerId=${item.id}`, this.getConf)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
      
      this.$router.push('/order');
    },
    async cancelOffer(item) {
      await axios.delete(`/offers?offerId=${item.id}`, this.getConf)
      .then((response) => {
        item = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
      this.$router.go()
    },
    newOfferModal() {
      this.modalTitle = 'New Offer';
      this.modalEdit = false;
      this.setOffer({
          "id": 0,
          "taxRate": 0,
          "status": "OPEN",
          "dateCreated": "",
          "customer": {
              "id": 0
          },
          "currency": {
              "id": 0
          },
          "contact": {
              "id": 0
          },
          "salesman": {
              "id": 0
          },
          "offerLines": [
            {
              "id": 0,
              "productCode": "",
              "productDescription": "",
              "quantity": 0,
              "duration": "",
              "purchasingCost": 0,
              "costingType": "",
              "factor": 0,
              "productBrand": {
                  "id": 0
              }
            }
          ],
          "taxAmount": 0,
          "totalAmount": 0,
          "amount": 0
      });
      this.$root.$emit('bv::show::modal', "offer-modal");
    }
  }
};
</script>

<style scope>
  b-form-input {
    background-color: #fcfcfc;
  }
  .modal-backdrop {
    background-color: red;
  }
</style>
