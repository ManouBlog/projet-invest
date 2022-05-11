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
                <span>Listes des articles publiés</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="row container-fluid">
      <div class="col-md-12">
        <div class="table-responsive">
          <table id="MyTableData" class="table" v-if="list_packages">
            <thead>
              <tr>
                <th class="bg-light">#</th>
                <th class="bg-light">Nom du fournisseur</th>
                <th class="bg-light">Nom de l'article</th>
                <th class="bg-light">Nombre de piéces</th>
                <th class="bg-light">Prix d'achat par pièce (Fcfa)</th>
                <th class="bg-light">Prix de vente par pièces (Fcfa)</th>
                <th class="bg-light">Gain par piéces</th>
                <th class="bg-light">Type de package</th>
                <th class="bg-light">Délai d'ecoulement (jours)</th>
                <th class="bg-light">Date de création</th>
                <th class="bg-light">Status</th>
                <th class="bg-light text-right">Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list_packages" :key="index">
                <td>
                  {{ index + 1 }}
                </td>
                <td>
                  {{ `${item.seller.nom} ${item.seller.prenoms}` }}
                </td>
                <td v-if="item.libelle">
                  {{ item.libelle }}
                </td>
                <td v-else>pas de package</td>
                <td>
                  {{ item.nb_products }}
                </td>
                <td>
                  {{ this.moneyFormat.format(item.cout_acquisition) }} Fcfa
                </td>
                <td>{{ this.moneyFormat.format(item.cout_vente) }} Fcfa</td>
                <td>{{ this.moneyFormat.format(item.gain_par_piece) }} Fcfa</td>
                <td v-if="item.type">
                  {{ item.type.libelle }}
                </td>
                <td v-else>pas de type</td>
                <td v-if="item.nb_jours !== null">{{ item.nb_jours }} jours</td>
                <td>
                  {{ new Date(item.created_at).toLocaleDateString("fr") }}
                </td>
                <td>
                  <span
                    v-if="item.etat == 'En cours de traitement'"
                    class="badge bg-warning bg-gradient"
                    >En cours de traitement</span
                  >
                  <span
                    v-if="item.etat == 'publie'"
                    class="badge bg-success bg-gradient"
                    >Publié</span
                  >
                  <span
                    v-if="item.etat == 'rejeter'"
                    class="badge bg-danger bg-gradient"
                  >
                    Rejeter</span
                  >
                </td>

                <td class="text-right">
                  <div
                    class="dropdown dropdown-action d-flex justify-content-center"
                  >
                    <router-link
                      :to="{ name: 'ModifierPackage', params: { id: item.id } }"
                      class="btn bg-pen boutons mx-2 bg-primary text-light"
                    >
                      <i class="bi bi-pencil-fill"></i>
                    </router-link>
                    <button
                      @click="show(item.id)"
                      title="Supprimer"
                      class="btn btn-lg boutons bg-danger text-light"
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
        <span class="fw-bold">vous-voulez vraiment supprimer ?</span>
        <button
          class="bg bg-pen text-light my-3 border-0 rounded p-2 fw-bold"
          @click="Supprime_Package(this.id_delete)"
        >
          Supprimer
        </button>
        <button
          class="bg bg-dark text-light border-0 rounded p-2 fw-bold"
          @click="fermer"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
  <Footer class="my_footer" v-if="list_packages !== null"></Footer>
</template>
<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Swal from "sweetalert2";
import { lien } from "/src/assets/api.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
export default {
  name: "Packagesnotpublish",
  data() {
    return {
      list_packages: null,
      isLoading: false,
      showMsg: false,
      id_delete: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
    };
  },
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },
  methods: {
    get_list_packages() {
      this.isLoading = true;
      axios
        .get(lien + "/api/publies", {
          headers: {
            Authorization: "Bearer " + this.$store.state.token,
          },
        })

        .then((res) => {
          console.log("OBTENIRPACKAGES", res.data.data);
          this.list_packages = res.data.data;
          console.log("LIST", this.list_packages);
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
    Supprime_Package(id) {
      axios
        .delete(lien + "/api/packages/" + id)
        .then((reponse) => {
          console.log("DELETEARRAY", reponse);
          if (reponse) {
            Swal.fire({
              text: "Package supprimé",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
          if (reponse.status !== true) {
            Swal.fire({
              text: "ce package à deja éte publier donc la suppression ne peut pas se faire",
              icon: "info",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
          this.showMsg = !this.showMsg;
          this.$router.push("/voirpackages");
        })
        .catch((error) => {
          if (error) {
            Swal.fire({
              text: "Package non supprimé",
              icon: "error",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
          }
        });
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
  },
  created() {
    this.get_list_packages();
  },
};
</script>
<style scoped>
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
.bg-danger {
  background: crimson !important;
  border: 1px solid black !important;
}
.my_footer {
  position: absolute;
  width: 100%;
  bottom: -9em;
  margin-left: 0 !important;
}
.boutons {
  width: 28px !important;
  height: 28px !important;
  display: flex;
  place-items: center;
  justify-content: center;
}
input,
select {
  border: 1px solid black !important;
}
.form-group {
  text-align: left !important;
}
</style>
