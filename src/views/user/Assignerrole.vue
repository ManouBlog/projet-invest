<template>
<loading :active="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
  <Header></Header>
  <Menu></Menu>
  <div class="page-wrapper">
    <div class="container-fluid position-relative">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Modifier</span></li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
        <a href="javascript:void(0)" class="back h1" @click="$router.go(-1)"
          ><box-icon name="left-arrow-alt" animation="tada"></box-icon
        ></a>
      </div>
    </div>
    

    <form @submit.prevent="modify_profil_user" v-if="utilisateur">
      <div class="form-body">
        <div class="card-body">
          <div class="row pt-3">
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Nom</label>
                <input
                  type="text"
                  id="firstName"
                  class="form-control"
                  placeholder="Nom"
                  v-model="utilisateur.nom"
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
                  v-model="utilisateur.prenoms"
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
                  v-model="utilisateur.phone"
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
                  v-model="utilisateur.email"
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
                  v-model="utilisateur.lieu_habitation"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Assigner un role</label>
                <select class="w-100 form-group" v-model="this.role_id" id="role">
                  <option value="" disabled>ROLE</option>
                  <option
                    v-for="role in listRole"
                    :key="role.id"
                    :value="role.id"
                  >
                    {{ role.libelle }}
                  </option>
                </select>
                <!-- <input type="text" class="form-control" placeholder="ex:30000" v-model="utilisateur.solde"/> -->
              </div>
            </div>
            <!--/span-->
          </div>
        </div>
      </div>
     <div class="mb-4">
      <button :disabled="role_id == null" type="submit" class="btn btn-modify">
        Modifier
      </button>
      <button @click="$router.go(-1)" type="button" class="btn btn-dark mx-2">Annuler</button>
     </div>
    </form>
  </div>
   <Footer class="my_footer"></Footer>
</template>
<script>
import Swal from "sweetalert2";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { lien } from "/src/assets/api.js";
import axios from "axios";
export default {
  name: "Assignerrole",
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },
  //++++ DATA ++++//
  data() {
    return {
      user_id: this.$route.params.id,
      role_id: null,
      listRole: null,
      utilisateur:null,
        userCompte:{
        nom:null,
        prenoms:null,
        email:null,
        phone:null,
        lieu_habitation:null,
        role_id:null
      },
    };
  },

  //++++ CREATED ++++//
  created() {
    this.get_role()
    this.get_info_user()
  },

  //++++ METHODS ++++//

  methods: {
     modify_profil_user(){
        let value = document.getElementById("role").value;
             this.userCompte.nom = this.utilisateur.nom ,
         this.userCompte.prenoms = this.utilisateur.prenoms,
        this.userCompte.phone = this.utilisateur.phone ,
        this.userCompte.email = this.utilisateur.email ,
         this.userCompte.lieu_habitation = this.utilisateur.lieu_habitation,
         this.userCompte.role_id = value
         console.log('USER',this.$route.params.id);

       axios.put(lien+`users/${this.$route.params.id}`,this.userCompte,{
         headers:{'Authorization': 'Bearer '+ localStorage.getItem('token')}
       })
       .then(reponse=>{
         console.log(reponse);
          if(reponse.data.status == 'true'){
            Swal.fire({
              text:"Modification effectuée",
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.$router.push('/listusers')
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
         console.log(error);
          Swal.fire({
              text:"Modification echouée",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
       })
    },
    // post_role() {
    //   let value = document.getElementById("role").value;
    //   axios
    //     .post(lien + "user_roles", {
    //       role_id: value,
    //       user_id: this.$route.params.id,
    //     })
    //     .then((reponse) => {
    //       console.log("POSTER_ROLE", reponse);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
    get_info_user(){
      this.isLoading = true
       axios.get(lien+"users")
            .then(reponse=>{
               console.log("LES USERS",reponse.data.data);
               this.list_users = reponse.data.data
               this.utilisateur = this.list_users.find(item => item.id == this.$route.params.id)
               console.log("utilisateur",this.utilisateur);
               this.isLoading = false
            })
    },
    get_role(){
      this.isLoading = true
  axios.get(lien+"roles")
      .then((reponse) => {
        console.log("ROLES:", reponse.data.data);
        this.listRole = reponse.data.data;
        this.isLoading = false
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
};
</script>
<style scoped>
.icon {
  position: absolute;
  left: 1em;
  top: 0;
}
select {
  padding: 0.589em !important;
  border: none !important;
  border-radius: 0.25rem;
}
select:active {
  border: 1px solid rgb(134, 134, 134);
}
.btn-modify{
background: rgb(231, 202, 15) !important;
border:3px solid black !important;
}

.my_footer{
position:relative;
width:100%;
bottom:-7em;
margin-left: 0 !important;
}
</style>
