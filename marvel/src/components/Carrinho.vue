<template>

  <div>
    <md-toolbar class="md-transparent" md-elevation="0">Carrinho</md-toolbar>
    <md-empty-state v-if="!count" md-icon="shopping_cart" md-label="Carrinho vazio" md-description="Adicione algum produto ao carrinho e ele aparecerá aqui"></md-empty-state>
    <md-list v-if="count">
      <md-list-item v-for="(comic, key, index) in comics" :key="index">
        <md-badge class="md-primary" :md-content="comic.quantity" />
        <span class="md-list-item-text" v-text="comic.title"></span>
        <md-button class="md-icon-button md-list-action" @click="removeFromCart(comic.id)">
          <md-icon>remove_shopping_cart</md-icon>
        </md-button>
      </md-list-item>
      <md-list-item key="99">
        <span class="md-list-item-text" v-text="`Total: R$ ${cartTotal}`"></span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
  //import { findIndex } from 'lodash-es'
  import store from '@/store.js'
  export default{
    name: 'carrinho',
    data() {
      return {
        cart: []
      }
    },
  methods: {
    addToCart(comic) {
      store.commit('increment', comic)
    },
    removeFromCart(comicID) {
      store.commit('removeFromCart', comicID)
    }
  },
  computed: {
    cartLength() {
      return this.cart.length
    },
    cartTotal() {
      return store.state.cartTotal
      //return this.cart.reduce((accum, curr) => accum + (curr.price * curr.quantity), 0)
    },
    comics(){
      return store.state.comics
    },
    count(){
      return store.state.count
    },
  }

  }
</script>


<style lang="scss" scoped>

.md-drawer {
  width: 400px !important;
  max-width: calc(100vw - 125px);
}

</style>
