<template>
  <div>

    <!-- Table -->
    <div class="d-flex justify-content-center mb-3">
      <b-spinner v-if="loading" />
      <table-offers 
      :offers="offers" 
      :offerStatus="offerStatus" 
      :customers="customers" 
      :currencies="currencies"
      :brands="brands" 
      :costingTypes="costingTypes" 
      v-else></table-offers>
    </div>
  </div>
</template>

<script>

import TableOffers from "../components/TableOffers.vue";
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  components: { TableOffers },
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
        axios.get("/customers", this.getConf),
        axios.get("/currencies", this.getConf),
        axios.get("/product-brands", this.getConf),
        axios.get("/enums/costing-types", this.getConf),
      ]);
      const data = res.map((res) => res.data);

      this.offers = data[0];
      this.customers = data[1];
      this.currencies = data[2];
      this.brands = data[3];
      this.costingTypes = data[4];

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