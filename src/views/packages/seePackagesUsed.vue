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
              <li class="fw-bold h3"><span>Types de Packages les plus utilisées</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
<div class="row container">
      <div class="col-md-12">
        <div class="table-responsive" v-if="this.listTypesPackages !== null"  >
          <table
            id="MyTableData"
            class="table">
            <thead >
              <tr>
                <th class="bg-light">Numero</th>
                <th class="bg-light">Nom du Type de Package</th>
                 <th class="bg-light">Le nombre de fois Utilisé</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="[key, value] of Object.entries(this.listTypesPackages)" :key="key">
                <td>
                {{ index+1 }}
                </td>
                <td>{{key}}</td>
                <td>{{value}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>



     </div>
     <Footer class="my_footer" v-if="this.listTypesPackages !== null"  ></Footer>

</template>
<script>
// import Swal from "sweetalert2";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Header from '@/components/header'
import Menu from '@/components/menu'
import Footer from '@/components/footer'

import {lien} from '/src/assets/api.js'
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
export default {
    name:"SeePackagesUsed",
    data() {
        return{
            listTypesPackages:null,
            index:0,
            isLoading:false,
        }
    },
    components: {
        Header,Menu,Footer,Loading
    },
    methods: {
         getData(){
      this.isLoading = true;
      axios.get(lien+"populars")
      .then((res) => {
      console.log("OBTENIRTYPESPACKAGES", res);
      this.listTypesPackages = res.data.data;
      console.log("LISTTYPES",this.listTypesPackages);
      this.isLoading = false;
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
    },
    created() {
        this.getData()
    }
}
</script>
<style scoped>
.my_footer{
position:relative;
width:100%;
bottom:-31em;
margin-left: 0 !important;
}
.table{
border:thin solid rgba(139, 139, 139, 0.63) !important;
}
th,td{
 border:thin solid rgba(141, 140, 140, 0.692) !important;
}

</style>