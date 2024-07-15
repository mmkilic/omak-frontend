<template>
  <div>
    <!--Overview Cards-->
    <cards-main></cards-main>
    
    <!-- Table -->
    <div>
      <b-spinner class="align-middle" v-if="loading" />
      <table-main :projects="projects" v-else></table-main>
    </div>

  </div>
</template>

<script>
import TableMain from '../components/TableMain.vue';
import CardsMain from '../components/CardsMain.vue';
import axios from "axios";

export default {
  components: {
    TableMain,
    CardsMain
  },
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-bolt",
          title: "ODT-GA",
          value: "105GB",
          footerText: "On-Time / Project Count",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-bolt",
          title: "MPT-GA",
          value: "$1,345",
          footerText: "On-Time / Project Count",
          footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "ODT-BOM",
          value: "23",
          footerText: "On-Time / Project Count",
          footerIcon: "ti-timer"
        },
        {
          type: "info",
          icon: "ti-pulse",
          title: "MPT-BOM",
          value: "+45",
          footerText: "On-Time / Project Count",
          footerIcon: "ti-reload"
        }
      ],
      loading: false,
      projects: [],
    };
  },
  created: async function () {

  },
};
</script>
<style>
</style>
