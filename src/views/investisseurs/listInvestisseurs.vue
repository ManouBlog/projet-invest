<template>
  <loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></loading>
  <Header></Header>
  <Menu></Menu>
  <div class="page-wrapper">
    <div class="container-fluid position-relative">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Liste des investisseurs</span></li>
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
                <th class="bg-light">#</th>
                <th class="bg-light">Nom</th>
                <th class="bg-light">prénoms</th>
                <th class="bg-light">Email</th>
                <th class="bg-light">lieu d'habitation</th>
                <th class="bg-light text-right">Télephone</th>
                <th class="bg-light text-right">Solde sur compte</th>
                <th class="bg-light text-right">Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listInvestisseurs" :key="index">
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  {{ item.nom }}
                </td>
                <td>
                  {{ item.prenoms }}
                </td>
                <td>
                  {{ item.email }}
                </td>
                <td>
                  {{ item.lieu_habitation }}
                </td>
                <td>
                  {{ item.phone }}
                </td>
                <td>{{ moneyFormat.format(item.solde) }} Fcfa</td>
                <td class="text-right">
                  <div
                    class="dropdown dropdown-action d-flex justify-content-center flex-wrap"
                  >
                    <router-link
                      :to="{
                        name: 'gainInvestisseur',
                        params: { id: item.id },
                      }"
                      data-title="voir gain investisseur"
                      class="btn m-1 boutons bg-pen text-light"
                    >
                      <i class="bi bi-eye"></i>
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
  <Footer class="my_footer"></Footer>
</template>
<script>
import { lien } from "/src/assets/api.js";
import axios from "axios";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "listInvestisseurs",
  data() {
    return {
      listInvestisseurs: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },

  created() {
    this.isLoading = true;
    axios.get(lien + "/api/investisseurs").then((res) => {
      console.log("investisseurs", res);
      this.listInvestisseurs = res.data.data;
      console.log("LISTinvestisseurs", this.listInvestisseurs);
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
};
</script>
<style scoped>
a:hover::after {
  content: attr(data-title);
  position: absolute;
  top: 30px;
  left: 0;
  background: #000;
  font-size: 0.6em;
  padding: 0.5em 1em !important;
}
.bg-pen {
  background: rgb(231, 202, 15) !important;
  border: 1px solid black !important;
}
.bg-danger {
  background: crimson !important;
  border: 1px solid black !important;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}

.my_footer {
  position: relative;
  width: 100%;
  bottom: -30em;
  margin-left: 0 !important;
}
</style>
