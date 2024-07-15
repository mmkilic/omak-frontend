<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/main" name="Main" icon="ti-panel"/>
        <sidebar-link v-if="off" to="/offer" name="Teklifler" icon="ti-bell"/>
        <sidebar-link v-if="ord" to="/order" name="Siparişler" icon="ti-view-list-alt"/>
        <sidebar-link v-if="adm" to="/admin" name="Admin Panel" icon="ti-user"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <LayoutHeader></LayoutHeader>
      <LayoutContent @click.native="toggleSidebar"></LayoutContent>
      <LayoutFooter></LayoutFooter>
    </div>
  </div>
</template>

<script>
import LayoutHeader from "./LayoutHeader.vue";
import LayoutFooter from "./LayoutFooter.vue";
import LayoutContent from "./LayoutContent.vue";
export default {
  components: {
    LayoutHeader,
    LayoutFooter,
    LayoutContent
  },
  data(){
    return{
      adm: false,
      ord: false,
      off: false,
    };
  },
  created: function (){
    const authorities = localStorage.getItem('authorities');
    if(authorities.includes("OFF")) {
      this.off = true;
    }
    if(authorities.includes("ORD")) {
      this.ord = true;
    }
    if(authorities.includes("ADM")) {
      this.adm = true;
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>

<style lang="scss">
</style>