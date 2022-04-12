<template>
<loading :active="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
  <Header></Header>
  <Menu></Menu>
  <div class="page-wrapper">
    <div class="container-fluid  position-relative">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Modifier Packages</span></li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
         <h1  @click="$router.go(-1)"><box-icon name='left-arrow-alt' animation='tada'></box-icon></h1>
     </div>
    </div>
   <h1 v-if="libelle !== null">Nom du package : {{libelle.libelle}}</h1>
    <div class="form-body" v-if="listPackages">
      <div class="card-body">
      
        <div class="row pt-3">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Cout d'acquisition</label>
              <input
                type="text"
                class="form-control"
                placeholder="ex:12000 fcfa"
                v-model="libelle.cout_acquisition"
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Cout De Vente</label>
              <input
                type="text"
                
                class="form-control form-control-danger"
                placeholder="ex:3000 fcfa"
                v-model="libelle.cout_vente"
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
      
        <div class="row">
        <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Délai</label>
              <input
                type="text"
                class="form-control"
                v-model="libelle.nb_jours"
                required
              />
            </div>
          </div>

          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nombre de Produits</label>
              <input
                type="text"
                class="form-control"
                placeholder="ex:200"
                v-model="libelle.nb_products"
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
        <div class="row">
          
           <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">publication</label>
              <select v-model="libelle.publie" class="w-100 publie">
              <option value="1">Publie</option>
              <option value="0">Pas publié</option>
              </select>
            </div>
          </div>
           <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nom du Package</label>
              <input
                type="text"
                class="form-control"
                v-model="libelle.libelle"
                required
              />
            </div>
          </div>
        </div>
        <!--/row-->

        
      </div>
      <div class="form-actions">
        <div class="card-body">
          <button
            @click="modify"
            type="submit"
            class="btn text-white mx-3 btn-primary"
          >
            Modifier
          </button>
          <button @click="$router.go(-1)" type="button" class="btn btn-dark">
            Retour
          </button>
        </div>
      </div>
    </div>
  </div>
  <Footer class="my_footer" v-if="listPackages !== null"></Footer>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from "sweetalert2";
import axios from "axios";
import { lien } from "/src/assets/api.js";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
export default {
  name: "ModifierPackage",
  data() {
      return{
    listPackages:null,
    libelle :null,
    user:this.$store.state.user,
    publie:null,
    isLoading:false,
    type_id:null,
      }
  },
  components: {
    Header,
    Menu,
    Footer,Loading
  },
created(){
  this.isLoading = true
  //======== ceci sert a recupere les informations de l utilisateur//
    axios.get(lien+"packages")
    .then(reponse=>{
        console.log("TYPES DE PACKAGE",reponse.data.data);
        this.listPackages = reponse.data.data;
        this.libelle = this.listPackages.find(item => item.id == this.$route.params.id)
        this.type_id = this.libelle.type_id
        // this.libelle_name = this.libelle.libelle
        console.log("LIBELLE",this.libelle);
         console.log("IDLIBELLE",this.type_id);
        this.isLoading = false
    })
    .catch(error=>{
      console.log(error);
    })
  //ceci sert a recupere les informations de l utilisateur ========//
  console.log("USER",this.user.id);
},
methods:{
     modify(){
       console.log("TYPE_ID",this.type_id);
       console.log("USER_ID",this.user.id);
        axios.put(lien+`packages/${this.$route.params.id}`,{
          cout_acquisition:this.libelle.cout_acquisition,
           cout_vente:this.libelle.cout_vente,
           nb_products:this.libelle.nb_products,
           nb_jours:this.libelle.nb_jours,
           user_id:this.user.id,
           type_id:this.type_id,
           publie:this.libelle.publie,
           libelle:this.libelle.libelle
        })
        .then(reponse =>{
        console.log("MODIFY DATA",reponse);
        if(reponse.data.status == 'true'){
            Swal.fire({
              text:"Package modifié",
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
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
}



};
</script>
<style scoped>
*{
font-weight: bold;
}
.icon{
position:absolute;
left:1em;
top:0;
}
.icon h1{
cursor: pointer;
}
.publie{
min-height:38px;
border:none;
border-radius:.25rem;
}
.btn-primary{
background: rgb(231, 202, 15) !important;
border:3px solid black !important;
font-weight: bold !important;
}

.my_footer{
position:relative;
width:100%;
bottom:-8em;
margin-left: 0 !important;
}

</style>
