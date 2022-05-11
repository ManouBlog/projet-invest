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
              <li class="fw-bold h3">
                <span v-if="user !== null"
                  >Gain de <input type="text" v-model="user.nom" disabled
                /></span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
        <a href="javascript:void(0)" class="back h4" @click="$router.go(-1)"
          ><box-icon name="left-arrow-alt" animation="tada"></box-icon
          >Investisseur</a
        >
      </div>
    </div>

    <div class="row container-fluid" v-if="gain !== null">
      <div class="col-md-12">
        <div class="user row" v-if="user !== null">
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-label">Nom</label>
              <input
                type="text"
                class="form-control form-control-danger"
                v-model="user.nom"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-label">Prénoms</label>
              <input
                type="text"
                class="form-control form-control-danger"
                v-model="user.prenoms"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-label">email</label>
              <input
                type="text"
                class="form-control form-control-danger"
                v-model="user.email"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-label">Télephone</label>
              <input
                type="text"
                class="form-control form-control-danger"
                v-model="user.phone"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-label">Registre de commerce</label>
              <input
                type="text"
                class="form-control form-control-danger"
                v-model="user.registre_commerce"
                disabled
              />
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
              <label class="form-label">Solde</label>
              <input
                type="text"
                class="form-control form-control-danger"
                v-model="currency"
                disabled
              />
            </div>
          </div>
          <!-- <span>
            <b class="fw-bold">Nom</b> :
            <input type="text" v-model="user.nom" disabled
          /></span>
          <br />
          <span
            ><b class="fw-bold">prenoms</b> :
            <input type="text" v-model="user.prenoms" disabled
          /></span>
          <br />
          <span
            ><b class="fw-bold">email</b> :
            <input type="text" v-model="user.email" disabled /></span
          ><br />
          <span
            ><b class="fw-bold">Télephone</b> :
            <input type="text" v-model="user.phone" disabled
          /></span>
          <br />
          <span
            ><b class="fw-bold">Solde Actuel</b> :
            <input type="text" v-model="currency" disabled
          /></span> -->
        </div>
        <div>
          <table id="MyTableData" class="table">
            <thead>
              <tr>
                <th class="bg-light">Montant investi</th>
                <!-- <th class="bg-light">Gain investis</th> -->
                <th class="bg-light">Gain reçus</th>
                <th class="bg-light">Nombre d'article souscris</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ moneyFormat.format(gain.invest) }} Fcfa</td>
                <td>{{ moneyFormat.format(gain.received) }} Fcfa</td>
                <td class="text-right">
                  {{ nombre.length }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="nombre !== null" class="container px-5">
      <h4 class="badge bg-info bg-gradient">Les articles souscris</h4>
      <table class="table" v-if="nombre !== null">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom de l'article</th>
            <!-- <th>Prix d'achat par pièce (Fcfa)</th> -->
            <th>prix d'achat du package</th>
            <th>Prix de vente du package</th>
            <!-- <th>Benefice sur package</th> -->
            <th>Détails</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in nombre" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.libelle }}</td>
            <!-- <td>{{ moneyFormat.format(item.cout_acquisition) }} Fcfa</td> -->
            <td>
              {{ moneyFormat.format(item.cout_acquisition * item.nb_achetes) }}
              Fcfa
            </td>
            <td>
              {{ moneyFormat.format(item.nb_products * item.cout_vente) }} Fcfa
            </td>
            <!-- <td>{{ moneyFormat.format(item.gain_par_piece * item.nb_products) }} Fcfa</td> -->
            <td>
              <div
                class="dropdown dropdown-action d-flex justify-content-center flex-wrap"
              >
                <button
                  class="btn boutons m-1 bg-pen text-light"
                  title="voir rapport gain"
                  @click="getRapport(item.id, item.libelle)"
                >
                  <i class="bi bi-eye"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="get_rapport" v-if="showRapport">
      <div class="p-5 position-relative">
        <h4>Journal de vente</h4>
        <hr />
        <i class="bi bi-x-circle position-absolute" @click="close_rapport"></i>
        <h5 v-if="libelle !== null">Nom du package: {{ libelle }}</h5>
        <table class="table" v-if="gainRapport !== null">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre de pièces vendus</th>
              <th>Montant recus</th>
              <th>Date d'enregistrement</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in gainRapport" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.produits_vendus }}</td>
              <td>{{ moneyFormat.format(item.cout) }} Fcfa</td>
              <td>{{ new Date(item.created_at).toLocaleDateString("fr") }}</td>
            </tr>
          </tbody>
        </table>
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
  name: "gainInvestisseur",
  data() {
    return {
      gain: null,
      user: null,
      isLoading: false,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      nombre: null,
      rapport: null,
      gainRapport: null,
      showRapport: false,
      libelle: null,
      benefice: null,
      currency: null,
    };
  },
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },
  methods: {
    getInvest() {
      this.isLoading = true;
      axios
        .get(lien + "/api/investisseurs")
        .then((res) => {
          console.log("OBTENIR Invest", res.data.data);
          this.user = res.data.data.find(
            (item) => item.id == this.$route.params.id
          );
          this.currency = `${this.moneyFormat.format(this.user.solde)} Fcfa`;
          console.log("User", this.user);
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRapport(id, libelle) {
      axios
        .get(lien + "/api/gains_inv/" + this.$route.params.id)
        .then((res) => {
          console.log(res);
          this.nombre = res.data.data.souscription;
          this.rapport = this.nombre.find((item) => item.id == id);
          this.gainRapport = this.rapport.rapport;
          console.log("RAPPORT", this.gainRapport);
          this.libelle = libelle;
          this.showRapport = !this.showRapport;
        });
    },
    close_rapport() {
      this.gainRapport = null;
      this.showRapport = !this.showRapport;
    },
  },
  created() {
    this.isLoading = true;
    axios.get(lien + "/api/gains_inv/" + this.$route.params.id).then((res) => {
      console.log("GAINO invest", res);
      this.nombre = res.data.data.souscription;
      this.gain = res.data;
      console.log("PACKAGE ", this.nombre);
      console.log("GAIN2", this.gain);
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
    this.getInvest();
  },
};
</script>
<style scoped>
.icon {
  position: absolute;
  left: 1em;
  top: 0;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.bg-pen {
  background: rgb(231, 202, 15);
  border: 1px solid black !important;
}
.my_footer {
  position: absolute !important;
  width: 100%;
  bottom: -8em;
  margin-left: 0 !important;
}
.user {
  text-align: left;
}
.get_rapport {
  width: 100% !important;
  height: 100% !important;
  position: fixed !important;
  top: 0;
  left: 0;
  display: flex !important;
  place-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.468);
}
.get_rapport div {
  background: white;
}
.bi-x-circle {
  top: 0;
  right: 0.5em;
  font-size: 2em;
  color: crimson;
  cursor: pointer;
}
.badge {
  font-size: 1em !important;
}
input,
select {
  border: 1px solid black !important;
}
.form-group {
  text-align: left !important;
}
label {
  font-weight: bold !important;
}
a:active {
  background-color: gray !important;
}
</style>
