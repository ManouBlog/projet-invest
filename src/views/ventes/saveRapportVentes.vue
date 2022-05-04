<template>
    <Header></Header>
  <Menu></Menu>
<div class="page-wrapper">
    <div class="container-fluid position-relative">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Enregistré le rapport de vente du jour</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>

     <div class="form-body">
      <form  @submit.prevent="send_rapport">
     
      <div class="card-body">
        <div class="row pt-3">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label fw-bold">Nombre total de pièces</label>
              <input
                type="text"
                class="form-control"
                placeholder="le nombre total de pièces vendus (ex:500)"
                v-model="nb_vente"
                required
                pattern="^([0-9]*)$"
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
              <div class="form-group">
                <label class="form-label fw-bold">Choisir le nom de l'article</label>
                <select class="w-100 form-group" v-model="type_id" id="type">
                  <option disabled value="">Mes_articles</option>
                  <option
                    v-for="type in list_packages"
                    :key="type.id"
                    :value="type.id"
                  >
                    {{ type.libelle }}
                  </option>
                </select>
              </div>
            </div>
          <!--/span-->
        </div>
      </div>      
        <div class="card-body">
          <button
            type="submit"
            class="btn text-white mx-3 btn-envoyer"
           :disabled="
              type_id === null
            ">
            Enregistrer
          </button>
          <button @click="$router.go(-1)" type="button" class="btn btn-dark">
            Annuler
          </button>
      </div>
      </form>
    </div>

    
</div>

  <Footer class="my_footer"></Footer>
</template>
<script>
import Swal from "sweetalert2";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";

// import Swal from "sweetalert2";
import axios from "axios";
import { lien } from "/src/assets/api.js";
export default {
    name:'saveRapportventes',
    components: {
        Header,Menu,Footer,
    },
    data() {
     return{
         list_packages:null,
         nb_vente:null,
         type_id:null,
         user:this.$store.state.user
     }
    },
    methods: {
         get_Package(){
       axios.get(lien+"/api/souscris/"+this.user.id,
    { headers: {
            'Authorization':"Bearer "+this.$store.state.token,
          },})
    .then(reponse =>{
        console.log("POSTTYPEPACKAGE",reponse); 
        this.list_packages = reponse.data.data
    })
    .catch(error=>{
        console.log(error);
    })

    },
    send_rapport(){
      let red = document.getElementById("type").value
      console.log(`${this.nb_vente} et ${red}`);
    axios.post(lien+"/api/ventes",{
        nb_ventes:this.nb_vente,
        package_id:this.type_id
    })
       .then(reponse =>{
         console.log("sendRapport",reponse.data.data);
         console.log(reponse);
        if(reponse.data.status == 'true'){
             Swal.fire({
              text: "Rapport envoyé",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            })
            this.nb_vente =" "
            this.type_id =" "
          //  setTimeout(()=>{
          //     this.$router.push("/list-rapport-ventes")
          //  },1500)
        }
        if(reponse.data.status === false){
          Swal.fire({
              text: reponse.data.message,
              icon: "info",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
            })
        }
    })
    .catch(error=>{
        console.log(error);
           Swal.fire({
              text: "Rapport non envoyé",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
    })
    },
    },
    created(){
        this.get_Package()
    }
}
</script>
<style scoped>
select {
  padding: 0.589em !important;
  border-radius: 0.25rem;
}
select:active {
  border: 1px solid rgb(134, 134, 134);
}
.my_footer{
position:relative;
width:100%;
bottom:-20em;
margin-left: 0 !important;
}
.btn-envoyer{
background: rgb(231, 202, 15) !important;
color:black !important;
border:3px solid black !important;
}
input,select{ 
  border: 1px solid black !important;
}
.form-group{ 
  text-align: left !important;
}


</style>