<template>
  <div>
    <modal ref="Modal"></modal>
    <input-filter :query.sync="filter"> </input-filter>

    <div v-if="performingQuery">
      <md-empty-state md-icon="schedule" md-label="Carregando produtos"></md-empty-state>
      <md-progress-bar md-mode="query"></md-progress-bar>
    </div>
    <div class="wrapper-cards" v-if="!performingQuery">
      <md-card v-for="(comic, key, index) in filteredData" :key="index">
        <md-card-media-cover md-solid>
          <md-card-media md-ratio="1:1">
            <img :src="`${comic.thumbnail.path}.${comic.thumbnail.extension}`" :alt="comic.title">
          </md-card-media>
          <md-card-area>
            <md-card-header>
              <span class="md-title" >{{comic.title | to-uppercase}}</span>
            </md-card-header>
            <md-card-actions>
              <md-button class="md-icon-button" @click="addToCart(comic)">
                <md-icon>add_shopping_cart</md-icon>
              </md-button>
              <md-button v-if="comic.description" class="md-icon-button" @click="openModal(comic)">
                <md-icon>launch</md-icon>
              </md-button>
            </md-card-actions>
          </md-card-area>
        </md-card-media-cover>
      </md-card>
    </div>
    <div v-html="legalText"></div>
  </div>

</template>

<script>
  import Modal from '@/components/Modal.vue'
  import axios from 'axios'
  import store from '@/store.js'
  import InputFilter from "@/components/InputFilter.vue"


  const requester = axios.create({
    baseURL: '//gateway.marvel.com/v1/public'
  })

  export default{
    name: 'lista',
    components: {
      Modal, InputFilter
    },
    data() {
      return {
        filter:'',
        comics: [],
        apiKey: 'e02eaa35a43502a6e6a14b28492b6b7d',
        performingQuery: true,
        legalText: '',
      }
    },
    methods: {
      getComics() {
        requester.get('/comics', {
          params: {
            format: 'comic',
            formatType: 'comic',
            noVariants: true,
            hasDigitalIssue: true,
            apikey: this.apiKey
          }
        })
        .then((response) => {
          this.comics = response.data.data.results;
          this.legalText = response.data.attributionHTML;
          this.performingQuery = false;
        })
        .catch((error) => {
          console.log(error)
        })
      },
      openModal(comic){
        this.$refs.Modal.openModal(comic)
      },
      addToCart(comic){
        store.commit('increment', comic) //using vuex
      }
    },
    beforeMount(){
      this.getComics();
    },

    computed: {
    filteredData: function() {
      //filter by comic title
      return this.comics.filter( comic => comic.title.toLowerCase()
        .match(this.filter.toLowerCase()))
      }
    }

  }


</script>


<style lang="scss" scoped>
.wrapper-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.md-card {
  width: 350px;
  margin: 0 0 36px !important;
}
.md-list-item {
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.md-list-item .md-badge {
  margin-right: 16px;
}
.md-list-item .md-list-item-text {
  align-items: flex-start;
}
.md-list-item:first-child {
  border-top: none;
}
.md-list-item:last-child .md-list-item-text {
  align-items: flex-end;
}
</style>
