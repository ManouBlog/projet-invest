<template>
<loading :active="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
  <Header></Header>
  <Menu></Menu>
  <div class="page-wrapper">
    <div class="container-fluid position-relative">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Modifier</span></li>
            </ol>
          </div>
        </div>
      </div>
      <div class="icon">
        <a href="javascript:void(0)" class="back h1" @click="$router.go(-1)"
          ><box-icon name="left-arrow-alt" animation="tada"></box-icon
        ></a>
      </div>
    </div>
    <div class="row mb-5" v-if="this.package !== null">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <form class="mt-4" @submit.prevent="modify">
              <div class="form-group">
                <label class="form-label fw-bold">Changer la publication</label>
                <select v-model="this.package.validation" class="w-100 publie">
                  <option value="1">Publie</option>
                  <option value="0">Pas publié</option>
                </select>
              </div>
              <button
                type="submit"
                class="btn btn-lg bg-pen text-white"
              >
                Modifier
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer class="my_footer" v-if="list_souscrit !== null"></Footer>
</template>
<script>
import Swal from "sweetalert2";
import { lien } from "/src/assets/api.js";
import axios from "axios";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  name: "ModifySouscription",
  data() {
    return {
      list_souscrit: null,
      package: null,
      isLoading:false,
    };
  },
  components: {
    Header,
    Menu,
    Footer,
    Loading
  },
  
  created() {
    this.isLoading = true
    axios.get(lien + "achats").then((res) => {
      console.log("OBTENIRPACKAGES", res);
      this.list_souscrit = res.data.data;
      this.package = this.list_souscrit.find(
        (el) => el.id == this.$route.params.id
      );
      console.log("id/", this.$route.params.id);
      console.log("PACKAGES/", this.list_souscrit);
      this.isLoading = false
    });
  },
   methods: {
      modify(){
          axios.put(lien +'achats/'+this.$route.params.id,{
              validation:this.package.validation
          })
          .then((res) => {
              console.log("MODIFIER",res.data);
              if(res.data.status == 'true'){
                  Swal.fire({
              text:"Modification effectuée",
              icon: 'success',
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
            });
            this.$router.push('/souscription')
              }
          })
          .catch(error => {
              console.log(error);
          })

      }
  },
 
};
</script>
<style scoped>
.icon {
  position: absolute;
  left: 1em;
  top: 0;
}
.my_footer{
position:relative;
width:100%;
bottom:-18em;
margin-left: 0 !important;
}
.publie {
  min-height: 38px;
  border: 1px thin gray;
  border-radius: 0.25rem;
}
.bg-pen{
background: rgb(231, 202, 15) !important;
border:3px solid black !important;

}
</style>
