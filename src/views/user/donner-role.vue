<template>
    <Header></Header>
  <Menu></Menu>
  <div class="page-wrapper">
    <div class="container-fluid">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Creation de role</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="form-body">

      <div class="card-body">
        <div class="row pt-3">
         <form class="from_create_role" @submit.prevent="creation_role">
          <div class="col-md-12">
              <div class="form-group">
                <label class="form-label h4">Creer un role</label>
                <input
                  type="text"
                  required
                  class="form-control"
                  placeholder="Role"
                  v-model="role"
                />
              </div>
            </div>
            <div class="form-actions">
        <div class="card-body">
         <button type="submit" class="btn btn-valider btn-lg mx-2 border-0 p-2">Créer</button>
        <button class="btn-dark btn-lg border-0 p-2" @click="$router.go(-1)">annuler</button>
        </div>
      </div>
            </form>
        </div>
       
      </div>
      
    </div>
  </div>
  <Footer class="my_footer"></Footer>
</template>
<script>
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import axios from "axios";
import { lien } from "/src/assets/api.js";
import Swal from "sweetalert2";
export default {
    name:'DonnerRole',
    data(){
        return{
         role:null,
        }
    },
     components: {
    Header,
    Menu,
    Footer,
  },
  methods: {
     creation_role(){
     axios.post(lien +"/api/roles",{
     libelle: this.role
    })
      .then((reponse) => {
        console.log("ROLES:", reponse.data.data);
        if(reponse){
       Swal.fire({
              text:"Création de role effectué",
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
        }
        this.$router.push('/role')
      })
      .catch((error) => {
        console.log(error);
         Swal.fire({
              text:"Il ya une erreur au niveau du serveur",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
      });

    }
  }
}
</script>
<style scoped>

.my_footer{
position:absolute;
width:100%;
bottom:0;
margin-left: 0 !important;
}
.bouton-annuler{
background: rgb(231, 202, 15) !important;
border:1px solid white !important;
font-weight: bold;
}
.btn-valider,.btn-user{
background: rgb(231, 202, 15) !important;
border:3px solid rgb(0, 0, 0) !important;
color:black !important;
}
.btn-creer-role{
background: rgb(231, 202, 15) !important;
border:3px solid rgb(0, 0, 0) !important;
color:black !important;
}
input,select{ 
  border: 1px solid black !important;
}
.form-group{ 
  text-align: left !important;
}





</style>