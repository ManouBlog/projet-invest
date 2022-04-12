<template>
<loading :active="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
  <Header></Header>
  <Menu></Menu>
  <div class="page-wrapper">
    <div class="container-fluid">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Liste des souscriptions(Packages)</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
    <div class="row container-fluid">
      <div class="col-md-12">
        <div>
          <table id="MyTableData" class="table" v-if="list_souscrit !== null">
            <thead>
              <tr>
                <th class="bg-light">Numero</th>
                <th class="bg-light">Nom de Package</th>
                <th class="bg-light">Nombre de Produits</th>
                <th class="bg-light">Délai</th>
                <th class="bg-light">Gain</th>
                <th class="bg-light">Cout de vente</th>
                <th class="bg-light">Cout d'acquisition</th>
                 <th class="bg-light">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list_souscrit" :key="index">
                <td v-if="item.package.length > 0">
                  {{ index + 1 }}
                </td>
                 <td v-if="item.package.length > 0">
                  {{ item.package[0].libelle }}
                </td>
                <td v-if="item.package.length > 0">
                  {{ item.package[0].nb_products }}
                </td>
                <td v-if="item.package.length > 0">
                  {{ item.package[0].nb_jours }} Jours
                </td>
                <td v-if="item.package.length > 0">
                  {{ this.moneyFormat.format(item.package[0].gain) }} Fcfa
                </td>
                <td v-if="item.package.length > 0">
                {{ this.moneyFormat.format(item.package[0].cout_vente) }} Fcfa
                </td>
                <td v-if="item.package.length > 0">
                  {{ this.moneyFormat.format(item.package[0].cout_acquisition) }} Fcfa
                </td>
                  <td class="text-right" v-if="item.package.length > 0">
                    <div class="dropdown dropdown-action">
                      <router-link
                        :to="{ name:'modifier-souscription', params: { id: item.id } }"
                        class="btn mx-4 bg-pen text-light"
                        title="Modifier"
                      >
                        <i class="bi bi-pencil-fill"></i>
                      </router-link>
                    </div>
                  </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Footer class="my_footer" v-if="list_souscrit !== null"></Footer>
</template>
<script>
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// import Swal from "sweetalert2";
import { lien } from "/src/assets/api.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
export default {
  name: "listSouscription",
  data() {
    return {
      list_souscrit: null,
      isLoading:false,
      moneyFormat : new Intl.NumberFormat("de-DE")
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
    axios.get(lien + "achats").then((res) => {
      console.log("OBTENIR LES PACKAGES", res);
      this.list_souscrit = res.data.data;
      console.log("LIST", this.list_souscrit);
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
};
</script>
<style scoped>
.my_footer{
position:relative;
width:100%;
bottom:-7em;
margin-left: 0 !important;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.bg-pen{
background: rgb(231, 202, 15) !important;
border:3px solid black !important;
}
.my_footer{
position:relative;
width:100%;
bottom:-24em;
margin-left: 0 !important;
}
</style>
