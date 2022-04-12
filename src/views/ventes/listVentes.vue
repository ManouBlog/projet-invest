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
              <li class="fw-bold h3"><span>Liste des rapports de ventes</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>

     <div class="row container-fluid">
      <div class="col-md-12">
        <div>
          <table id="MyTableData" class="table">
            <thead>
              <tr>
              <th class="bg-light">Numéro</th>
                <th class="bg-light">Date</th>
                <th class="bg-light">Nombre de produits vendus</th>
                <th class="bg-light">Cout total</th>
                <th class="bg-light text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in listVentes" :key="index">
                <td>
                  {{index+1}}
                </td>
                <td>
                  {{ new Date(item.created_at).toLocaleDateString('fr')}}
                </td>
                <td>
                  {{ item.nb_ventes}}
                </td>
                <td>
                  {{ moneyFormat.format(item.cout_total) }} Fcfa
                </td>
                <td class="text-right">
                  <div class="dropdown dropdown-action d-flex justify-content-center flex-wrap">
                    <router-link :to="{name:'detailsVentes',params:{id:item.id}}" title="Modifier l' utilisateur"  class="btn m-1 bg-pen text-light">
                       <i class="bi bi-eye"></i>
                    </router-link>
                    <button title="Supprimer l' utilisateur" class="btn btn-lg m-1 bg-danger text-light">
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    


    </div>
    <Footer class="my_footer"></Footer>
</template>
<script>
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { lien } from "/src/assets/api.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
export default {
   name:'ListVente',
   components:{
     Header,Menu,Footer,Loading
   },
   data() {
       return {
             listVentes:null,
             moneyFormat : new Intl.NumberFormat("de-DE")
       }
   },
   created() {
    this.isLoading = true;
    axios
      .get( lien+"ventes")
      .then((res) => {
        console.log("LISTESVENTES", res);
        this.listVentes = res.data.data;
        console.log("LISTVENTES", this.listVentes);
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
  },
}
</script>
<style scoped>
.my_footer{
position:relative;
width:100%;
bottom:-32em;
margin-left: 0 !important;
}

.bg-pen{
background: rgb(231, 202, 15) !important;
border:3px solid black !important;

}
.bg-danger{
background: crimson !important;
border:3px solid black !important;

}
.table{
border:thin solid rgba(139, 139, 139, 0.63) !important;
}
th,td{
 border:thin solid rgba(141, 140, 140, 0.692) !important;
}

</style>