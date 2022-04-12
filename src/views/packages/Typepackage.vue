<template>
 <Header></Header>
  <Menu></Menu>
  <div class="page-wrapper bg-light ">
    <div class="container-fluid">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>créer Package</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="my_card">
          <div>
            <form class="mt-4" @submit.prevent="postType_Package()">
              <div class="form-group">
                <label class="packag" id="label">Type de package</label>
                <input
                  type="text"
                  class="form-control w-100 fw-bold"
                  id="exampleInputEmail1"
                  placeholder="Entrer le type de package"
                  v-model="libelle"
                  required
                />
              </div>
              <button  type="submit" class="btn btn-lg btn-primary text-white">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer class="my_footer"></Footer>
</template>
<script>
import Header from '@/components/header'
import Menu from '@/components/menu'
import Footer from '@/components/footer'

import {lien} from '/src/assets/api.js'
import axios from 'axios'
export default {
  name: "Typepackage",
  components:{
     Header,Menu,Footer,
  },
  data(){ 
      return{
     libelle:null,
  }   
  },
  methods:{
    postType_Package(){
    axios.post(lien+"types",{
        libelle : this.libelle
    })
    .then(reponse =>{
        console.log("POSTTYPEPACKAGE",reponse);
    })
    .catch(error=>{
        console.log(error);
    })

    }
  },
};
</script>
<style scoped>
.my_footer{
position:relative;
width:100%;
bottom:-7em;
margin-left: 0 !important;
}
.my_card{
 background: rgb(219, 219, 219);
 width:60%;
 margin:0 auto ;
 height:300px;
 display:flex;
flex-direction: column;
align-items: center;
justify-content:space-between;
}
#label{
font-weight:900 !important;
}

</style>
