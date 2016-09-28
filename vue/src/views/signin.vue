<template>
  <div>
    <h4>{{errMsg}}</h4>
    <form action="/signin" method="post">
      <input type="text" placeholder="username" name="email">
      <input type="password" placeholder="password" name="pass">
      <button>submit</button>
    </form>
  </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
              errMsg:''
            }
        }
    }
</script>
