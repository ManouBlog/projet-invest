<template>
    <!-- <loading
    :active="isLoading"
    :can-cancel="true"
    :on-cancel="onCancel"
    :is-full-page="fullPage"
  ></loading> -->
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
                <!-- <span v-if="user !== null"
                  >Gain de {{ user.nom }} {{ user.prenoms }}</span
                > -->
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
        <a href="javascript:void(0)" class="back h4" @click="$router.go(-1)"
          ><box-icon name="left-arrow-alt" animation="tada"></box-icon
        >Investisseur</a>
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
// import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
// import Loading from "vue-loading-overlay";
// import "vue-loading-overlay/dist/vue-loading.css";
export default {
    name:'DetailRapportGain',
    data() {
        return {
            
        }
    },
    components: {
    Header,
    Menu,
    Footer,
    // Loading,
  },

   created() {
    this.isLoading = true;
    axios.get(lien + "/api/gains_inv/" + this.$route.params.id).then((res) => {
      console.log("GAINO invest", res);
      this.nombre = res.data.data.souscription;
      this.gain = res.data;
      console.log("GAIN", this.nombre);
      this.isLoading = false;
    });
  },
 
    
}
</script>
<style scoped>
icon {
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
.my_footer {
  position: relative;
  width: 100%;
  bottom: -20em;
  margin-left: 0 !important;
}
.user {
  text-align: left;
}
.icon {
  position: absolute;
  left: 1em;
  top: 0;
}

</style>