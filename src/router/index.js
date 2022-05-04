import { createRouter, createWebHistory } from "vue-router";
// import authentification from '../views/authentification.vue'
// import dashboard from '../views/dashboard.vue'
import Home from "../views/Home.vue";
import Dashboard from "../views/dashboard.vue";
import Package from "../views/packages/package.vue";
// import store from  '@/store'
const routes = [
  {
    path: "/:patchMatch(.*)*",
    name: "NotFound",
    component: () =>
      import(
         "../views/notfound.vue"
      ),
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth:false}
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true }
  },
 
  //====== PACKAGES ==========//
  {
    path: "/package",
    name: "Package",
    component: Package,
    meta: {
      requiresAuth: true,
    }
  },
  
  {
    path: "/seepackage",
    name: "Seepackage",
    
    component: () =>
      import(
         "../views/packages/Seepackage.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/operations/:id",
    name: "operations",
    
    component: () =>
      import(
         "../views/fournisseurs/operations.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/solde",
    name: "solde",
    
    component: () =>
      import(
         "../views/fournisseurs/solde.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/voirpackages",
    name: "voirpackages",
    
    component: () =>
      import(
         "../views/packages/voirPackages.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/voirpackagesnotpublish",
    name: "Voirpackagesnotpublish",
    
    component: () =>
      import(
         "../views/packages/packagesnotpublish.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/voirpackagespublish",
    name: "Voirpackagespublish",
    
    component: () =>
      import(
         "../views/packages/packagespublish.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/types-packages-utilise",
    name: "voirLesTypesDePackagesUsed",
    component: () =>
      import(
   "../views/packages/seePackagesUsed.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/modify_package/:id",
    name: "ModiyPackage",
    component: () =>
      import(
        "../views/packages/Modifypackage.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/modifier-package/:id",
    name: "ModifierPackage",
    component: () =>
      import(
        "../views/packages/ModifierPackage.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },{
    path: "/packages-souscription",
    name: "PackageSouscris",
    component: () =>
      import(
        "../views/packages/MesPackageSouscris.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },{
    path: "/articles-rejetes",
    name: "ArticlesRejete",
    component: () =>
      import(
        "../views/packages/ArticlesRejete.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },


  {
    path: "/users",
    name: "User",
    component: () =>
      import( "../views/user/users.vue"),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/listusers",
    name: "listUsers",
    
    component: () =>
      import( "../views/user/listusers.vue"),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/users-operations/:id",
    name: "userOperation",
    
    component: () =>
      import( "../views/user/usersOperation.vue"),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/assignerRole/:id",
    name: "AssignerRole",
    component: () =>
      import( "../views/user/Assignerrole.vue"),
      meta: {
        requiresAuth: true
      },
  },
  // {
  //   path: "/role",
  //   name: "giveRole",
  //   component: () =>
  //     import( "../views/user/donner-role.vue"),
  //     meta: {
  //       requiresAuth: true
  //     },
  // },

  //====== FOURNISSEURS ==========//
  {
    path: "/fournisseurs",
    name: "Fournisseurs",
    
    component: () =>
      import(
        "../views/fournisseurs/fournisseurs.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/fournisseurs/:id",
    name: "seePackageFournisseur",
    component: () =>
      import(
        "../views/fournisseurs/package-fournisseurs.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/gain-fournisseurs/:id",
    name: "seeGainFournisseur",
    component: () =>
      import(
        "../views/fournisseurs/GainFournisseurs.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/voirMesPackage",
    name: "VoirMesPackage",
    component: () =>
      import(
        "../views/packages/voirpackagefournisseurs.vue"
      ),
      meta: {
        requiresAuth: true
      },
      
  },
  {
    path: "/detailsPackage/:id",
    name: "DetailsPackage",
    component: () =>
      import(
        "../views/packages/DetailsPackages.vue"
      ),
      meta: {
        requiresAuth: true
      },
      
  },
  {
    path: "/PackageRejecter/:id",
    name: "ModifierPackageRejete",
    component: () =>
      import(
        "../views/packages/ModifierPackageRejete.vue"
      ),
      meta: {
        requiresAuth: true
      },
      
  },

  //====== SOUSCRIPTION ==========//
  {
    path: "/souscription",
    name: "list_souscrit",
   
    component: () =>
      import(
         "../views/souscription/listSouscription.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/souscription/:id",
    name: "modifier-souscription",
    component: () =>
      import(
         "../views/souscription/modifySouscription.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },




//====== Ventes =====//


  {
    path: "/list-rapport-ventes",
    name: "listVente",
    

    component: () =>
      import(
         "../views/ventes/listVentes.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/saveRapportventes",
    name: "saveRapportVentes",
    
    component: () =>
      import(
         "../views/ventes/saveRapportVentes.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/details-Ventes/:id",
    name: "detailsVentes",
    
    props:true,

    component: () =>
      import(
         "../views/ventes/detailsVentes.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },

  //====== Investisseurs =====//
  {
    path: "/investisseurs",
    name: "investisseurs",
    
    props:true,

    component: () =>
      import(
         "../views/investisseurs/listInvestisseurs.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
  {
    path: "/gain-investisseur/:id",
    name: "gainInvestisseur",
    
    props:true,

    component: () =>
      import(
         "../views/investisseurs/gainInvestisseur.vue"
      ),
      meta: {
        requiresAuth: true
      },
  }, {
    path: "/gain-rapport/:id",
    name: "detailRapportGain",
    component: () =>
      import(
         "../views/investisseurs/detailRapportGain.vue"
      ),
      meta: {
        requiresAuth: true
      },
  },
 

];

const router = createRouter({
  history: createWebHistory(),
  mode:"history",
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    let session = localStorage.getItem('token')
    if(session === null){
      next({path:'/'})
    }
    if(session !== null){
      next()
    }
  }else{
     next()
  }
})


export default router;
