<template>
  <b-navbar toggleable="lg" variant="success">
    <b-navbar-brand href="/">CRM Application</b-navbar-brand>
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <!-- Using 'button-content' slot -->
        <template #button-content>
          <em>{{fullName}}</em>
        </template>
        <b-dropdown-item @click="logout">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      fullName: ""
    };
  },
  created(){
    this.fullName = JSON.parse(localStorage.getItem('fullName'));
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('authorities');
      localStorage.removeItem('fullName');
      this.$router.push('login');
    },
  }
};
</script>


<style>
</style>
