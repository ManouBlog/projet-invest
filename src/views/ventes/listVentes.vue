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
              <li class="fw-bold h3"><span>Journal des ventes</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="row container-fluid">
      <div class="col-md-12">
        <div>
          <table id="MyTableData" class="table" v-if="this.listVentes !== null">
            <thead>
              <tr>
                <th class="bg-light">#</th>
                <th class="bg-light">Date d'enregistrement</th>
                <th class="bg-light">Nom de l'article</th>
                <th class="bg-light">Nombre de pièces vendus</th>
                <th class="bg-light">Chiffre réalisés</th>
                <th class="bg-light" v-if="this.user.tab[0] == 'admin'">
                  Fournisseurs
                </th>
                <!-- <th class="bg-light" v-if="this.user.tab[0] == 'admin'">
                  Souscripteurs
                </th> -->
                <!-- <th class="bg-light text-right">Détails</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listVentes" :key="index">
                <td>
                  {{ index + 1 }}
                </td>

                <td>
                  {{ new Date(item.created_at).toLocaleDateString("fr") }}
                </td>
                <td>
                  {{ item.package.libelle }}
                </td>
                <td>
                  {{ item.nb_ventes }}
                </td>
                <td>{{ moneyFormat.format(item.cout_total) }} Fcfa</td>
                <td v-if="this.user.tab[0] == 'admin'">
                  {{ item.fournisseur.nom }} {{ item.fournisseur.prenoms }}
                </td>
                <!-- <td v-if="this.user.tab[0] == 'admin'">
                  <span
                    v-for="(item, index) in item.souscripteurs"
                    :key="index"
                    class="d-block"
                  >
                    <b>-{{ item.nom }} {{ item.prenoms }}</b>
                  </span>
                </td> -->
                <!-- <td class="text-right">
                  <div class="dropdown dropdown-action d-flex justify-content-center flex-wrap">
                    <router-link  :to="{name:'detailsVentes',params:{id:item.id}}" data-title="détail vente"  class="btn m-1 boutons bg-pen text-light">
                       <i class="bi bi-eye"></i>
                    </router-link>
                  </div>
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="this.user.tab[0] == 'admin'" class="mt-5">
      <h2>listes des souscripteurs</h2>
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Souscripteurs</th>
            <th>Nombre de pièces</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in souscripteurs" :key="index">
            <td>{{index + 1 }}</td>
            <td>{{item.nom}} {{item.prenoms}}</td>
            <td>{{item.pieces_achetees}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    
  </div>
  <Footer class="my_footer"></Footer>
</template>
<script>
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { lien } from "/src/assets/api.js";
import $ from "jquery";
// import Swal from "sweetalert2";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
export default {
  name: "ListVente",
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },
  data() {
    return {
      listVentes: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      showMsg: false,
      id_delete: null,
      isLoading: false,
      user: this.$store.state.user,
      souscripteurs: null,
      // souscripteursone: null,
    };
  },
  created() {
    this.isLoading = true;
    axios.get(lien + "/api/ventes").then((res) => {
      console.log("LISTESVENTES", res);
      this.listVentes = res.data.data;
      if(this.listVentes.length > 0 ){
     this.souscripteurs = this.listVentes[0].souscripteurs;
      }
      
      // this.souscripteursone = this.souscripteurs.find(
      //   (item) => item.nb_ventes === this.listVentes.nb_ventes
      // );
      console.log("LISTVENTES", this.listVentes);
      console.log("SOUSCRIPTEURS", this.souscripteurs);
      // console.log("ONE", this.souscripteursone);
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
  methods: {},
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
.my_footer {
  position: relative;
  width: 100%;
  bottom: -32em;
  margin-left: 0 !important;
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
.delete_personne {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.099);
  top: 0;
  left: 0;
  display: flex;
  place-items: center;
  justify-content: center;
}
.delete {
  padding: 3em;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.285);
}
.boutons {
  width: 25px !important;
  height: 25px !important;
  display: flex;
  place-items: center;
  justify-content: center;
}
</style>
