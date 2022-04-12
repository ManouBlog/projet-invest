<template>
<loading :active="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
<Header></Header>
  <Menu></Menu>
<div class="page-wrapper ">
    <div class="container-fluid position-relative">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Modifier le type de Package</span></li>
            </ol>
          </div>
        </div>
      </div>
       <div class="icon">
         <h1 class="back" @click="$router.go(-1)"><box-icon name='left-arrow-alt' animation='tada' ></box-icon></h1>
     </div>
    </div>

    <div class="row mb-5">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form class="mt-4" @submit.prevent="modify">
              <div class="form-group">
                <label>Type de package</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  placeholder="Entrer le type de package"
                  v-model="libelle_name"
                  required
                />
              </div>
              <button  type="submit" :disabled="libelle == null" class="btn btn-lg btn-primary text-white">
                Modifier
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
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Header from '@/components/header'
import Menu from '@/components/menu'
import Footer from '@/components/footer'
import Swal from "sweetalert2";
import axios from 'axios'
import {lien} from '/src/assets/api.js'
export default {
    name:'Modifypackage',
     components:{
     Header,Menu,Footer,Loading
  },
//++++ DATA ++++//
    data() {
        return{
         libelle: null,
         list_packages:null,
         libelle_name:null,
          isLoading:false,
        }
    },

//++++ METHODS ++++//
methods:{
    modify(){
        axios.put(lien+`types/${this.$route.params.id}`,{
          libelle:this.libelle_name
        })
        .then(reponse =>{
        console.log("MODIFY DATA",reponse);
        if(reponse.data.status == 'true'){
           Swal.fire({
              text:"Type de package Modifié",
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.$router.push('/seepackage')
        }
           if(reponse.data.status == 'false'){
           Swal.fire({
              text:"Modification echouée",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
        }
        })
        .catch(error=>{
          if(error){
            Swal.fire({
              text:"Modification echouée",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        })
    },
  
},


//++++ CREATED ++++//

created(){
  this.isLoading = true,
  //======== ceci sert a recupere les informations de l utilisateur//
    axios.get(lien+"types")
    .then(reponse=>{
        console.log("TYPES DE PACKAGE",reponse.data.data);
        this.listPackages = reponse.data.data;
        this.libelle = this.listPackages.find(item => item.id == this.$route.params.id)
        this.libelle_name = this.libelle.libelle
        console.log("LIBELLE",this.libelle_name);
        this.isLoading = false
    })
    .catch(error=>{
      console.log(error);
    })
  //ceci sert a recupere les informations de l utilisateur ========//

}


}
</script>
<style scoped>
.icon{
position:absolute;
left:1em;
top:0;
}
.icon h1{
font-size:3em;
cursor: pointer;
}
button:active{
transform:translateY(-3px)
scale(0.9);
}
.btn-primary{
background: rgb(231, 202, 15) !important;
border:3px solid black !important;
font-weight: bold !important;
}
.my_footer{
position: relative !important;
bottom:-18em;
}




</style>