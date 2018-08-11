<template>

  <div id="root-filter" class="root">
    <input id="user-input" class="input" type="text" :value="query" @keyup.enter="updateFilter" placeholder="Search comics">
    <button class="btn-small waves-effect waves-light right blue" @click="updateFilter"> Filtrar </button>
  </div>

</template>

<script type="text/javascript">
  export default{

    props: ['query'],

    methods: {
      updateFilter: function(e) {
        this.$emit('update:query', $('#user-input').val())
      }
    },
  }
 </script>

 <style type="text/css">

  .root{
    width: 50%;
    margin: 50px 25%;
    border-radius: 2px;
  }

 </style>
