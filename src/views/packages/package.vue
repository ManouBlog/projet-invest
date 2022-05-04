<template>
  <Header></Header>
  <div class="page-wrapper">
    <div class="container-fluid">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Création d'article</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="alert alert-primary" role="alert">
       le traitement des informations se faire en 3 jours.si votre package n est pas publié dans les 3 jours
</div> -->
    <form @submit.prevent="create_article">
      <div class="form-body">
        <div class="card-body">
          <div class="row pt-3">
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Choisir le package</label>
                <select
                  class="w-100 form-group types"
                  v-model="type_id"
                  id="type"
                  required
                >
                  <option value="" disabled>Packages</option>
                  <option
                    v-for="type in list_type_packages"
                    :key="type.id"
                    :value="type.id"
                    :label="type.libelle"
                  >
                    {{ type.libelle }}
                  </option>
                </select>
              </div>
            </div>

            <!--/span-->
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Nom de l'article</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="libelle"
                  required
                />
              </div>
            </div>

            <!--/span-->
          </div>
          <!--/row-->
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Prix d'achat par pièce (Fcfa)</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="ex:1200 fcfa"
                  v-model="cout_acquisition"
                  pattern="^([0-9]*)$"
                  required
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label"
                  >Prix de vente par pièces (Fcfa)</label
                >
                <input
                  type="text"
                  class="form-control form-control-danger"
                  placeholder="ex:3000 fcfa"
                  v-model="cout_vente"
                  pattern="^([0-9]*)$"
                  required
                />
              </div>
            </div>
            <!--/span-->
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">Nombre de Pièces (Quantité)</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="ex:200"
                  v-model="nb_products"
                  pattern="^([0-9]*)$"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="form-label">délai d écoulement</label>
                <input
                  type="text"
                  class="form-control"
                  v-model.number="nb_jours"
                  pattern="^([0-9]*)$"
                  required
                />
              </div>
            </div>
            <!--/span-->
          </div>
        </div>
        <div class="form-actions">
          <div class="card-body">
            <button
              class="btn text-white mx-3 btn-envoyer"
              type="submit"
            >
              envoyer
            </button>
            <button @click="$router.go(-1)" type="button" class="btn btn-dark">
              Retour
            </button>
          </div>
        </div>
      </div>
    </form>
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
    this.get_Package();
  },
  data() {
    return {
      cout_acquisition: null,
      cout_vente: null,
      nb_products: null,
      nb_jours: null,
      user: null,
      user_id: null,
      libelle: null,
      list_type_packages: null,
      type_id: null,
      libelleName: null,
    };
  },
  components: {
    Header,
    Menu,
    Footer,
  },
  methods: {
    create_article(){
      let prixVente= this.cout_vente
      let prixAchat = this.cout_acquisition
        
   if(prixVente < prixAchat || prixVente == prixAchat){
        Swal.fire({
          text: "Le prix de vente doit etre supérieur au prix d'achat",
          icon: "info",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }else{
        this.created_package()
      }
    },
    created_package() {
      
        let valueTypeId = document.getElementById("type").value;
        let value_name = document.querySelector(".types");
        for (let i = 0; i < value_name.length; i++) {
          let element = value_name[i];
          if (element.value == valueTypeId) {
            this.libelleName = element.textContent;
          }
        }
        axios
          .post(lien + "/api/packages", {
            cout_acquisition: this.cout_acquisition,
            cout_vente: this.cout_vente,
            libelle: this.libelle,
            nb_products: this.nb_products,
            nb_jours: this.nb_jours,
            user_id: this.user.id,
            type_id: valueTypeId,
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
              setTimeout(() => {
                this.$router.push("/voirMesPackage");
              }, 1500);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    get_Package() {
      axios
        .get(lien + "/api/types")
        .then((reponse) => {
          console.log("POSTTYPEPACKAGE", reponse);
          this.list_type_packages = reponse.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
* {
  font-weight: bold !important;
}
.my_footer {
  position: relative;
  width: 100%;
  bottom: -9em;
  margin-left: 0 !important;
}
select {
  padding: 0.589em !important;
  border-radius: 0.25rem;
}
select:active {
  border: 1px solid rgb(134, 134, 134);
}
.btn-envoyer {
  background: rgb(231, 202, 15) !important;
  color: black !important;
  border: 3px solid black !important;
}
input,
select {
  border: 1px solid black !important;
}
.form-group {
  text-align: left !important;
}
</style>
