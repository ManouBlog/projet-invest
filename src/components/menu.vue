<template>
  <div class="modify-profile" v-show="profile">
    <div class="form-body" v-if="user !== null">
      <h1>
        Modifier son Profil <box-icon name="pencil" animation="tada"></box-icon>
      </h1>
      <div class="card-body">
        <div class="row pt-3">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Nom</label>
              <input
                type="text"
                id="firstName"
                class="form-control"
                placeholder="Nom"
                v-model="user.nom"
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Prénoms</label>
              <input
                type="text"
                class="form-control form-control-danger"
                placeholder="Prénoms"
                v-model="user.prenoms"
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Télephone</label>
              <input
                type="text"
                class="form-control"
                placeholder="0704565676"
                required
                v-model="user.phone"
              />
            </div>
          </div>
          <!--/span-->
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">email</label>
              <input
                type="email"
                class="form-control"
                placeholder="ex:adjobi23@gmail.com"
                required
                v-model="user.email"
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">lieu d'habitation</label>
              <input
                type="text"
                class="form-control"
                placeholder="ex:yopougon"
                v-model="user.lieu_habitation"
              />
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label class="form-label">Mot de passe</label>
              <input
                type="password"
                class="form-control"
                placeholder="******"
                v-model="userCompte.pass"
              />
            </div>
          </div>
          <!--/span-->
        </div>
        <!--/row-->
      </div>
      <div class="form-actions">
        <div class="card-body">
          <button
            type="submit"
            @click="modify_profil_user"
            class="btn btn-lg mx-2 btn-primary text-white"
          >
            Modifier
          </button>
          <button
            @click="modify_my_profil"
            type="button"
            class="btn btn-dark btn-lg"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>

  <div>
    <box-icon
      name="menu"
      class="menubarre"
      id="box-menu"
      @click="toogle_menu"
    ></box-icon>
    <!-- <i class="bi bi-list"></i> -->
    <aside class="left-sidebar" id="sidebar_menu">
   <router-link :to="{name:'Dashboard'}"><img src="/assets/images/invest.jpg" alt="homepage" class="w-75 img" /></router-link>
      
      <!-- Sidebar scroll-->
      <div class="scroll-sidebar">
        <!-- User Profile-->
        <div class="user-profile">
          <div class="user-pro-body">
            <div class="profile img-circle">
              <!-- <i class="bi bi-person-circle img-person-circle"></i> -->
              <span v-if="user !== null">{{ char }}</span>
            </div>

            <div class="dropdown">
              <a
                v-if="user !== null"
                href="javascript:void(0)"
                class="dropdown-toggle u-dropdown link hide-menu"
                data-bs-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
                >{{ this.user.nom }}
                <span class="caret"></span>
              </a>
              <div class="dropdown-menu animated flipInY">
                <!-- text-->
                <a
                  href="javascript:void(0)"
                  @click="profile = !this.profile"
                  class="dropdown-item profil"
                >
                  <box-icon type="solid" name="face"></box-icon> Profil
                </a>
                <router-link :to="{name:'operations', params:{id:user.id}}"
                  class="dropdown-item profil"
                  v-if="showcreatedPackage"
                >
                 <box-icon name='wallet' ></box-icon>Mes operations
                </router-link>
                <router-link to="/solde"
                  class="dropdown-item profil"
                  v-if="showcreatedPackage"
                >
                  <box-icon name='credit-card'></box-icon>Solde
                </router-link>
                      
                <a
                  href="pages-login.html"
                  class="dropdown-item profil"
                  @click.prevent="Deconnexion"
                >
                  <box-icon name="log-out" animation="tada"></box-icon>
                  Déconnexion</a
                >
               
              </div>
            </div>
          </div>
        </div>
        <!-- Sidebar navigation-->
        <nav class="sidebar-nav">
          <ul id="sidebarnav">
            <li class="my-4">
              <router-link class="waves-effect waves-dark" to="/dashboard">
                <i class="bi bi-person-rolodex"></i>
                <span class="hide-menu text-dark h4"> Accueil </span>
              </router-link>
            </li>
            <li class="my-4">
              <a href="javascript:void(0)" @click="showPackages" v-if="showPanel">
                <i class="bi bi-box-seam"></i>
                <span class="hide-menu h4">Packages</span>
                <i
                  class="bi bi-chevron-down position-absolute"
                  id="arrow-bas"
                ></i>
              </a>
              <ul v-show="sub_packages">
                <li v-if="showPanel">
                  <router-link class="px-0 a" to="/seepackage"
                    >Voir les packages</router-link
                  >
                </li>
                <li v-if="showPanel">
                  <router-link class="px-0 a" to="/types-packages-utilise"
                    >Les packages(quantités) </router-link
                  >
                </li>
                
              </ul>
            </li>
            <li class="my-3">
              <a
                class="waves-dark"
                href="javascript:void(0)"
                @click="show_packagess"
              >
                <i class="bi bi-box"></i>
                <span class="hide-menu h4">Articles</span>
                <i
                  class="bi bi-chevron-down position-absolute"
                  id="arrow_bas_three"
                ></i>
              </a>
              <ul v-show="sub_packagess">
                <li v-if="showcreatedPackage">
                  <router-link class="px-0 a" to="/package"
                    >
                    Créer un article</router-link
                  >
                </li>
                <li v-if="showcreatedPackage">
                  <router-link class="px-0 a" to="/voirMesPackage"
                    >Voir mes articles</router-link
                  >
                </li>
                <li v-if="showcreatedPackage">
                  <router-link class="px-0 a" to="/packages-souscription"
                    >Voir mes articles soucris</router-link
                  >
                </li>
                <li v-if="showPanel">
                  <router-link  class="px-0 a" to="/voirpackages"
                    >les articles</router-link
                  >
                </li>
                <li v-if="showPanel">
                  <router-link  class="px-0 a" to="/voirpackagespublish"
                    >les articles publiés</router-link
                  >
                </li>
                <li v-if="showPanel">
                  <router-link  class="px-0 a" to="/voirpackagesnotpublish"
                    >les articles en cours de traitement</router-link
                  >
                </li>
                <li v-if="showPanel">
                  <router-link  class="px-0 a" to="/articles-rejetes"
                    >les articles rejetés</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="my-3">
              <a
                class="waves-dark"
                href="javascript:void(0)"
                @click="show_fourni"
                v-if="showPanel"
              >
                <i class="bi bi-people"></i>
                <span class="hide-menu h4">Fournisseurs</span>
                <i
                  class="bi bi-chevron-down position-absolute"
                  id="arrow_bas_four"
                ></i>
              </a>
              <ul v-show="sub_fournisseur">
                <li v-if="showPanel">
                  <router-link class="px-0 a" to="/fournisseurs"
                    >liste des fournisseurs</router-link
                  >
                </li>
              </ul>
            </li>
             <li class="my-3">
              <a
                class="waves-dark"
                href="javascript:void(0)"
                @click="show_invest"
                v-if="showPanel"
              >
                <i class="bi bi-people"></i>
                <span class="hide-menu h4">Investisseurs</span>
                <i
                  class="bi bi-chevron-down position-absolute"
                  id="arrow_bas_invest"
                ></i>
              </a>
              <ul v-show="sub_invest">
                <li v-if="showPanel">
                  <router-link class="px-0 a" to="/investisseurs"
                    >liste des investisseurs</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="my-4">
              <a href="javascript:void(0)" @click="showUser" v-if="showPanel">
                <i class="bi bi-person"></i>
                <span class="hide-menu h4">Utilisateurs</span>
                <i
                  class="bi bi-chevron-down position-absolute"
                  id="arrow-bas_two"
                ></i>
              </a>
              <ul v-show="sub_user">
                <li v-if="showPanel">
                  <router-link class="px-0 a" to="/users"
                    >Créer un utilisateur</router-link
                  >
                </li>
                <!-- <li v-if="showPanel">
                  <router-link class="px-0 a" to="/role"
                    >Créer un role</router-link
                  >
                </li> -->
                <li v-if="showPanel">
                  <router-link class="px-0 a" to="/listusers"
                    >Listes des utilisateurs</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="my-3">
              <a
                class="waves-dark"
                href="javascript:void(0)"
                @click="show_scribe"
                v-if="showPanel"
              >
                <i class="bi bi-filter-square"></i>
                <span class="hide-menu h4">Souscriptions</span>
                <i
                  class="bi bi-chevron-down position-absolute"
                  id="arrow_bas_five"
                ></i>
              </a>
              <ul v-show="sub_scribe">
                <li v-if="showPanel">
                  <router-link class="px-0 a" to="/souscription"
                    >liste des souscriptions</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="my-3" v-if="showcreatedPackage">
              <a class="waves-dark" @click="show_vente">
                <i class="bi bi-filter-square"></i>
                <span class="hide-menu h4">Ventes</span>
                <i
                  class="bi bi-chevron-down position-absolute"
                  id="arrow_bas_six"
                ></i>
              </a>
              <ul v-show="sub_vente">
                <li>
                  <router-link class="px-0 a" to="/saveRapportventes"
                    >Enregistré les rapports de ventes</router-link
                  >
                </li>
                <li>
                  <router-link class="px-0 a" to="/list-rapport-ventes"
                    >Liste des rapports de ventes</router-link
                  >
                </li>
              </ul>
            </li>
            <li class="my-3" v-if="showPanel">
              <a class="waves-dark" @click="show_vente">
                <i class="bi bi-filter-square"></i>
                <span class="hide-menu h4">Ventes</span>
                <i
                  class="bi bi-chevron-down position-absolute"
                  id="arrow_bas_six"
                ></i>
              </a>
              <ul v-show="sub_vente">
                <!-- <li>
                  <router-link class="px-0 a" to="/saveRapportventes"
                    >Enregistré les rapports de ventes</router-link
                  >
                </li> -->
                <li>
                  <router-link class="px-0 a" to="/list-rapport-ventes"
                    >Liste des ventes</router-link
                  >
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  </div>
</template>
<script>
// import store from  '@/store'
import Swal from "sweetalert2";
import axios from "axios";
import { lien } from "/src/assets/api.js";
export default {
  name: "Menu",
  data() {
    return {
      sub_vente: false,
      sub_scribe: false,
      sub_fournisseur: false,
      sub_packages: false,
      sub_user: false,
      sub_invest:false,
      user:this.$store.state.user,
      userCompte: {
        nom: null,
        prenoms: null,
        email: null,
        phone: null,
        lieu_habitation: null,
        pass: null,
      },
      profile: false,
      sub_packagess: false,
      admissiblite:null,
      hideFournisseur:true,
      showPanel:true,
      showcreatedPackage:true,
      el:null,
    };
  },
  methods: {
    Deconnexion() {
      axios
        .get(lien + "/api/auth/logout", {
          headers: {
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((reponse) => {
          console.log(reponse);
          if (reponse) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            this.$router.push("/")
            this.$store.state.user = null
            this.$store.state.token = null
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
 
            Toast.fire({
              icon: "success",
              title: "Deconnecte",
            });
            
          }
        })
        
        
    },
    showPackages() {
      let arrow_bas_invest = document.getElementById("arrow_bas_invest")
      let arrowVente = document.getElementById("arrow_bas_six");
      let arrow_bas_five = document.getElementById("arrow_bas_five");
      let arrow_Bas_four = document.getElementById("arrow_bas_four");
      let arrow_Bas = document.getElementById("arrow_bas_three");
      let arrow = document.getElementById("arrow-bas_two");
      let fleche = document.getElementById("arrow-bas");
      this.sub_packages = !this.sub_packages;
      if (this.sub_user == true) {
        this.sub_user = false;
        arrow.style.transform = "rotate(0deg)";
      }
      if (this.sub_packages == true) {
        fleche.style.transform = "rotate(180deg)";
      }
      if (this.sub_packages == false) {
        fleche.style.transform = "rotate(0deg)";
      }
      if (
        this.sub_packagess == true ||
        this.sub_fournisseur == true ||
        this.sub_scribe == true ||
        this.sub_vente == true ||
        this.sub_invest == true
      ) {
        this.sub_packagess = false;
         this.sub_vente = false;
        this.sub_scribe = false;
        this.sub_fournisseur = false;
        this.sub_invest = false
        arrow_Bas.style.transform = "rotate(0deg)";
        arrow_Bas_four.style.transform = "rotate(0deg)";
        arrow_bas_five.style.transform = "rotate(0deg)";
        arrowVente.style.transform = "rotate(0deg)";
        arrow_bas_invest.style.transform = "rotate(0deg)";
      }
    },
    showUser() {
      let arrow_bas_invest = document.getElementById("arrow_bas_invest")
       let arrowVente = document.getElementById("arrow_bas_six");
      let arrow_bas_five = document.getElementById("arrow_bas_five");
      let arrow_Bas_four = document.getElementById("arrow_bas_four");
      let arrow_Bas = document.getElementById("arrow_bas_three");
      let arrow = document.getElementById("arrow-bas_two");
      let fleche = document.getElementById("arrow-bas");
      this.sub_user = !this.sub_user;
      if (this.sub_packages == true) {
        this.sub_packages = false;
        fleche.style.transform = "rotate(0deg)";
      }
      if (this.sub_user == true) {
        arrow.style.transform = "rotate(180deg)";
      }
      if (this.sub_user == false) {
        arrow.style.transform = "rotate(0deg)";
      }
      if (
        this.sub_packages == true ||
        this.sub_fournisseur == true ||
        this.sub_packagess == true ||
        this.sub_scribe == true ||
        this.sub_vente == true ||
        this.sub_invest == true
      ) {
        this.sub_packagess = false;
        this.sub_vente == false;
        this.sub_packages = false;
        this.sub_fournisseur = false;
        this.sub_scribe = false;
        this.sub_invest = false
        arrow.style.transform = "rotate(180deg)";
        arrow_Bas_four.style.transform = "rotate(0deg)";
        arrow_Bas.style.transform = "rotate(0deg)";
        arrow_bas_five.style.transform = "rotate(0deg)";
        arrowVente.style.transform = "rotate(0deg)";
        arrow_bas_invest.style.transform = "rotate(0deg)";
      }
    },
    show_packagess() {
      let arrow_bas_invest = document.getElementById("arrow_bas_invest")
      let arrowVente = document.getElementById("arrow_bas_six");
      let arrow_Bas_four = document.getElementById("arrow_bas_four");
      let arrow = document.getElementById("arrow-bas_two");
      let fleche = document.getElementById("arrow-bas");
      let arrow_bas_five = document.getElementById("arrow_bas_five");
      let arrow_Bas = document.getElementById("arrow_bas_three");
      this.sub_packagess = !this.sub_packagess;
      if (this.sub_packagess == true) {
        arrow_Bas.style.transform = "rotate(180deg)";
      }
      if (
        this.sub_user == true ||
        this.sub_packages == true ||
        this.sub_fournisseur == true ||
         this.sub_vente == true  ||
         this.sub_invest == true
      ) {
        this.sub_user = false;
         this.sub_vente == false
        this.sub_packages = false;
        this.sub_fournisseur = false;
        this.sub_invest = false
        arrow.style.transform = "rotate(0deg)";
        fleche.style.transform = "rotate(0deg)";
        arrow_Bas_four.style.transform = "rotate(0deg)";
        arrow_bas_five.style.transform = "rotate(0deg)";
        arrowVente.style.transform = "rotate(0deg)";
        arrow_bas_invest.style.transform = "rotate(0deg)";
      }
      if (this.sub_packagess == false) {
        arrow_Bas.style.transform = "rotate(0deg)";
      }
    },
    show_fourni() {
      let arrow_bas_invest = document.getElementById("arrow_bas_invest")
      let arrowVente = document.getElementById("arrow_bas_six");
      let arrow_bas_five = document.getElementById("arrow_bas_five");
      let arrow = document.getElementById("arrow-bas_two");
      let fleche = document.getElementById("arrow-bas");
      let arrow_Bas = document.getElementById("arrow_bas_three");
      let arrow_Bas_four = document.getElementById("arrow_bas_four");
      this.sub_fournisseur = !this.sub_fournisseur;
      if (this.sub_fournisseur == true) {
        arrow_Bas_four.style.transform = "rotate(180deg)";
      }
      if (this.sub_fournisseur == false) {
        arrow_Bas_four.style.transform = "rotate(0deg)";
      }
      if (
        this.sub_user == true ||
        this.sub_packages == true ||
        this.sub_packagess == true ||
        this.sub_scribe == true  ||
        this.sub_vente == true ||
        this.sub_invest == true
      ) {
        this.sub_user = false;
        this.sub_vente= false;
        this.sub_packages = false;
        this.sub_packagess = false;
        this.sub_scribe = false;
         this.sub_invest = false
        arrow.style.transform = "rotate(0deg)";
        fleche.style.transform = "rotate(0deg)";
        arrow_Bas_four.style.transform = "rotate(180deg)";
        arrow_Bas.style.transform = "rotate(0deg)";
        arrow_bas_five.style.transform = "rotate(0deg)";
        arrowVente.style.transform = "rotate(0deg)";
        arrow_bas_invest.style.transform = "rotate(0deg)";
      }
    },
    show_scribe() {
      let arrow_bas_invest = document.getElementById("arrow_bas_invest")
      let arrow_Bas = document.getElementById("arrow_bas_three");
      let arrow_Bas_four = document.getElementById("arrow_bas_four");
      let fleche = document.getElementById("arrow-bas");
      let arrow = document.getElementById("arrow-bas_two");
      let arrow_bas_five = document.getElementById("arrow_bas_five");
      let arrowVente = document.getElementById("arrow_bas_six");
      
      this.sub_scribe = !this.sub_scribe;
      if (this.sub_scribe == true) {
        arrow_bas_five.style.transform = "rotate(180deg)";
      }
      if (this.sub_scribe == false) {
        arrow_bas_five.style.transform = "rotate(0deg)";
      }
      if (
        this.sub_user == true ||
        this.sub_packages == true ||
        this.sub_packagess == true ||
        this.sub_fournisseur == true ||
        this.sub_vente == true  ||
        this.sub_invest == true
      ) {
        this.sub_user = false;
        this.sub_vente = false;
        this.sub_fournisseur = false;
        this.sub_packages = false;
        this.sub_packagess = false;
        this.sub_scribe = true;
        this.sub_invest = false
        arrow.style.transform = "rotate(0deg)";
        fleche.style.transform = "rotate(0deg)";
        arrow_Bas_four.style.transform = "rotate(0deg)";
        arrow_bas_five.style.transform = "rotate(180deg)";
        arrow_Bas.style.transform = "rotate(0deg)";
        arrowVente.style.transform = "rotate(0deg)";
        arrow_bas_invest.style.transform = "rotate(0deg)";
      }
    },
    show_vente() {
      let arrow_bas_invest = document.getElementById("arrow_bas_invest")
      let arrowVente = document.getElementById("arrow_bas_six");
      let arrow_Bas = document.getElementById("arrow_bas_three");
      let arrow_Bas_four = document.getElementById("arrow_bas_four");
      let fleche = document.getElementById("arrow-bas");
      let arrow = document.getElementById("arrow-bas_two");
      let arrow_bas_five = document.getElementById("arrow_bas_five");
      this.sub_vente = !this.sub_vente;
      if (this.sub_vente == true) {
        arrowVente.style.transform = "rotate(180deg)";
      }
      if (this.sub_vente == false) {
        arrowVente.style.transform = "rotate(0deg)";
      }
      if (
        this.sub_user == true ||
        this.sub_scribe == true ||
        this.sub_packages == true ||
        this.sub_packagess == true ||
        this.sub_fournisseur == true ||
        this.sub_invest == true
      ) {
        this.sub_scribe = false;
        this.sub_packages = false;
        this.sub_packagess = false;
        this.sub_fournisseur = false;
        this.sub_user = false;
        this.sub_invest = false;
        arrow_bas_five.style.transform = "rotate(0deg)";
        arrow.style.transform = "rotate(0deg)";
        fleche.style.transform = "rotate(0deg)";
        arrow_Bas_four.style.transform = "rotate(0deg)";
        arrow_bas_five.style.transform = "rotate(0deg)";
        arrow_Bas.style.transform = "rotate(0deg)";
        arrow_bas_invest.style.transform = "rotate(0deg)";
      }
    },
    show_invest() {

     let arrow_Bas = document.getElementById("arrow_bas_three");
      let arrow_Bas_four = document.getElementById("arrow_bas_four");
      let fleche = document.getElementById("arrow-bas");
      let arrow = document.getElementById("arrow-bas_two");
      let arrow_bas_five = document.getElementById("arrow_bas_five");
      let arrowVente = document.getElementById("arrow_bas_six");

      let arrow_bas_invest = document.getElementById("arrow_bas_invest")
      this.sub_invest = !this.sub_invest;
      if (this.sub_invest == true) {
       arrow_bas_invest.style.transform = "rotate(180deg)";
      }
      if (this.sub_invest == false) {
       arrow_bas_invest.style.transform = "rotate(0deg)";
      }
      if (
        this.sub_user == true ||
        this.sub_packages == true ||
        this.sub_packagess == true ||
        this.sub_fournisseur == true ||
        this.sub_vente == true  ||
        this.sub_scribe == true
      ) {
        this.sub_user = false;
        this.sub_vente = false;
        this.sub_fournisseur = false;
        this.sub_packages = false;
        this.sub_packagess = false;
        this.sub_scribe = false;
        arrow.style.transform = "rotate(0deg)";
        fleche.style.transform = "rotate(0deg)";
        arrow_Bas_four.style.transform = "rotate(0deg)";
        arrow_bas_five.style.transform = "rotate(0deg)";
        arrow_Bas.style.transform = "rotate(0deg)";
        arrowVente.style.transform = "rotate(0deg)";
      }
    },
    modify_my_profil() {
      this.profile = !this.profile;
    },
    toogle_menu() {
      let barre = document.getElementById("box-menu");
      let menubarre = document.getElementById("sidebar_menu");
      menubarre.classList.toggle("active");
      barre.classList.toggle("push");
    },
    modify_profil_user() {
      (this.userCompte.nom = this.user.nom),
        (this.userCompte.prenoms = this.user.prenoms),
        (this.userCompte.phone = this.user.phone),
        (this.userCompte.email = this.user.email),
        (this.userCompte.lieu_habitation = this.user.lieu_habitation),
        (this.userCompte.password = this.userCompte.pass);
      axios
        .put(lien + "/api/profile/" + this.user.id, this.userCompte, {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        })
        .then((reponse) => {
          console.log(reponse);
          if (reponse.data.status == "true") {
            Swal.fire({
              text: "Modification effectuée",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
            localStorage.setItem("user", JSON.stringify(reponse.data.data));
            this.profile = !this.profile;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRole(){
      if(this.admissiblite == "fournisseur"){
         this.showPanel = false
         this.showcreatedPackage = true
      }
      if(this.admissiblite == "admin"){
         this.showPanel = true
         this.showcreatedPackage = false
      }
    },
    userAD(){
      if(this.$store.state.token !== null){
        this.user = this.$store.state.user
        this.admissiblite = this.user.tab[0]
      }
      if(this.$store.state.token === null){
        this.user = null
      }
    },
  

  },
  computed: {
    char() {
      let nom = this.user.nom;
      let prenom = this.user.prenoms;
      let char = nom.charAt(0);
      let charPrenom = prenom.charAt(0);
      let Mychart = char + charPrenom;
      return Mychart.toUpperCase();
    },                               
  },
  created(){
    console.log("INFO USER",this.user);
    console.log("ROUTE",this.$route.name);
    this.userAD()
    this.getRole()
     console.log("ROLE",this.admissiblite);
  },
};
</script>
<style scoped>
aside * {
  color: white !important;
}
.dropdown-item {
  color: black !important;
}
.bi-box,
.bi-person,
.bi-filter-square,
.bi-person-rolodex,
.bi-box-seam,
.bi-people {
  color: rgb(236, 182, 4) !important;
}
.profile {
  width: 60px;
  height: 60px;
  background: rgba(152, 151, 151, 0.601);
  margin: 0 auto;
  line-height: 60px;
  border: 3px solid rgb(236, 182, 4);
}

.img-person-circle {
  font-size: 2.5em;
}
.bi-chevron-down {
  right: 1em;
}
.modify-profile {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.512);
  z-index: 99;
  display: flex;
  place-items: center;
  justify-content: center;
  font-weight: bold;
}
.my_form {
  position: absolute;
  display: flex;
  flex-direction: column;
  place-items: center;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  margin-left: 50%;
  transform: translate(-50%, -50%);
}
.left-sidebar {
  background: rgb(3, 3, 3) !important;
  overflow-y:auto;
  z-index: 90 !important;
}
.left-sidebar::-webkit-scrollbar-track {
  border: 1px solid rgb(191, 191, 191);
  padding: 2px 0;
  background-color: #d1d0d0;
}

.left-sidebar::-webkit-scrollbar {
  width: 8px;
}

.left-sidebar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  height: 56px !important;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgb(236, 182, 4);
  border: 1px solid rgb(175, 175, 175);
}
li {
  text-align: left;
}
li a {
  padding-left: 1em !important;
}
ul {
  padding-left: 0 !important;
}
.a:hover {
  background: rgb(206, 175, 2);
}
.router-link-exact-active {
  border-left: 3px solid #03a9f3;
}
.h4 {
  padding: 0 !important;
}
.form-body {
  background: rgb(255, 255, 255);
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.277);
  padding: 2em 0;
  width: 70%;
}
.profil {
  display: flex;
  align-items: center;
}
.btn-primary {
  background: rgb(231, 202, 15) !important;
  border: 3px solid black !important;
  color: black !important;
}
button:active {
  transform: translateY(-3px) scale(0.9);
}
.menubarre {
  font-size: 2.5em !important;
  position: fixed;
  top: 0.1em;
  left: 0;
  z-index: 99;
  color: rgb(0, 0, 0);
  font-weight: bold;
  margin-left: 225px;
  cursor: pointer;
}
#sidebar_menu.active {
  width: 70px;
}
.img {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 50%;
  transform: translateX(-50%);
}

#box-menu {
  display: none;
}
.sidebar-nav{
padding:0 !important;
}

@media screen and (max-width: 1169px) {
  #box-menu {
    display: block;
  }

  #box-menu.push {
    margin-left: 200px !important;
    font-size: 2.5em !important;
    position: fixed;
    top: 0.2em;
    left: 0;
    z-index: 99;
    font-weight: bold;
    cursor: pointer;
  }
  #sidebar_menu.active {
    width: 200px;
  }
  .left-sidebar {
    overflow: hidden;
  }
  .menubarre {
    top: 0.2em;
    margin-left: 76px !important;
  }
}

@media screen and (max-width: 766px) {
  .menubarre {
    top: 0.3em;
    margin-left: 280px !important;
  }
}
</style>
