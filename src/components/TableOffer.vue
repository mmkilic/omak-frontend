<template>
  <div>
    <b-container fluid>

      <!-- Top Fillter Area -->
      <b-row>
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
              <b-form-input id="filter-input" v-model="filter" type="search" placeholder="Type to Search"></b-form-input>
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
        sort-icon-left
        :items="offers"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        @filtered="onFiltered"
      >
        <template #head()="data">
          <span style="font-size:16px">{{ data.label }}</span>
        </template>
        <template #cell(actions)="row">
          <b-button size="sm" @click="openEditModal(row.item, $event.target)" class="mr-1">
            <!-- Edit -->
            <i class="ti-pencil"></i>
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
      id="offer-modal-edit" 
      class="bg-variant-dark" 
      size="xl" 
      scrollable 
      hide-footer 
      bg-dark 
      :title="modalTitle" 
      @hide="closeEditModal">
        <modal-offer 
        :offerStatus="offerStatus" 
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

export default {
  components: {
    ModalOffer
  },
  props: ["offers", "offerStatus", "customers", "currencies", "brands", "costingTypes"],
  data() {
    return {
      fields: [
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
      filterOn: [],
      modalTitle: ""
    };
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.offers.length;
    
  },
  computed: {
    ...mapGetters(['getConf', 'getOffer']),
    customComp(){

    }
  },
  created: async function () {
    
  },
  methods: {
    ...mapMutations([
      "setOffer"
    ]),
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    openEditModal(item, button) {
      this.modalTitle = `Teklif Numarası: ${item.id}`;
      this.setOffer(item);
      this.$root.$emit('bv::show::modal', "offer-modal-edit", button);
    },
    closeEditModal() {
      this.modalTitle = '';
      this.setOffer(null);
    },
    async actionLink(item, button){
      
    },
    infoOk(){

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
