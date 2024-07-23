<template>
  <b-navbar toggleable="lg" variant="success">
    
    <b-navbar-brand href="/">CRM Application</b-navbar-brand>

    <button type="button"
            class="navbar-toggler navbar-toggler-right"
            :class="{toggled: $sidebar.showSidebar}"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="toggleSidebar">
      <span class="navbar-toggler-bar burger-lines"></span>
      <span class="navbar-toggler-bar burger-lines"></span>
      <span class="navbar-toggler-bar burger-lines"></span>
    </button>

    <div class="collapse navbar-collapse justify-content-end">
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <em>{{fullName}}</em>
          </template>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
    
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
  computed: {
    routeName () {
      const {name} = this.$route
      return this.capitalizeFirstLetter(name)
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('authorities');
      localStorage.removeItem('fullName');
      this.$router.push('login');
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
  }
};
</script>


<style>
</style>
