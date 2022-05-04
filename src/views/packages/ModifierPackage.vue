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
              <li class="fw-bold h3"><span>Modifier l'article</span></li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
         <h1  @click="$router.go(-1)"><box-icon name='left-arrow-alt' animation='tada'></box-icon></h1>
     </div>
    </div>
   <h1 v-if="libelle !== null">Nom de l'article : <input type="text" v-model="libelle.libelle" disabled></h1>
    <form  @submit.prevent="modify">
    <div class="form-body" v-if="listPackages">
      <div class="card-body">
      
        <div class="row pt-3">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Prix d'achat par pièce</label>
              <input
                type="text"
                class="form-control"
                placeholder="ex:12000 fcfa"
                v-model="libelle.cout_acquisition"
                pattern="^([0-9]*)$"
                disabled
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Prix de vente par pièces</label>
              <input
                type="text"
                pattern="^([0-9]*)$"
                class="form-control form-control-danger"
                placeholder="ex:3000 fcfa"
                v-model="libelle.cout_vente"
                disabled
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
      
        <div class="row">
        <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Délai d'ecoulement</label>
              <input
                type="text"
                class="form-control"
                v-model="libelle.nb_jours"
                pattern="^([0-9]*)$"
                required
                disabled
              />
            </div>
          </div>

          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nombre de pièces</label>
              <input
                type="text"
                class="form-control"
                placeholder="ex:200"
                v-model="libelle.nb_products"
                pattern="^([0-9]*)$"
                disabled
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
        <div class="row">
           <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nom de l'article</label>
              <input
                type="text"
                class="form-control"
                v-model="libelle.libelle"
                required
                disabled
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nom du fournisseur</label>
              <input
                type="text"
                class="form-control"
                v-model="libelle.seller.nom"
                required
                disabled
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group" v-if="libelle.sell.length == 0">
              <label class="form-label">Publication</label>
              <select @change="changePublication(libelle.etat)" v-model="libelle.etat" class="w-100 publie">
              <option value='en cours de traitement'>En cours de traitement</option>
              <option value='publie'>Publié</option>
              <option value='rejete'>Réjeter</option>
              </select>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group" v-show="showComment">
              <label class="form-label">Commentaire</label> <br>
              <textarea class="w-100" v-model="libelle.commentaire_rejet" id="comment" cols="10" rows="10"></textarea>
            </div>
          </div>
        </div>
        <!--/row-->

        
      </div>
      <div class="form-actions">
        <div class="card-body">
          <button
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
    </form>
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
import router from '../../router';
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
    userman_id:null,
    showComment:false,
    comment:null,
    
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
    axios.get(lien+"/api/packages")
    .then(reponse=>{
        console.log("TYPES DE PACKAGE",reponse.data.data);
        this.listPackages = reponse.data.data;
        this.libelle = this.listPackages.find(item => item.id == this.$route.params.id)
        this.type_id = this.libelle.type_id
        this.userman_id = this.libelle.user_id
        this.modeRejet()
        // this.libelle_name = this.libelle.libelle
        console.log("LIBELLE",this.libelle);
         console.log("IDLIBELLE",this.type_id);
         console.log("Userman",this.userman_id);
        this.isLoading = false
    })
    .catch(error=>{
      console.log(error);
    })
    
  //ceci sert a recupere les informations de l utilisateur ========//
  console.log("USER",this.user.id);
},
methods:{
  changePublication(event){
     if(event == 'rejete'){
       this.showComment = true
     }
      if(event == 'en cours de traitement'){
       this.showComment = false
     }
       if(event == 'publie'){
       this.showComment = false
     }
  },
   modeRejet(){
      if(this.libelle.etat === "rejete"){
        this.showComment = true
      }
   },
     modify(){
       console.log("TYPE_ID",this.type_id);
       console.log("USER_ID",this.user.id);
        axios.put(lien+`/api/edit/${this.$route.params.id}`,{
           etat:this.libelle.etat,
           commentaire:this.libelle.commentaire_rejet
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
            setTimeout(()=>{
              router.go(-1)
            },1500)
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
input,select{ 
  border: 1px solid black !important;
}
.form-group{ 
  text-align: left !important;
}


</style>
