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
                  >listes des operations de :<input
                    type="text"
                    v-model="user.nom"
                    disabled
                /></span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
        <a href="javascript:void(0)" class="back h4" @click="$router.go(-1)"
          ><box-icon name="left-arrow-alt" animation="tada"></box-icon
          >Utilisateur</a
        >
      </div>
    </div>

    <div class="row container">
      <div class="col-md-12">
        <div class="user row" v-if="user !== null">
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
            ><b class="fw-bold">Solde</b> :
            <input type="text" v-model="solde" disabled
          /></span> -->
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
                v-model="solde"
                disabled
              />
            </div>
          </div>
        </div>
        <div class="table-responsive">
          <table
            id="MyTableData"
            class="table"
            v-if="this.list_operations !== null"
          >
            <thead>
              <tr>
                <th class="bg-light">#</th>
                <th class="bg-light">Type de l'opération</th>
                <th class="bg-light">Le montant</th>
                <th class="bg-light">L'operateur</th>
                <th class="bg-light">Date de l'operation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in this.list_operations" :key="index">
                <td>
                  {{ index + 1 }}
                </td>
                <td>{{ item.type }}</td>
                <td>{{ moneyFormat.format(item.amount) }} Fcfa</td>
                <td>
                  {{ new Date(item.created_at).toLocaleDateString("fr") }}
                </td>
                <td>{{`${item.initiateur.nom} ${item.initiateur.prenoms}`}}</td>
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
export default {
  name: "userOperation",
  data() {
    return {
      list_operations: null,
      isLoading: false,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      user: null,
      solde: null,
    };
  },
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },
  methods: {
    getUser() {
      axios.get(lien + "/api/users").then((res) => {
        console.log("OBTENIRPACKAGES", res);
        this.list_user = res.data.data;
        this.user = this.list_user.find(
          (item) => item.id == this.$route.params.id
        );
        this.solde = `${this.moneyFormat.format(this.user.solde)} Fcfa`;
        console.log("LIST", this.list_user);
        console.log("USER", this.user);
      });
    },
  },
  created() {
    this.isLoading = true;
    axios.get(lien + "/api/opes/" + this.$route.params.id).then((res) => {
      console.log("OBTENIRTYPESPACKAGES", res);
      this.list_operations = res.data.data;
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
    this.getUser();
  },
};
</script>
<style scoped>
.my_footer {
  position: relative !important;
  bottom: -39em;
}
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
.user {
  text-align: left;
}
input,
select {
  border: 1px solid black !important;
}
.form-group {
  text-align: left !important;
}
label{
  font-weight: bold !important;
}
</style>
