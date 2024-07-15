const state = {
    offer : null
}

const getters = {
    getOffer(state){
        return state.offer;
    }
}

const mutations = {
    setOffer(state, payload){
        state.offer = payload;
    }
}

const actions = {
    setOfferAsync({commit}, payload){
        commit("setOffer", payload);
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}