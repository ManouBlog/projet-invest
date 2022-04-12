<template>
  <div>
 <router-view />
  </div>

</template>

<script>

// import Dashboard from '@/components/dashboard/dashboard.vue'
// import Header from '@/components/header'
// import Menu from '@/components/menu'
// import Footer from '@/components/footer'
export default {
  name:"App",
  components:{
 
  },
  data(){
    return{
    }
  },
   methods: {
 
 }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


</style>
