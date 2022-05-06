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
              <li class="fw-bold h3" v-if="Detailpackages !== null"><span>Détails du package</span> <input type="text" v-model="Detailpackages.libelle" disabled> </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
        <a href="javascript:void(0)" class="back h4" @click="$router.go(-1)"
          ><box-icon name="left-arrow-alt" animation="tada"></box-icon
          >Packages</a
        >
      </div>
    </div>

    <div class="row container-fluid">
      <div class="col-md-12">
        <div>
          <table id="MyTableData" class="table" v-if="this.Detailpackages">
            <thead>
              <tr>
                <th class="bg-light">Nom</th>
                <th class="bg-light">Photo</th>
                <th class="bg-light">Nombre d'Article(s)</th>
                <th class="bg-light">Date de création</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                  <td>{{Detailpackages.libelle}}</td>
                <td>
                  <!-- <div class="spinner-border" role="status" v-if="this.Detailpackages.photo === null">
                   <span class="visually-hidden">Loading...</span>
                  </div> -->
                  <!-- <div v-if="Detailpackages.photo === null"></div> -->
                  <img
                    v-if="this.Detailpackages.photo"
                    class="w-25"
                    :src="'http://192.168.1.9:8000' + Detailpackages.photo"
                    :alt="Detailpackages.libelle"
                  />
                  <img v-else src="#" alt="Pas d'image" />
                </td>
                <td v-if="this.Detailpackages.package.length > 0">
                  {{ Detailpackages.package.length }}
                </td>
                <td v-else>Pas d'article</td>
                <td>{{new Date(Detailpackages.created_at).toLocaleDateString('fr')}}</td>
                <!-- <td >
                  {{ item.nb_products}} 
                </td> -->
                <!-- <td >
                  {{ moneyFormat.format(item.cout_acquisition)}} Fcfa
                </td>
                <td >
                  {{moneyFormat.format(item.cout_vente)}} Fcfa
                </td>
                <td >
                  {{ item.nb_jours}} jours
                </td>
                <td >
                  {{ new Date(item.created_at).toLocaleDateString('fr')}}
                </td> -->
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
// import $ from "jquery";
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
      Detailpackages: null,
      moneyFormat: new Intl.NumberFormat("de-DE"),
      isLoading: false,
      article: null,
      spin: false,
    };
  },
  methods: {},
  created() {
    this.isLoading = true;
    axios
      .get(lien + "/api/show-package/" + this.$route.params.id)
      .then((res) => {
        console.log("OBTENIR DETAIL", res);
        this.Detailpackages = res.data.data;
        this.isLoading = false;
        console.log("DETAIL", this.Detailpackages);
      });
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
  position: absolute;
  width: 100%;
  bottom: -7em;
  margin-left: 0 !important;
}
</style>
