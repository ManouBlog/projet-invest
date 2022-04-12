<template>
<loading :active="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
  <div class="page-wrapper">
    <div class="container">
      <div class="row g-0">
        <div class="div_hello">
          <h1 class="float-right w-50 p-0 m-0 fw-bold">Hello,{{ user.nom }}</h1>
          <h4 class="my-2">{{jour}}</h4>
        </div>
        <div class="d-flex justify-content-between">
          <div class="col-lg-3 col-md-6">
            <div class="card border">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex no-block align-items-center">
                      <div>
                        <h3><i class="bi bi-box"></i></h3>
                        <p class="text-light">PACKAGES</p>
                      </div>
                      <div class="ms-auto">
                        <h2 class="counter text-primary">{{nombrePackages}}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="card border">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex no-block align-items-center">
                      <div>
                        <h3>  <i class="bi bi-box-seam"></i></h3>
                        <p>TYPE DE PACKAGES</p>
                      </div>
                      <div class="ms-auto">
                        <h2 class="counter text-cyan">{{nombreTypePackages}}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="card border">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex no-block align-items-center">
                      <div>
                        <h3><i class="bi bi-people"></i></h3>
                        <p>FOURNISSEURS</p>
                      </div>
                      <div class="ms-auto">
                        <h2 class="counter text-purple">{{nombreFournisseurs}}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import "boxicons";
import { lien } from "/src/assets/api.js";
import axios from "axios";
export default {
  name: "Acceuil",
  components: {
  Loading
  },
  created() {
    this.user = this.$store.state.user;
     this.getNumberPackages()
     this.getData()
     this.getFournisseurs()
  },
  data() {
    return {
      user: null,
      isLoading:false,
      date_jour: new Date(),
      list_packages:null,
      nombrePackages:null,
      nombreTypePackages:null,
      nombreFournisseurs:null,
      mois: [
        "Janvier",
        "Fevrier",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Aout",
        "Septembre",
        "Octobre",
        "Novembre",
        "Decembre",
      ],
      jours: [
        "Dimanche",
        "lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
      ],
    };
  },
  computed: {
    jour() {
      let Myjour = this.date_jour.getDay();
      let jour_J = this.jours[Myjour];
      let nombre = this.date_jour.getDate()
      let mois =  this.date_jour.getMonth();
      let mois_J = this.mois[mois]
      let annee = this.date_jour.getFullYear()
      return jour_J+' '+nombre + ' ' +mois_J+ ' ' + annee;
    },

  },
  methods: {
    getNumberPackages(){
      this.isLoading = true
 axios.get(lien+"packages")
        .then((res) => {
          console.log("OBTENIRPACKAGES", res.data.data);
          this.list_packages = res.data.data;
          this.nombrePackages = this.list_packages.length;
          this.isLoading = false
          })
        .catch((err) => {
          console.log(err);
        })
    },
    getData(){
      axios.get(lien+"types")
      .then(res => {
      console.log("OBTENIRTYPESPACKAGES", res);
      this.listTypesPackages = res.data.data;
      this.nombreTypePackages = this.listTypesPackages.length;
    })
    .catch((err) => {
      console.log(err);
    })
  },
   getFournisseurs() {
    axios
      .get( lien+"fournisseurs")
      .then((res) => {
        console.log("OBTENIFOURNISSEURS", res);
        this.list_fournisseurs = res.data.data;
        this.nombreFournisseurs = this.list_fournisseurs.length;
        console.log("LISTFOURNISSEURS", this.list_fournisseurs);
      });
  },
  
  },
 
};
</script>
<style scoped>
.div_hello {
  padding: 1em !important;
  text-align: left;
}
.div_hello h1 {
  font-size: 3em;
}

.card {
  border-radius: 25px !important;
  padding: 1em !important;
  background: linear-gradient(200deg, rgba(0, 0, 0, 0.671), rgb(0, 0, 0));
  color: white !important;
  border:3px solid rgb(131, 131, 131) !important;
}
.page-titles {
  background: transparent;
  box-shadow: none;
}
</style>
