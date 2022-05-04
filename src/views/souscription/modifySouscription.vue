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
              <li class="fw-bold h3"><span v-if="detailPackage !== null">details de l'article : <input type="text" v-model="detailPackage.libelle" disabled></span></li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
        <a href="javascript:void(0)" class="back h4" @click="$router.go(-1)"
          ><box-icon name="left-arrow-alt" animation="tada"></box-icon
        >Souscription</a>
      </div>
    </div>
    <div class="container px-5" v-if="detailPackage !== null" >
    <div>
    <h5 class="text-center badge bg-warning">Détail de l 'article</h5>
    </div>
    <table class="table" >
    <thead>
    <tr>
    <th>libelle</th>
    <th>Délai d'ecoulement</th>
    <th>Prix d'achat par pièce</th>
    <th>Prix de vente par pièce</th>
     <th>Nombre de pièces</th>
      <th>Gain par pièces</th>
     <th>Prix total d'achat  du package</th>
     <th>Prix total de vente du package</th>
     <th>Souscripteurs</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>{{detailPackage.libelle}}</td>
    <td>{{detailPackage.nb_jours}} jours</td>
    <td>{{moneyFormat.format(detailPackage.cout_acquisition)}} Fcfa</td>
    <td>{{moneyFormat.format(detailPackage.cout_vente)}} Fcfa</td>
    <td>{{detailPackage.nb_products}}</td>
    <td>{{moneyFormat.format(detailPackage.gain_par_piece)}}</td>
      <td>{{moneyFormat.format(detailPackage.nb_products*detailPackage.cout_acquisition)}} Fcfa</td>
    <td>{{moneyFormat.format(detailPackage.nb_products*detailPackage.cout_vente)}} Fcfa</td>
    <td>{{userWhoBuy.nom}} {{userWhoBuy.prenoms}}</td>
    </tr>
    </tbody>
    </table>
    
    </div>
    <div class="container px-5" v-if="userWhoBuy !== null">
    <div>
    <h5 class="text-center  badge bg-info bg-gradient">Rapport d'achat</h5>
    <!-- <h3 v-if="userWhoBuy !== null">Acheteur : {{userWhoBuy.nom}} {{userWhoBuy.prenoms}}</h3> -->
    </div>
    <table class="table" v-if="rapportAchat !== null">
    <thead>
    <tr v-if="this.rapportAchat !== null">
    <th>Nombre de pièces vendus</th>
     <th>Chiffre Réalisé</th>
     <th>Date d'enregistrement</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item,index) in rapportAchat" :key="index">
    <td>{{item.produits_vendus}}</td>
    <td>{{ moneyFormat.format(item.cout)}} Fcfa</td>
    <td>{{new Date(item.created_at).toLocaleDateString('fr')}}</td>
    </tr>
    </tbody>
    </table>
    
    </div>
   
  </div>
  <Footer class="my_footer" v-if="list_souscrit !== null"></Footer>
</template>
<script>
// import Swal from "sweetalert2";
import { lien } from "/src/assets/api.js";
import axios from "axios";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  name: "ModifySouscription",
  data() {
    return {
      list_souscrit: null,
      package: null,
      isLoading:false,
      detailPackage:null,
      userWhoBuy:null,
      rapportAchat:null,
      moneyFormat : new Intl.NumberFormat("de-DE"),
    };
  },
  components: {
    Header,
    Menu,
    Footer,
    Loading
  },
  
  created() {
    this.isLoading = true
    axios.get(lien +"/api/achats").then((res) => {
      console.log("OBTENIRPACKAGES", res);
      this.list_souscrit = res.data.data;
      this.package = this.list_souscrit.find(
        (el) => el.id == this.$route.params.id
      );
      this.detailPackage = this.package.package
      this.userWhoBuy = this.package.user
      this.rapportAchat = this.package.rapport
      console.log("id/", this.$route.params.id);
      console.log("PACKAGES/", this.package);
      console.log("DETAIL", this.detailPackage);
      console.log("USER",this.userWhoBuy);
      console.log("RAPPORT",this.rapportAchat);
      this.isLoading = false
    });
    
  },
 
 
};
</script>
<style scoped>
.icon {
  position: absolute;
  left: 1em;
  top: 0;
}
.float-left{
text-align: left !important;
}
.my_footer{
position:relative;
width:100%;
bottom:-18em;
margin-left: 0 !important;
}
.publie {
  min-height: 38px;
  border: 1px thin gray;
  border-radius: 0.25rem;
}
.bg-pen{
background: rgb(231, 202, 15) !important;
border:3px solid black !important;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.badge{
font-size:1.3em !important;
}
input,select{ 
  border: 1px solid black !important;
}
.form-group{ 
  text-align: left !important;
}
</style>
