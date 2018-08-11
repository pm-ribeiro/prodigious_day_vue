<template>
  <md-dialog :md-active.sync="showModal">
    <md-dialog-title v-text="currentComic.title"></md-dialog-title>
    <div class="content-modal">
      <p v-text="currentComic.description"></p>
      <div v-if="currentComic">
        <md-table v-if="currentComic.creators.items.length" v-model="currentComic.creators.items" md-card>
          <md-table-toolbar>
            <h1 class="md-title">Criadores</h1>
          </md-table-toolbar>
          <md-table-row slot="md-table-row" slot-scope="{ item }">
            <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
            <md-table-cell md-label="Role" md-sort-by="name">{{ item.role }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </md-dialog>
</template>


<script>

  export default{
    name: 'modal',
    data() {
      return {
        showModal: false,
        currentComic: false,
      }
    },
    methods: {
      openModal(comic) {
        this.currentComic = comic;
        this.showModal = true;
      }
    }
  }
</script>

<style lang="scss" scoped>

.content-modal {
  padding: 0 24px
}

</style>
