<template>
  <div>

    <!-- Table -->
    <div class="d-flex justify-content-center mb-3">
      <b-spinner v-if="loading" />
      <table-offer 
      :offers="offers" 
      :offerStatus="offerStatus" 
      :customers="customers" 
      :currencies="currencies"
      :brands="brands" 
      :costingTypes="costingTypes" 
      v-else></table-offer>
    </div>
  </div>
</template>

<script>

import TableOffer from "../components/TableOffer.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: { TableOffer },
  data() {
    return {
      loading: true,
      offers: [],
      offerStatus: null,
      customers: null,
      currencies: null,
      brands: null,
      costingTypes: null,
    };
  },
  created: async function () {

    try {
      const res = await Promise.all([
        axios.get("/offers", this.getConf),
        axios.get("/enums/offer-status", this.getConf),
        axios.get("/customers", this.getConf),
        axios.get("/currencies", this.getConf),
        axios.get("/product-brands", this.getConf),
        axios.get("/enums/costing-types", this.getConf),
      ]);
      const data = res.map((res) => res.data);

      this.offers = data[0];
      this.offerStatus = data[1];
      this.customers = data[2];
      this.currencies = data[3];
      this.brands = data[4];
      this.costingTypes = data[5];

      this.loading = false;
    } catch {
      this.loading = true;
      throw Error("Promise failed");
    }
  },
  computed: {
    ...mapGetters(['getConf']),
    customComp(){

    }
  }
};
</script>

<style>
</style>