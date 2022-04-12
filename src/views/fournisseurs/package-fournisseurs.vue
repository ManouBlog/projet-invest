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
              <li class="fw-bold h3"><span>Package d'un utilisateur</span></li>
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
       <div class="row container-fluid">
      <div class="col-md-12">
       <h1 v-if="user">{{user.nom}} {{user.prenoms}}</h1>
        <div>
          <table id="MyTableData" class="table" v-if="packages_fournisseur !== null">
            <thead>
              <tr>
                <th class="bg-light">Numéro</th>
                 <th class="bg-light">Nom du package</th>
                <th class="bg-light">Cout d'acquisition</th>
                  <th class="bg-light">Cout de vente</th>
                <th class="bg-light">Délai</th>
                <th class="bg-light">Nombre de produits</th>
                <th class="bg-light">Gain</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in packages_fournisseur" :key="index">
                <td>
                  {{index+1}}
                </td>
                <td>
                  {{ item.libelle }}
                </td>
                <td>
                  {{ this.moneyFormat.format(item.cout_acquisition) }} Fcfa
                </td>
                 <td>
                  {{this.moneyFormat.format(item.cout_vente)}} Fcfa
                </td>
                <td>
                  {{ item.nb_jours}} jours
                </td>
                <td>
                  {{ item.nb_products}}
                </td>
                <td>
                  {{ this.moneyFormat.format(item.gain)}} Fcfa
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

</div>
  
<Footer class="my_footer" v-if="packages_fournisseur !== null"></Footer>
</template>
<script>
import Header from '@/components/header'
import Menu from '@/components/menu'
import Footer from '@/components/footer'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// import Swal from "sweetalert2";
import {lien} from '/src/assets/api.js'
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
export default {
    name:"Package-fournisseurs",
    components: {
        Header,Menu,Footer,Loading
    },
    data(){
        return{
            packages_fournisseur: null,
            user:null,
            moneyFormat : new Intl.NumberFormat("de-DE")
        }
    },
    methods: {
             getUser(){
               this.isLoading = true
          axios.get( lien+"fournisseurs")
              .then((res) => {
                console.log("OBTENIR USER",res.data.data);
                this.user = res.data.data.find(item=>item.id == this.$route.params.id)
                console.log("User",this.user)
                this.isLoading = false
              })
              .catch(error=>{
                console.log(error);
              })
             }
    },
    created() {
      this.isLoading = true
    axios
      .get(lien+`fourn_package/${this.$route.params.id}`)
      .then((res) => {
        console.log("OBTENIRPACKAGES", res);
        this.packages_fournisseur = res.data.data;
        console.log("LIST", this.packages_fournisseur);
        this.isLoading = false
        setTimeout(function () {
          $("#MyTableData").DataTable({
            pagingType: "full_numbers",
            pageLength: 10,
            processing: true,
            order: [],
            language: {
              décimal: "",
              emptyTable: "Aucune donnée disponible dans le tableau",
              infoEmpty: "Showing 0 to 0 of 0 entries",
              info: "Affichage de _START_ à _END_ sur _TOTAL_ entrées",
              infoFiltered: "(filtré à partir de _MAX_ entrées totales)",
              infoPostFix: "",
              thousands: ",",
              lengthMenu: "Afficher les entrées du _MENU_",
              loadingRecords: "Loading...",
              processing: "Processing...",
              search: "Chercher :",
              stateSave: true,
              zeroRecords: "Aucun enregistrement correspondant trouvé",
              paginate: {
                first: "Premier",
                last: "Dernier",
                next: "Suivant",
                previous: "Précédent",
              },
              aria: {
                sortAscending: ": activate to sort column ascending",
                sortDescending: ": activate to sort column descending",
              },
            },
          });
        }, 10);
      });
      this.getUser()
  },
   
}
</script>
<style scoped>
.icon {
  position: absolute;
  left: 1em;
  top: 0;
}
.table{
border:thin solid rgba(139, 139, 139, 0.63) !important;
}
th,td{
 border:thin solid rgba(141, 140, 140, 0.692) !important;
}
.my_footer{
position:relative;
width:100%;
bottom:-15em;
margin-left: 0 !important;
}
</style>