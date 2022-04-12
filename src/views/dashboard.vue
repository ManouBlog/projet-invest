<template>
  <Header></Header>
  <Accueil  />
  <Menu></Menu>
 <Footer class="my_footer"></Footer>
</template>
<script>
import 'boxicons'
import Accueil from '@/components/accueil.vue'
import Header from '@/components/header'
import Menu from '@/components/menu'
import Footer from '@/components/footer'
export default {
    name:"Dashboard",
    data() {
        return{
         
        }
    },
    components:{
        Header,Menu,Footer,Accueil
    },
   
}
</script>
<style scoped>
.my_footer{
position:relative;
width:100%;
bottom:-23em;
margin-left: 0 !important;
}
</style>