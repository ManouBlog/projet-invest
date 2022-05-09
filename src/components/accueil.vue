<template>
  <loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></loading>
  <div class="page-wrapper">
    <div class="container">
      <div class="row g-0">
        <div class="div_hello position-relative">
          <div>
          <h1 class="float-right w-50 p-0 m-0 fw-bold" v-if="user !== null">
            Hello,{{ user.nom }}
          </h1>
          <h4 class="my-2" v-if="jour !== null">{{ jour }}</h4>
          </div>
          <img v-if="this.seeNombre" class="position-absolute w-25 img-trader" src="/assets/images/Stuck.png" alt="icon">
        </div>
        <div class="d-flex justify-content-between">
          <div class="col-lg-3 col-md-6" v-if="this.seeNombre">
            <div class="card border">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex no-block align-items-center">
                      <div>
                        <h3><i class="bi bi-box"></i></h3>
                        <p>ARTICLES</p>
                      </div>
                      <div class="ms-auto">
                      <span class="badge bg-danger" v-show="newshow">new</span>
                        <span
                          class="counter text-primary h2"
                          v-if="this.nombrePackages !== null"
                        >
                          {{ nombrePackages }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" v-if="see_nombre_package">
            <div class="card border">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex no-block align-items-center">
                      <div>
                        <h3><i class="bi bi-box"></i></h3>
                        <p>ARTICLES</p>
                      </div>
                      <div class="ms-auto">
                        <h2
                          class="counter text-primary"
                          v-if="this.number_nombre_package_fournisseur !== null"
                        >
                          {{ this.number_nombre_package_fournisseur }}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6" v-if="this.seeNombre">
            <div class="card border">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="d-flex no-block align-items-center">
                      <div>
                        <h3><i class="bi bi-box-seam"></i></h3>
                        <p>PACKAGES</p>
                      </div>
                      <div class="ms-auto">
                        <h2
                          class="counter text-cyan"
                          v-if="this.nombreTypePackages !== null"
                        >
                          {{ nombreTypePackages }}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-3 col-md-6" v-if="this.seeNombre">
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
                        <h2
                          class="counter text-purple"
                          v-if="this.nombreFournisseurs !== null"
                        >
                          {{ nombreFournisseurs }}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

      
        </div>
      </div>
        <!-- <barchart :Data="charData" :options="chartOptions"></barchart> -->
    </div>
  </div>
</template>
<script>

// import { ref } from 'vue'
//  import barchart from '@/components/barchart.vue'
//   import { useTransition, TransitionPresets } from '@vueuse/core'
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
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
    this.getNombreFournisseur();
    this.get_Nombre();
    
  },
  data() {
    return {
      chartData:{
          labels:["jan","feb","Mar"],
          datasets:{
            data:[100,200,300],
          }
      },
       chartOptions:{
         maintainAspectRatio:false,
         responsive:true,
      },
      user: null,
      newshow:false,
      isLoading: false,
      date_jour: new Date(),
      list_packages: null,
      nombrePackages: null,
      newNombrePackage:null,
      nombreTypePackages: null,
      nombreFournisseurs: null,
      seeNombre: true,
      see_nombre_package: true,
      nombre_package_fournisseur: null,
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
      let nombre = this.date_jour.getDate();
      let mois = this.date_jour.getMonth();
      let mois_J = this.mois[mois];
      let annee = this.date_jour.getFullYear();
      return jour_J + " " + nombre + " " + mois_J + " " + annee;
    },
  },
  methods: {
    get_Nombre() {
      if (this.user.tab[0] == "admin") {
        this.seeNombre = true;
        this.see_nombre_package = false;
        this.getNumberPackages();
        this.getData();
        this.getFournisseurs();
      }
      if (this.user.tab[0] == "fournisseur") {
        this.seeNombre = false;
        this.see_nombre_package = true;
      }
    },
    getNumberPackages() {
      this.isLoading = true;
      axios
        .get(lien + "/api/packages",{
          headers: {
            'Authorization':"Bearer "+this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("OBTENIRPACKAGES", res.data.data);
          this.list_packages = res.data.data;
          
           

          if(localStorage.getItem('nombre') < this.list_packages.length){
            this.newshow = !this.newshow
          }
          
          this.nombrePackages = this.list_packages.length;
          localStorage.setItem('nombre',this.nombrePackages)
           console.log("NOTIFICATION",this.newNombrePackage);
          this.isLoading = false;
          setTimeout(() =>{
            this.newshow = false
          },5000)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getData() {
      axios
        .get(lien + "/api/types",{
          headers: {
            'Authorization':"Bearer "+this.$store.state.token,
          },
        })
        .then((res) => {
          console.log("OBTENIRTYPESPACKAGES", res);
          this.listTypesPackages = res.data.data;
          this.nombreTypePackages = this.listTypesPackages.length;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getFournisseurs() {
      axios.get(lien + "/api/fournisseurs",{
        headers: {
            'Authorization':"Bearer "+this.$store.state.token,
          },
      })
      .then((res) => {
        console.log("OBTENIFOURNISSEURS", res);
        this.list_fournisseurs = res.data.data;
        this.nombreFournisseurs = this.list_fournisseurs.length;
        console.log("LISTFOURNISSEURS", this.list_fournisseurs);
      });
    },
    getNombreFournisseur() {
      this.isLoading = true;
      axios
        .get(lien + "/api/fourn_package/" + this.user.id, {
          headers: {
            'Authorization':"Bearer "+this.$store.state.token,
          },
        })

        .then((res) => {
          console.log("OBTENIRPACKAGES", res);
          this.packages = res.data.data;
          this.number_nombre_package_fournisseur = this.packages.length;
          console.log("LIST", this.packages);
          console.log("Nombre List", this.number_nombre_package_fournisseur);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // mouted() {
  //   this.getNewNombrePackage();
  // }
};
</script>
<style scoped>
.div_hello {
  padding: 1em !important;
  text-align: left;
  background: rgba(0, 0, 0, 0.888);
  color:rgb(255, 255, 255) !important;
  box-shadow:inset 1px 1px 10px rgba(0, 0, 0, 0.274) !important;
  border:5px solid rgb(236, 182, 4) !important;
  padding: 3em !important;
  margin: 1em 0 !important;
  border-radius: 10px !important;
}
.div_hello h1 {
  font-size: 3em;
}

.card {
  border-radius: 10px !important;
 color:black !important;
 font-weight: bold;
}
.card .card-body{
border-radius: 10px !important;
padding: 3em !important;
background: white;
box-shadow: 1px 1px 15px rgba(0, 0, 0, 0.274)   !important;

}
.page-titles {
  background: transparent;
  box-shadow: none;
}
.img-trader{
right:5em;
top:-30px;
width:240px !important;
}
</style>
