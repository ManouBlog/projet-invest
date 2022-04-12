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
              <li class="fw-bold h3"><span>listes des operations d' un utilisateur</span></li>
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

    <div class="row container">
      <div class="col-md-12">
        <div class="table-responsive"  >
          <table
            id="MyTableData"
            class="table" v-if="this.list_operations !== null" >
            <thead >
              <tr>
                <th class="bg-light">Numero</th>
                <th class="bg-light">Type de l'opération</th>
                 <th class="bg-light">Le montant</th>
                 <th class="bg-light">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in this.list_operations" :key="index">
                <td>
                {{ index+1 }}
                </td>
                <td>{{item.type}}</td>
                <td>{{moneyFormat.format(item.amount)}} Fcfa</td>
                 <td>{{new Date(item.created_at).toLocaleDateString('fr')}}</td>
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
// import Swal from "sweetalert2";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import axios from "axios";
import { lien } from "/src/assets/api.js";
import $ from "jquery";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "userOperation",
  data(){
      return {
          list_operations:null,
          isLoading:false,
           moneyFormat : new Intl.NumberFormat("de-DE")
      }
  },
  components: {
    Header,
    Menu,
    Footer,
    Loading
  },
  created(){
      this.isLoading = true;
      axios.get(lien+"opes/"+this.$route.params.id)
      .then((res) => {
      console.log("OBTENIRTYPESPACKAGES", res);
      this.list_operations=res.data.data;
      console.log("LISTTYPES", this.list_operations);
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
  
  }

</script>
<style scoped>
.my_footer{
position: relative !important;
bottom:-39em;
}
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

</style>