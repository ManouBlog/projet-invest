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
              <li class="fw-bold h3"><span>Création d'un utilisateur</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    
    
    <div class="form-body">
      <div class="card-body">
        <div class="row pt-3">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nom</label>
              <input
                type="text"
                
                class="form-control"
                placeholder="Nom"
                v-model="nom"
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Prénoms</label>
              <input
                type="text"
                class="form-control form-control-danger"
                placeholder="Prénoms"
                v-model="prenoms"
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Télephone</label>
              <input
                type="text"
                class="form-control"
                placeholder="0704565676"
                required
                v-model="phone"
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">email</label>
              <input
                type="email"
                class="form-control"
                placeholder="ex:adjobi23@gmail.com"
                required
                v-model="email"
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">lieu d'habitation</label>
              <input
                type="text"
                class="form-control"
                placeholder="ex:yopougon"
                v-model="lieu_habitation"
                 required
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">mot de passe</label>
              <input
                type="password"
                class="form-control"
                placeholder="ex:xxxxxx"
                v-model="password"
                 required
              />
            </div>
          </div>
         <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Assigner un role</label>
                <select class="w-100 form-group" v-model="role_id" id="role" multiple>
                  <option value="" disabled>ROLE</option>
                  <option
                    v-for="role in listRole"
                    :key="role.id"
                    :value="role.id"
                  >
                    {{ role.libelle }}
                  </option>
                </select>
              </div>
            </div>
             <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Registre de commerce</label>
              <input
                type="text"
                class="form-control"
                placeholder="ex:17373HDD73HSHS"
                v-model="registre"
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
      </div>
      <div class="form-actions">
        <div class="card-body">
          <button
            type="submit"
            @click.prevent="poster_user"
            :disabled="
              nom === null &&
              prenoms === null &&
              email === null &&
              password === null &&
              telephone === null
            "
            class="btn btn-lg mx-2 btn-user text-white"
          >
            creer un utilisateur
          </button>
          <button type="button" class="btn btn-dark btn-lg">Annuler</button>
        </div>
      </div>
    </div>
  </div>
  <Footer class="my_footer"></Footer>
</template>
<script>

import Swal from "sweetalert2";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";

import axios from "axios";
import { lien } from "/src/assets/api.js";
export default {
  name: "User",
  components: {
    Header,
    Menu,
    Footer,
  },

  //+++++ DATA ++++//
  data() {
    return {
      nom: null,
      prenoms: null,
      phone: null,
      email: null,
      lieu_habitation: null,
      password: null,
      listRole:null,
      role_id:[],
      showCreated:false,
      role:null,
      registre:null,
    };
  },

  //+++++ METHODES ++++//
  methods: {
    poster_user() {
      console.log("ROLES",this.role_id);
      axios
        .post(lien + "/api/users", {
          nom: this.nom,
          prenoms: this.prenoms,
          phone: this.phone,
          email: this.email,
          lieu_habitation: this.lieu_habitation,
          password: this.password,
          role_id: this.role_id,
          registre_commerce:this.registre,
        })
        .then((reponse) => {
          console.log("POSTERUSER", reponse.data);
          if (reponse.data.status == "true") {
            Swal.fire({
              text: "Utilisateur crée",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
           setTimeout(()=>{
              this.$router.push("/listusers")
           },1500)
          }
          if(reponse.data.status == "false") {
            Swal.fire({
              text: "Veuillez remplir tous les champs",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
              text: "Veuillez remplir tous les champs",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
        });
    },
    created_role_show(){
     this.showCreated = !this.showCreated
    },
      get_role(){
  axios.get(lien + "/api/roles")
      .then((reponse) => {
        console.log("ROLES:", reponse.data.data);
        this.listRole = reponse.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },


    creation_role(){
     axios.post(lien +"/api/roles",{
     libelle: this.role
    })
      .then((reponse) => {
        console.log("ROLES:", reponse.data.data);
        if(reponse){
       Swal.fire({
              text:"creation de role effectué",
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
        }
        location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });

    }
  },

  created() {
    this.get_role()
  }
};
</script>
<style scoped>
.my_footer{
position:relative;
width:100%;
bottom:-7em;
margin-left: 0 !important;
}
select {
  padding: 0.589em !important;

  border-radius: 0.25rem;
}
select:active {
  border: 1px solid rgb(134, 134, 134);
}
.bouton_create-role{
text-align: left;
margin-left:1.5em;
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
.created_role{
position:fixed;
top:0;
left: 0;
width:100%;
height:100%;
background: rgba(0, 0, 0, 0.405);
display:flex;
place-items: center;
justify-content: center;
}
.from_create_role{
background: rgb(253, 251, 251);
padding: 5em;
margin-left:10%;
}
input,select{ 
  border: 1px solid black !important;
}
.form-group{ 
  text-align: left !important;
}
label{
  font-weight:bold !important;
}
</style>
