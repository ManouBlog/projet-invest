<template>
<loading :active="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
    <Header></Header>
  <Menu></Menu>
  <div class="page-wrapper">
    <div class="container-fluid">
      <div class="row page-titles">
        <div class="col-md-5 align-self-center"></div>
        <div class="col-md-7 align-self-center text-end">
          <div class="d-flex justify-content-end align-items-center">
            <ol class="breadcrumb justify-content-end">
              <li class="fw-bold h3"><span>Mes articles souscris</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>
<div class="row container-fluid">
     <div class="col-md-12">
        <div class="table-responsive">
          <table id="MyTableData" class="table" v-if="this.articles !== null">
            <thead>
              <tr>
                <th class="bg-light">#</th>
                <th class="bg-light">Nom de l'article</th>
                <th class="bg-light">Prix d'achat par pièce</th>
                <th class="bg-light">Prix de vente par pièces</th>
                <th class="bg-light">Gain par pièce</th>
                <th class="bg-light">Délai d'ecoulement</th>
                <th class="bg-light">Nombre de pièces</th>
                <th class="bg-light">Etat</th>
                <th class="bg-light text-right">Date d'enregistrement</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in articles" :key="index">
                <td>
                  {{index+1}}
                </td>
                <td>
                  {{item.libelle}}
                </td>
                <td>
                  {{moneyFormat.format(item.cout_acquisition)}} Fcfa
                </td>
                <td>
                  {{ moneyFormat.format(item.cout_vente)}} Fcfa
                </td>
                <td>
                  {{ moneyFormat.format(item.gain_par_piece) }} Fcfa
                </td>
                <td>{{ item.nb_jours }} jours</td>
                <td>{{ item.nb_products }}</td>
                <td>
                  <span v-if="item.etat == 'en cours de traitement'" class="badge bg-info bg-gradient">En cours de traitement</span>
                  <span v-if="item.etat == 'publie'" class="badge bg-success bg-gradient">Publié</span>
                  <span v-if="item.etat == 'rejete'" class="badge bg-danger bg-gradient"> Rejeter</span>
                </td>
                <td>{{ new Date(item.created_at).toLocaleDateString('fr') }}</td>
                
                <!-- <td class="text-right">
                  <div class="dropdown dropdown-action d-flex justify-content-center flex-wrap">
                      <router-link title="Voir les operations" :to="{name:'userOperation',params:{id:item.id}}" class="btn boutons  m-1 bg-pen text-light">
                      <i class="bi bi-eye"></i>
                    </router-link>
                    <router-link title="Modifier l' utilisateur" :to="{name:'AssignerRole',params:{id:item.id}}" class="btn boutons  m-1 bg-pen text-light">
                       <i class="bi bi-pencil-fill"></i>
                    </router-link>
                    <button @click="show(item.id)" title="Supprimer l' utilisateur" class="btn btn-lg m-1 boutons  bg-danger text-light">
                      <i class="bi bi-trash3-fill"></i>
                    </button>
                  </div>
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
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { lien } from "/src/assets/api.js";
import axios from "axios";

export default {
    name:"MesPackageSouscris",
     components:{
    Header,Menu,Footer,Loading
  },
    data() {
        return{ 
             user:this.$store.state.user,
             moneyFormat : new Intl.NumberFormat("de-DE"),
           isLoading:false,
           articles:null
        }
         
    },
     created() {
    this.isLoading = true;
    axios.get(lien+"/api/souscris/"+this.user.id,
    { headers: {
            'Authorization':"Bearer "+this.$store.state.token,
          },})

      .then((res) => {
        console.log("OBTENIRPACKAGES", res);
       this.articles = res.data.data;
        console.log("LIST", this.articles);
        this.isLoading = false
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

}
</script>
<style scoped>
.my_footer{
position:absolute;
width:100%;
bottom:-10em;
margin-left: 0 !important;
}
.table{
border:thin solid rgba(139, 139, 139, 0.63) !important;
}
th,td{
 border:thin solid rgba(141, 140, 140, 0.692) !important;
}
input,select{ 
  border: 1px solid black !important;
}
.form-group{ 
  text-align: left !important;
}
</style>