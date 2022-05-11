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
              <li class="fw-bold h3"><span>Packages</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="row container">
      <div class="created_package">
        <button
          class="btn btn-lg bouton-create-type-package text-light fw-bold"
          @click="type_package"
        >
          Créer un package
        </button>
      </div>

      <div class="col-md-12">
        <div class="table-responsive" v-if="listPackages !== null">
          <table id="MyTableData" class="table">
            <thead>
              <tr>
                <th class="bg-light">#</th>
                <th class="bg-light">Nom du package</th>
                <th class="bg-light">Photo</th>
                <th class="bg-light">Date de création</th>
                <th class="bg-light text-right">Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in listPackages" :key="index">
                <td>
                  {{ index + 1 }}
                </td>
                <td>{{ item.libelle }}</td>
                <td v-if="item.photo">
                  <img
                    class="w-25"
                    :src="'http://192.168.1.6:8000' + item.photo"
                    :alt="item.libelle"
                  />
                </td>
                <td v-else>
                  <span>pas d'image</span>
                </td>
                <td>
                  {{ new Date(item.created_at).toLocaleDateString("fr") }}
                </td>
                <td class="text-right">
                  <div
                    class="dropdown dropdown-action d-flex justify-content-center align-self-center"
                  >
                    <router-link
                      title="modifier"
                      :to="{ name: 'ModiyPackage', params: { id: item.id } }"
                      class="btn btn-lg bg-pen text-light boutons mx-2"
                      ><i class="bi bi-pencil-fill"></i
                    ></router-link>
                    <router-link
                      title="voir details"
                      :to="{ name: 'DetailsPackage', params: { id: item.id } }"
                      class="btn btn-lg bg-info text-light boutons mx-2"
                      ><i class="bi bi-eye"></i
                    ></router-link>

                    <button
                      title="supprimer"
                      @click.prevent="show(item.id)"
                      class="btn boutons btn-lg bg-danger text-light"
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
    <div class="type_package" v-if="show_type_package">
      <div>
        <form class="mt-4" @submit.prevent="postType_Packagee">
          <div class="card-header my-5">Creation de package</div>
          <div class="form-group">
            <label class="fw-bold mb-3 text-dark">Créer un package</label>
            <input
              type="text"
              class="form-control w-75 fw-bold mb-3"
              id="exampleInputEmail1"
              placeholder="Entrer le nom du package"
              v-model="libelle"
              required
            />
            <input type="file" @change="see" required />
          </div>
          <button type="submit" class="btn btn-lg bg-pen text-white">
            Envoyer
          </button>
          <button
            @click="type_package"
            type="submit"
            class="btn btn-lg btn-dark mx-2 text-white"
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
    <div class="delete_personne" v-show="showMsg">
      <div class="delete">
        <span class="fw-bold">voulez-vous vraiment supprimer?</span>
        <button
          class="bg bg-pen text-light my-3 border-0 rounded p-2 fw-bold"
          @click="delete_user(this.id_delete)"
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
  <Footer class="my_footer" v-if="listPackages !== null"></Footer>
</template>
<script>
import Swal from "sweetalert2";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import { lien } from "/src/assets/api.js";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
export default {
  name: "Seepackage",
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },

  data() {
    return {
      listPackages: null,
      show_type_package: false,
      isLoading: false,
      id_delete: null,
      showMsg: false,
      photo: null,
      libelle: null,
    };
  },

  methods: {
    type_package() {
      this.show_type_package = !this.show_type_package;
    },
    see(e) {
      this.photo = e.target.files[0];
      console.log(this.photo);
    },
    postType_Packagee() {
      let data = new FormData();
      data.append("photo", this.photo);
      data.append("libelle", this.libelle);
      axios
        .post(lien + "/api/types", data)
        .then((reponse) => {
          console.log("POSTTYPEPACKAGE", reponse);
          if (reponse.data.status === "true") {
            Swal.fire({
              text: "Type de package crée",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getData() {
      this.isLoading = true;
      axios.get(lien + "/api/types").then((res) => {
        console.log("OBTENIRPACKAGES", res);
        this.listPackages = res.data.data;
        console.log("LIST", this.listPackages);
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
    delete_user(id) {
      axios
        .delete(lien + "/api/types/" + id)
        .then((reponse) => {
          console.log("DELETEARRAY", reponse.data);
          if (reponse.data.status === "true") {
            if (reponse.data.data) {
              Swal.fire({
                text: "Type de package utilisé impossible a supprimer ",
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
              });
            }
          }
          if (reponse.data.status === "deleted") {
            Swal.fire({
              text: "type de package supprimer",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            setTimeout(() => {
              location.reload(true);
            }, 1500);
          }
          this.showMsg = false;
        })
        .catch((error) => {
          console.log(error);
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
    this.getData();
  },
};
</script>

<style scoped>
.table {
  border: thin solid rgba(139, 139, 139, 0.63) !important;
}
th,
td {
  border: thin solid rgba(141, 140, 140, 0.692) !important;
}

.type_package {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.295);
  z-index: 999;
  display: flex;
  place-items: center;
  justify-content: center;
}
.type_package form {
  background: rgb(255, 255, 255);
  width: 500px;
  height: 500px;
  padding: 2em;
  margin: 0 auto;
  border-radius: 25px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.295);
}
.card-header {
  background: rgb(1, 1, 34) !important;
  color: white !important;
  font-weight: bold !important;
}
.my_footer {
  position: relative;
  width: 100%;
  bottom: -10em;
  margin-left: 0 !important;
}
button:active {
  transform: translateY(-3px) scale(0.9);
}
.bg-pen {
  background: rgb(231, 202, 15) !important;
  border: 2px solid black !important;
}
.bg-info {
  border: 2px solid black !important;
}
.bg-danger {
  background: crimson !important;
  border: 2px solid black !important;
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
  width: 28px !important;
  height: 28px !important;
  display: flex;
  place-items: center;
  justify-content: center;
}
.created_package {
  text-align: left;
  margin-bottom: 1em;
}
.created_package button {
  background: linear-gradient(200deg, rgb(231, 202, 15), rgb(194, 191, 19));
  border: 2px solid black !important;
}
.w-25 {
  width: 50px !important;
}

.form-group {
  text-align: left !important;
}
</style>
