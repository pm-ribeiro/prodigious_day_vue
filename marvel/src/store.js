import Vue from 'vue'
import Vuex from 'vuex'

import { findIndex } from 'lodash-es'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    comics: [],
    count: 0,
    cartTotal: 0
  },
  mutations: {
    increment (state, comic) {
      let index = findIndex(state.comics, (o) => o.id == comic.id)

      if(index === -1){
        state.comics.push({
          id: comic.id,
          title: comic.title,
          price: 2.5,
          quantity: 1
        })
      } else {
        state.comics[index].quantity++;
        //this.$set(this.cart[index], 'quantity', (this.cart[index].quantity + 1))
      }
      state.cartTotal = state.comics.reduce((accum, curr) => accum + (curr.price * curr.quantity), 0)
      state.count++;
    },
    removeFromCart(state, comicId) {
      let index = findIndex(state.comics, (o) => o.id == comicId)

      state.count =  state.count - state.comics[index].quantity
      state.comics.splice(index, 1)

      state.cartTotal = state.comics.reduce((accum, curr) => accum + (curr.price * curr.quantity), 0)
    },
  },
  actions: {

  }
})
