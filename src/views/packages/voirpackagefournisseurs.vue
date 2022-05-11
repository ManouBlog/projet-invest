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
              <li class="fw-bold h3"><span>Mes articles</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="row container-fluid">
      <div class="row">
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
            <label class="form-label">prenoms</label>
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
            <label class="form-label">Solde</label>
            <input
              type="text"
              class="form-control form-control-danger"
              v-model="currency"
              disabled
            />
          </div>
        </div>
      </div>
      <!-- <div class="float">
        <span class="fw-bold">Nom:</span>
        <input type="text" v-model="user.nom" disabled /><br />
        <span class="fw-bold">Prénoms:</span>
        <input type="text" v-model="user.prenoms" disabled /><br />
        <span class="fw-bold">Email:</span>
        <input type="text" v-model="user.email" disabled /><br />
        <span class="fw-bold">Solde:</span>
        <input type="text" v-model="currency" disabled />
      </div> -->
      <div class="created_package mt-2">
        <button
          class="btn btn-lg bouton-create-type-package text-light fw-bold"
          @click="addPackage"
        >
          Creer un article
        </button>
      </div>
      <div class="col-md-12">
        <div>
          <table id="MyTableData" class="table" v-if="this.packages !== null">
            <thead>
              <tr>
                <th class="bg-light">#</th>
                <th class="bg-light">Nom de l'article</th>
                <th class="bg-light">Prix d'achat par pièce (Fcfa)</th>
                <th class="bg-light">Prix de vente par pièces (Fcfa)</th>
                <th class="bg-light">Gain par pièce</th>
                <th class="bg-light">Délai d'ecoulement (jours)</th>
                <th class="bg-light">Nombre de pièces</th>
                <th class="bg-light">Etat</th>
                <th class="bg-light text-right">Date d'enregistrement</th>
                <th class="bg-light text-right">Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in packages" :key="index">
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  {{ item.libelle }}
                </td>
                <td>{{ moneyFormat.format(item.cout_acquisition) }} Fcfa</td>
                <td>{{ moneyFormat.format(item.cout_vente) }} Fcfa</td>
                <td>{{ moneyFormat.format(item.gain_par_piece) }} Fcfa</td>
                <td>{{ item.nb_jours }} jours</td>
                <td>{{ item.nb_products }}</td>
                <td>
                  <span
                    v-if="item.etat == 'en cours de traitement'"
                    class="badge bg-info bg-gradient"
                    >En cours de traitement</span
                  >
                  <span
                    v-if="item.etat == 'publie'"
                    class="badge bg-success bg-gradient"
                    >Publié</span
                  >
                  <span
                    v-if="item.etat == 'rejete'"
                    class="position-relative verif badge bg-danger bg-gradient"
                  >
                    Rejeter</span
                  >
                </td>
                <td>
                  {{ new Date(item.created_at).toLocaleDateString("fr") }}
                </td>

                <td class="text-right">
                  <div
                    class="dropdown dropdown-action d-flex justify-content-center align-self-center"
                  >
                    <router-link
                      v-if="item.etat == 'rejete'"
                      title="Detail Package"
                      :to="{
                        name: 'ModifierPackageRejete',
                        params: { id: item.id },
                      }"
                      class="btn boutons m-1 bg-pen text-light"
                    >
                      <i class="bi bi-eye"></i>
                    </router-link>
                    <!-- <router-link title="Modifier l' utilisateur" :to="{name:'AssignerRole',params:{id:item.id}}" class="btn boutons  m-1 bg-pen text-light">
                       <i class="bi bi-pencil-fill"></i>
                    </router-link> -->
                    <button
                      v-if="
                        item.etat == 'en cours de traitement' ||
                        item.etat == 'rejete'
                      "
                      @click="show(item.id)"
                      title="Supprimer l' utilisateur"
                      class="btn btn-lg m-1 boutons bg-danger text-light"
                    >
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
    <div class="delete_personne" v-show="showMsg">
      <div class="delete">
        <span class="fw-bold">vous-voulez vraiment supprimer l'article?</span>
        <button
          class="btn btn-lg bg-pen text-light my-3 border-0 rounded p-2 fw-bold"
          @click="delete_article"
        >
          Supprimer
        </button>
        <button
          class="btn btn-lg bg-dark text-light border-0 rounded p-2 fw-bold"
          @click="fermer"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
  <Footer class="my_footer" v-if="this.packages !== null"></Footer>
</template>
<script>
import Swal from "sweetalert2";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { lien } from "/src/assets/api.js";
import axios from "axios";
export default {
  name: "VoirPackageFournisseurs",
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },
  data() {
    return {
      user: null,
      packages: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      isLoading: false,
      currency: null,
      showMsg: false,
      id_delete: null,
    };
  },
  methods: {
    addPackage() {
      this.$router.push("/package");
    },
    show(id) {
      this.showMsg = !this.showMsg;
      this.id_delete = id;
      console.log("ID A DELETE", this.id_delete);
    },
    fermer() {
      this.showMsg = !this.showMsg;
      this.id_delete = null;
      console.log("ID A DELETE", this.id_delete);
    },
    delete_article() {
      axios
        .delete(lien + "/api/packages/" + this.id_delete)
        .then((reponse) => {
          console.log(reponse);
          if (reponse.data.status == "true") {
            Swal.fire({
              text: "Article Supprimé",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.showMsg = false;
            setTimeout(() => {
              window.location.reload(true);
            }, 1500);
          }
          if (reponse.data.status == "false") {
            Swal.fire({
              text: "Echec",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
          // if (
          //   reponse.data.status !== "false" &&
          //   reponse.data.status !== "true"
          // ) {
          //   Swal.fire({
          //     text: "les packages du forunisseur sont déja utilisés donc impossible de le supprimer",
          //     icon: "info",
          //     showConfirmButton: false,
          //     timer: 1500,
          //     timerProgressBar: true,
          //   });
          //   this.showMsg = false;
          // }
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            text: "Echec",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        });
    },
  },
  created() {
    this.user = this.$store.state.user;
    this.currency = `${this.moneyFormat.format(this.user.solde)} Fcfa`;
    this.isLoading = true;
    axios
      .get(lien + "/api/fourn_package/" + this.user.id, {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      })

      .then((res) => {
        console.log("OBTENIRPACKAGES", res);
        this.packages = res.data.data;
        console.log("LIST", this.packages);
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
.float {
  text-align: left;
}
.my_footer {
  position: relative;
  width: 100%;
  bottom: -10em;
  margin-left: 0 !important;
}
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}
.created_package {
  text-align: left;
  margin-bottom: 1em;
}
.created_package button {
  background: linear-gradient(200deg, rgb(231, 202, 15), rgb(194, 191, 19));
  border: 2px solid black !important;
}

.bg-pen {
  background: rgb(231, 202, 15) !important;
  border: 1px solid black !important;
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
.bg-danger {
  background: crimson !important;
  border: 2px solid black !important;
}
.boutons {
  width: 28px !important;
  height: 28px !important;
  display: flex;
  place-items: center;
  justify-content: center;
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
</style>
