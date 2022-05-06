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
    <div class="container-fluid">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3">
                <span>Liste des souscriptions(Packages)</span>
              </li>
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
                <th class="bg-light">#</th>
                <th class="bg-light">Nom de l'article</th>
                
                <!-- <th class="bg-light">Prix d'achat par pièce</th>
                <th class="bg-light">Prix de vente par pièce</th>
                <th class="bg-light">Gain par pièces</th> -->
                <!-- <th class="bg-light">Nombre de pièces</th> -->
                <!-- <th class="bg-light">Délai d'ecoulement</th> -->
                <th class="bg-light">Souscripteurs</th>
                <th class="bg-light">Nombre de pièces achetées</th>
                <th class="bg-light">Prix Total des pièces achetées</th>

                <!-- <th class="bg-light">date d échéance</th>
                <th class="bg-light">Publication</th>   -->
                <!-- <th class="bg-light">Payés</th> -->
                <th class="bg-light">Date de souscription</th>
                <th class="bg-light">Date d'échéance</th>
                <th class="bg-light">Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list_souscrit" :key="index">
                <td v-if="item.package">
                  {{ index + 1 }}
                </td>
                <td v-if="item.package">
                  {{ item.package.libelle }}
                </td>
                <!-- <td v-if="item.package">
                  {{ moneyFormat.format(item.package.cout_acquisition) }} Fcfa
                </td>
                <td v-if="item.package">
                  {{ moneyFormat.format(item.package.cout_vente) }} Fcfa
                </td>
                <td v-if="item.package">
                  {{ moneyFormat.format(item.package.gain_par_piece) }} Fcfa
                </td> -->
                <!-- <td v-if="item.package">
                  {{ moneyFormat.format(item.package.nb_products) }}
                </td> -->
                <!-- <td v-if="item.package">
                  {{ item.package.nb_jours }} jours
                </td> -->
                <td v-if="item.user">
                  {{ item.user.nom }} {{ item.user.prenoms }}
                </td>
                 <td>
                  {{ item.nb_pieces }}
                </td>
                <td v-if="item.package"     >
                  {{`${moneyFormat.format(item.nb_pieces * item.package.cout_acquisition)} Fcfa`}}
                </td>
                <td>
                  {{ new Date(item.created_at).toLocaleDateString("fr") }}
                </td>
                <td v-if="item.package">
                  {{
                    new Date(
                      this.addDaysToDate(
                        item.package.created_at,
                        item.package.nb_jours
                      )
                    ).toLocaleDateString("fr")
                  }}
                </td>
                <!-- <td v-if="item.package">
                  <span v-if="item.package.publie == 1" class="badge bg-success bg-gradient">publie</span>
                  <span v-if="item.package.publie == 0" class="badge bg-danger bg-gradient"> pas publie</span>
                </td>
                 <td>-->
                <!--<span v-if="item.consommed == 1" class="badge bg-success bg-gradient">payé</span>
                  <span v-if="item.consommed == 0" class="badge bg-danger bg-gradient"> non payé</span>
                </td> -->
                <td class="text-right" v-if="item.package">
                  <div class="dropdown dropdown-action">
                    <router-link
                      :to="{
                        name: 'modifier-souscription',
                        params: { id: item.id },
                      }"
                      class="btn ms-3 bg-pen text-light boutons"
                      data-title="détail-souscription"
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

  <Footer class="my_footer" v-if="list_souscrit !== null"></Footer>
</template>
<script>
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
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
      isLoading: false,
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  methods: {
    addDaysToDate(date, days) {
      var res = new Date(date);
      res.setDate(res.getDate() + days);
      return res;
    },
  },
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },
  created() {
    this.isLoading = true;
    axios.get(lien + "/api/achats").then((res) => {
      console.log("OBTENIR LES PACKAGES", res);
      this.list_souscrit = res.data.data;
      console.log("LIST", this.list_souscrit);
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
  top: 10px;
  left: 30px;
  background: #000;
  font-size: 0.6em;
  padding: 0.5em 1em !important;
}
.my_footer {
  position: relative;
  width: 100%;
  bottom: -7em;
  margin-left: 0 !important;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.bg-pen {
  background: rgb(231, 202, 15) !important;
  border: 1px solid black !important;
}
.my_footer {
  position: absolute;
  width: 100%;
  bottom: -5em;
  margin-left: 0 !important;
}
.boutons {
  width: 25px !important;
  height: 25px !important;
  display: flex;
  place-items: center;
  justify-content: center;
}
</style>
