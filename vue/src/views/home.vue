<template>
  <grid></grid>
</template>

 <script>
  import Grid from '../components/Grid.vue'
  import { setPhotos } from '../vuex/actions'

  export default {
    components: {
      Grid
    },
    vuex: {
      actions: {
        setPhotos
      }
    },
    ready() {
      this.$http.get('localhost:3000/photos').then((response) => {
        setPhotos(response.data)
      }).catch((response) => {
        console.log(response);
      })
    }
  }
</script>

<style>
  .loading{
    font-size: 4rem;
    color: #999;
    text-align: center;
    margin: 0 auto;
    padding: 1rem 0;
  }
</style>

