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
              <li class="fw-bold h3"><span>Enregistré le rapport de ventes</span></li>
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
              <label class="form-label">Nombre total de produits</label>
              <input
                type="text"
                class="form-control"
                placeholder="le nombre total de produits vendus dans la journée"
                v-model="nb_vente"
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Choisir le type de package</label>
                <select class="w-100 form-group" v-model="type_id" id="type">
                  <option value="" disabled>Type_packages</option>
                  <option
                    v-for="type in list_type_packages"
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
      <div class="form-actions">
        <div class="card-body">
          <button
            @click="send_rapport"
            type="submit"
            class="btn text-white mx-3 btn-envoyer"
          >
            Enregistrer
          </button>
          <button @click="$router.go(-1)" type="button" class="btn btn-dark">
            Annuler
          </button>
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
         list_type_packages:null,
         nb_vente:null,
         type_id:null
     }
    },
    methods: {
         get_Package(){
    axios.get(lien+"types")
    .then(reponse =>{
        console.log("POSTTYPEPACKAGE",reponse); 
        this.list_type_packages = reponse.data.data
    })
    .catch(error=>{
        console.log(error);
    })

    },
    send_rapport(){
    axios.post(lien+"ventes",{
        nb_ventes:this.nb_vente,
        type_id:this.type_id
    })
       .then(reponse =>{
        if(reponse){
             Swal.fire({
              text: "Rapport envoyé",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
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
  border: none !important;
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

</style>