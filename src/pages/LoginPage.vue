<template>
  <div class="container my-3 " >
    <h2 class="center">Login Form</h2>
    <div class="row py-4">
      <div class="col mx-auto">
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group-1"
            label="Email:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Password:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" block variant="primary">Login</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const loginUrl = "/auth/login";

export default {
  data() {
    return {
      email: "mehmetkilic7@hotmail.com.tr",
      password: "crm123"
    };
  },
  methods: {
    onSubmit(event) {
      let login={"email": this.email, "password":this.password};
      event.preventDefault();
      axios.post(loginUrl, login)
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', JSON.stringify(response.data.token));
        this.$router.push({path: "/"});
      })
      .catch((e) => {
        console.log(e);
      });
    },
  },
};
</script>

<style scoped>
</style>