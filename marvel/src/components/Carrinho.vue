<template>

  <div>
    <md-toolbar class="md-transparent" md-elevation="0">Carrinho</md-toolbar>
    <md-empty-state v-if="!cartLength" md-icon="shopping_cart" md-label="Carrinho vazio" md-description="Adicione algum produto ao carrinho e ele aparecerá aqui"></md-empty-state>
    <md-list v-if="cartLength">
      <md-list-item v-for="(cartItem, key, index) in cart" :key="index">
        <md-badge class="md-primary" :md-content="cartItem.quantity" />
        <span class="md-list-item-text" v-text="cartItem.title"></span>
        <md-button class="md-icon-button md-list-action" @click="removeFromCart(cartItem.id)">
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
  import { findIndex } from 'lodash-es'

  export default{
    name: 'carrinho',
    data() {
      return {
        cartVisible: false,
        cart: []
      }
    },
    methods: {
      addToCart(comic) {
        let index = findIndex(this.cart, (o) => o.id == comic.id)

        if(index === -1){
          this.cart.push({
            id: comic.id,
            title: comic.title,
            price: 2.5,
            quantity: 1
          })
        } else {
          this.$set(this.cart[index], 'quantity', (this.cart[index].quantity + 1))
        }
      },
      removeFromCart(comicID) {
        let index = findIndex(this.cart, (o) => o.id == comicID)
        this.$emit('decrease-cart', this.cart[index].quantity);
        this.cart.splice(index, 1);
      }
    },
    computed: {
      cartLength() {
        return this.cart.length
      },
      cartTotal() {
        return this.cart.reduce((accum, curr) => accum + (curr.price * curr.quantity), 0)
      }
    },
  }
</script>


<style lang="scss" scoped>

.md-drawer {
  width: 400px !important;
  max-width: calc(100vw - 125px);
}

</style>
