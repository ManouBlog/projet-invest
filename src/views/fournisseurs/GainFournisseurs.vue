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
                  >Gain de :<input type="text" v-model="user.nom" disabled
                /></span>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
        <a href="javascript:void(0)" class="back h4" @click="$router.go(-1)"
          ><box-icon name="left-arrow-alt" animation="tada"></box-icon
          >Fournisseur</a
        >
      </div>
    </div>

    <div class="row container-fluid">
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
                v-model="money"
                disabled
              />
            </div>
          </div>
          <!-- <span> <b class="fw-bold">Nom</b>  : <input type="text" v-model="user.nom" disabled></span> <br>
       <span><b class="fw-bold">prenoms</b> :<input type="text" v-model="user.prenoms" disabled></span> <br>
       <span><b class="fw-bold">email</b> : <input type="text" v-model="user.email" disabled></span><br>
       <span><b class="fw-bold">Télephone</b> : <input type="text" v-model="user.phone" disabled></span> <br>
       <span><b class="fw-bold">Solde</b> : <input type="text" v-model="money" disabled></span> <br>
        <span v-if="user.registre_commerce"><b class="fw-bold">Registre de commerce</b> : <input type="text" v-model="user.registre_commerce" disabled></span>
         <span v-else><b class="fw-bold">Registre de commerce :</b> <input type="text" v-model="rgnot" disabled></span> -->
        </div>
        <div>
          <table id="MyTableData" class="table">
            <thead>
              <tr>
                <th class="bg-light">#</th>
                <th class="bg-light">Nom de l'article</th>
                <th class="bg-light">Nombre de pièces</th>
                <th class="bg-light">Prix d'achat par pièce (Fcfa)</th>
                <th class="bg-light">Prix de vente par pièce</th>
                <!-- <th class="bg-light">Prix de vente</th>
                <th class="bg-light">Prix de Vente</th> -->
                <!-- <th class="bg-light">Prix de vente</th> -->

                <!-- <th class="bg-light">Gain par pièces</th> -->

                <th class="bg-light">Coût du package</th>
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
                <td>
                  {{ item.nb_products }}
                </td>
                <td>{{ moneyFormat.format(item.cout_acquisition) }} Fcfa</td>
                <td>{{ moneyFormat.format(item.cout_vente) }} Fcfa</td>

                <!-- <td>{{moneyFormat.format(item.gain_par_piece)}} Fcfa</td> -->
                <td>{{ moneyFormat.format(item.gain_par_package) }} Fcfa</td>
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
import axios from "axios";
// import Swal from "sweetalert2";
import { lien } from "/src/assets/api.js";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "GainFournisseurs",
  components: {
    Header,
    Menu,
    Footer,
    Loading,
  },
  data() {
    return {
      packages: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      isLoading: false,
      user: null,
      gainFournisseur: null,
      money: null,
      rgnot: "le registre n'existe pas",
    };
  },
  methods: {
    getUser() {
      axios
        .get(lien + "/api/fournisseurs")
        .then((res) => {
          console.log("OBTENIR USER", res.data.data);
          this.user = res.data.data.find(
            (item) => item.id == this.$route.params.id
          );
          console.log("User", this.user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.isLoading = true;
    axios.get(lien + "/api/gains/" + this.$route.params.id).then((res) => {
      console.log("OBTENIR GAIN", res);
      this.packages = res.data.data;
      this.gainFournisseur = res.data.gain;
      this.money = `${this.moneyFormat.format(this.gainFournisseur)} Fcfa`;
      console.log("GAIN", this.packages);
      console.log("GAINFOUR", this.gainFournisseur);
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
.my_footer {
  position: relative;
  width: 100%;
  bottom: -18em;
  margin-left: 0 !important;
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
</style>
