import Vue from "vue";
import Vuex from "vuex";
import offer from "./modules/offer";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        token : "",
    },
    getters: {
        getToken(state){
            return state.token;
        },
        getConf(state){
            return {headers: {'Content-Type': "application/json", Authorization: `Bearer ${state.token}`}};
        }
    },
    mutations: {
        setToken(state, payload){
            state.token = payload;
        }
    },
    modules: {
        offer
    }
});