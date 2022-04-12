<template>
  <Header></Header>
  <div class="page-wrapper">
    <div class="container-fluid">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Création de Package</span></li>
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
              <label class="form-label">Cout d'acquisition</label>
              <input
                type="text"
                id="firstName"
                class="form-control"
                placeholder="ex:12000 fcfa"
                v-model="cout_acquisition"
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Cout De Vente</label>
              <input
                type="text"
                id="lastName"
                class="form-control form-control-danger"
                placeholder="ex:3000 fcfa"
                v-model="cout_vente"
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
        <div class="row">
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nombre de Produits</label>
              <input
                type="text"
                class="form-control"
                placeholder="ex:200"
                v-model="nb_products"
              />
            </div>
          </div>
           <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nombre de jours(délai de vente)</label>
              <input
                type="text"
                class="form-control"
                v-model.number="nb_jours"
                required
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nom du package</label>
              <input
                type="text"
                class="form-control"
                v-model="libelle"
                required
              />
            </div>
          </div>
           <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">choisir le type de package</label>
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
            @click="created_package"
            type="submit"
            class="btn text-white mx-3 btn-envoyer"
            :disabled="
              cout_acquisition == null &&
              cout_vente == null &&
              gain == null &&
              nb_products == null &&
              nb_jours == null
            "
          >
            envoyer
          </button>
          <button @click="$router.go(-1)" type="button" class="btn btn-dark">
            Retour
          </button>
        </div>
      </div>
    </div>
  </div>
  <Menu></Menu>
  <Footer class="my_footer"></Footer>
</template>
<script>
import Swal from "sweetalert2";
import axios from "axios";
import { lien } from "/src/assets/api.js";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
export default {
  name: "Package",
  created() {
    this.user = this.$store.state.user;
     this.get_Package()
  },
  data() {
    return {
      cout_acquisition: null,
      cout_vente: null,
      nb_products: null,
      nb_jours: null,
      user: null,
      user_id: null,
      libelle:null,
      list_type_packages:null,
      type_id:null,
    };
  },
  components: {
    Header,
    Menu,
    Footer,
  },
  methods: {
    created_package() {
      let valueTypeId = document.getElementById("type").value
      axios
        .post(lien + "packages", {
          cout_acquisition: this.cout_acquisition,
          cout_vente: this.cout_vente,
          libelle: this.libelle,
          nb_products: this.nb_products,
          nb_jours: this.nb_jours,
          user_id: this.user.id,
          type_id:valueTypeId,
        })
        .then((reponse) => {
          console.log("created_package", reponse.data.status);
          if (reponse.data.status === "true") {
            Swal.fire({
              text: "Package crée avec success",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.$router.push('/voirpackages')
          }

          if (reponse.data.status === "false") {
            Swal.fire({
              text: reponse.data.message,
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    get_Package(){
    axios.get(lien+"types")
    .then(reponse =>{
        console.log("POSTTYPEPACKAGE",reponse); 
        this.list_type_packages = reponse.data.data
    })
    .catch(error=>{
        console.log(error);
    })

    }
  },
};
</script>
<style scoped>

*{
font-weight: bold !important;
}
.my_footer{
position:relative;
width:100%;
bottom:-7em;
margin-left: 0 !important;
}
select {
  padding: 0.589em !important;
  border: none !important;
  border-radius: 0.25rem;
}
select:active {
  border: 1px solid rgb(134, 134, 134);
}
.btn-envoyer{
background: rgb(231, 202, 15) !important;
color:black !important;
border:3px solid black !important;
}
</style>
