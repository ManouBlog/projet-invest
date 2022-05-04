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
              <li class="fw-bold h3"><span>Liste des utilisateurs</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="row container-fluid">
      <div class="col-md-12">
        <div>
          <table id="MyTableData" class="table">
            <thead>
              <tr>
                <th class="bg-light">#</th>
                <th class="bg-light">Nom</th>
                <th class="bg-light">Prénoms</th>
                <th class="bg-light">Lieu d'habitation</th>
                <th class="bg-light">email</th>
                <th class="bg-light">Role</th>
                <th class="bg-light text-right">Détails</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in list_user" :key="index">
                <td>
                  {{index+1}}
                </td>
                <td>
                  {{ item.nom }}
                </td>
                <td>
                  {{ item.prenoms}}
                </td>
                <td>
                  {{ item.lieu_habitation }}
                </td>
                <td>{{ item.email }}</td>
                <td v-if="item.role.length > 0 && item.role !== null">
                <span class="badge bg-danger1 bg-gradient d-block w-75 mb-1 mx-auto" v-for="item in item.role" :key="item.id"  >
                <b v-if="item.role !== null">
                 {{item.libelle}}</b>
                </span>
                </td>
                <td class="text-right">
                  <div class="dropdown dropdown-action d-flex justify-content-center flex-wrap">
                      <router-link data-title="Voir les operations utilisateur" :to="{name:'userOperation',params:{id:item.id}}" class="btn boutons  m-1 bg-pen text-light">
                      <i class="bi bi-eye"></i>
                    </router-link>
                    <router-link data-title="Modifier l' utilisateur" :to="{name:'AssignerRole',params:{id:item.id}}" class="btn boutons  m-1 bg-pen text-light">
                       <i class="bi bi-pencil-fill"></i>
                    </router-link>
                    <button @click="show(item.id)" class="btn btn-lg m-1 boutons  bg-danger text-light">
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
     <span class="fw-bold">vous-voulez vraiment supprimer?</span>
     <button class="btn btn-lg bg-pen text-light my-3 border-0 rounded p-2 fw-bold" @click="delete_user">Supprimer</button>
     <button class="btn btn-lg bg-dark text-light border-0 rounded p-2 fw-bold" @click="fermer">Annuler</button>
     </div>
    </div>
  </div>
  <Footer class="my_footer"></Footer>
</template>
<script>
import Header from '@/components/header'
import Menu from '@/components/menu'
import Footer from '@/components/footer'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Swal from "sweetalert2";
import {lien} from '/src/assets/api.js'
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import axios from "axios";
export default {
  name: "Listusers",
  components:{
    Header,Menu,Footer,Loading
  },

  //++++ DATA ++++//
  data() {
    return {
      list_user: null,
      isLoading:false,
      showMsg:false,
      id_delete:null,
    };
  },
  //++++ CREATED ++++//
  created() {
    this.isLoading = true;
    axios
      .get( lien+"/api/users")

      .then((res) => {
        console.log("OBTENIRPACKAGES", res);
        this.list_user = res.data.data;
        console.log("LIST", this.list_user);
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

  //++++ METHODS ++++//

  methods:{
    show(id){
           this.showMsg = !this.showMsg
           this.id_delete = id
           console.log("ID A DELETE",this.id_delete);
       },
        fermer(){
         this.showMsg = !this.showMsg
         this.id_delete = null
          console.log("ID A DELETE",this.id_delete);
       },
    delete_user(){
      axios.delete(lien+`/api/users/${this.id_delete}`)
      .then(reponse =>{
        console.log(reponse);
        if(reponse.data.status == 'true'){
            Swal.fire({
              text:"Utilisateur Supprimé",
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.showMsg = false
           setTimeout(()=>{
              window.location.reload(true)
           },1500)
        }
         if(reponse.data.status == 'false'){
            Swal.fire({
              text:"Echec",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            this.showMsg = false
        }
           if(reponse.data.status !== 'false' && reponse.data.status !== 'true'  ){
            Swal.fire({
              text:"impossible de supprimer l'utilisateur car il a deja effectué une operation",
              icon: 'info',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            this.showMsg = false
        }
      })
      .catch(error=>{
        if(error){
            Swal.fire({
              text:"Echec",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
        }
      })
    }
  }

};
</script>

<style scoped>
a:hover::after{
content:attr(data-title);
position:absolute;
top:30px;
left:0;
background: #000;
font-size:.6em;
padding:.5em 1em !important;
}

.delete_personne{
position:fixed;
width:100%;
height: 100%;
background: rgba(0, 0, 0, 0.099);
top:0;
left:0;
display: flex;
place-items: center;
justify-content: center;
}
.delete{
padding:3em;
display: flex;
flex-direction:column;
background: white;
border-radius:10px ;
box-shadow:1px 1px 10px rgba(0, 0, 0, 0.285);
}

button.bg-primary{
background: rgb(0, 162, 255) !important;
}
button{
 padding-top:0 !important;
  padding-bottom:0 !important;
}
.badge{
font-weight: bold;
}
.my_footer{
position:relative;
width:100%;
bottom:-24.3em;
margin-left: 0 !important;
}
.table{
border:thin solid rgba(139, 139, 139, 0.63) !important;
}
th,td{
 border:thin solid rgba(141, 140, 140, 0.692) !important;
}
.bg-pen{
background: rgb(231, 202, 15) !important;
border:1px solid black !important;

}
.bg-danger{
background: crimson !important;
border:1px solid black !important;
}
.bg-danger1{
background: rgba(220, 20, 60, 0.745) !important;
}
.boutons{
width:25px !important;
height:25px !important;
display: flex;
place-items: center;
justify-content: center;
}

</style>
