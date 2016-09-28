<template>
  <navbar></navbar>
  <div class="container-fluid">
      <router-view></router-view>
  </div>
</template>

<script>
import navbar from './components/Navbar.vue'

export default {
  components: {
    navbar
  }
}
</script>
<style>
  @import "./assets/base.css";
  body{
    font-family: 'Microsoft JhengHei', '微軟正黑體', 'Microsoft YaHei', '微软雅黑', Tahoma, Verdana, sans-serif;
  }
  .container-fluid{
    padding: 4rem 10rem 1rem;
  }
  @media screen and (max-width: 700px) {
    .container-fluid{
      padding: 4rem 1px 1rem;
    }
  }
  @media screen and (max-width: 900px) {
    .container-fluid{
      padding: 4rem 1em 1rem;
    }
  }
</style>
