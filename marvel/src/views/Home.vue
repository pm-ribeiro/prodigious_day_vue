<template>
  <div class="home">
    <md-app md-mode="reveal">
      <!-- Navbar -->
      <md-app-toolbar class="md-primary">
        <img class="logo" src="../assets/logo.png">
        <md-menu md-direction="bottom-start">
          <md-button md-menu-trigger>
            <router-link to="/">Home</router-link>
          </md-button>
          <md-button md-menu-trigger>
            <router-link to="/cart">Cart</router-link>
          </md-button>
        </md-menu>
        <div class="md-toolbar-section-end">
          <md-badge :md-content="cartLength">
            <md-button class="md-icon-button" @click="cartVisible = !cartVisible">
              <md-icon>shopping_cart</md-icon>
            </md-button>
          </md-badge>
        </div>
      </md-app-toolbar>
      <!-- Fim Navbar -->
      <!-- Lista -->
      <md-app-content class="md-scrollbar">
        <lista ref="Lista" @add-cart="addToCart"></lista>
      </md-app-content>
      <!-- Fim Lista -->
      <!-- Carrinho -->
      <md-app-drawer class="md-right" :md-active.sync="cartVisible" >
        <carrinho ref="Carrinho" @decrease-cart="removeFromCart"></carrinho>
      </md-app-drawer>
      <!-- Fim Carrinho -->
    </md-app>
  </div>
</template>
<script>
// @ is an alias to /src
import Store from '@/components/Store.vue'
import Lista from '@/components/Lista.vue'
import Carrinho from '@/components/Carrinho.vue'
export default {
  name: 'home',
  components: {
    Store, Lista, Carrinho
  },
  data() {
    return {
      cartVisible: false,
      cartLength: 0,
      comicToBeAdded: ''
    }
  },
  methods: {
    addToCart(comic) {
      this.cartLength += 1;
      this.$refs.Carrinho.addToCart(comic)
    },
    removeFromCart(quantity){
       this.cartLength -= quantity;
    }
  }
}
</script>
<style lang="scss" scoped>
.logo {
  width: 10%;
  height: auto;
}
.md-layout-item {
  height: 40px;
  border: 1px solid red;
  &:after {
    width: 100%;
    height: 100%;
    display: block;
    background: md-get-palette-color(red, 200);
    content: " ";
  }
}
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.md-app {
  min-height: 100vh;
  max-height: 100vh;
  border: 1px solid rgba(#000, .12);
}
.md-progress-bar {
  margin: 0 10vw;
}
.md-menu {
  margin: 24px;
}
</style>