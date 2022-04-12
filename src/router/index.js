import { createRouter, createWebHashHistory } from "vue-router";
// import authentification from '../views/authentification.vue'
// import dashboard from '../views/dashboard.vue'
import Home from "../views/Home.vue";
import Dashboard from "../views/dashboard.vue";
import Package from "../views/packages/package.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  // {
  //   path: '/dasboard',
  //   name: "Dashboard",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/dashboard.vue')
  // },

  //====== PACKAGES ==========//
  {
    path: "/package",
    name: "Package",
    component: Package,
  },
  // },{
  //   path: '/typePackage',
  //   name: 'Typepackage',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/packages/Typepackage.vue')
  // },
  {
    path: "/seepackage",
    name: "Seepackage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/packages/Seepackage.vue"
      ),
  },
  {
    path: "/voirpackages",
    name: "voirpackages",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/packages/voirPackages.vue"
      ),
  },
  {
    path: "/types-packages-utilise",
    name: "voirLesTypesDePackagesUsed",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/packages/seePackagesUsed.vue"
      ),
  },
  {
    path: "/modify_package/:id",
    name: "ModiyPackage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/packages/Modifypackage.vue"
      ),
  },
  {
    path: "/modifier-package/:id",
    name: "ModifierPackage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/packages/ModifierPackage.vue"
      ),
  },


  {
    path: "/users",
    name: "User",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/users.vue"),
  },
  {
    path: "/listusers",
    name: "listUsers",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/listusers.vue"),
  },
  {
    path: "/users-operations/:id",
    name: "userOperation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/usersOperation.vue"),
  },
  {
    path: "/assignerRole/:id",
    name: "AssignerRole",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/user/Assignerrole.vue"),
  },

  //====== FOURNISSEURS ==========//
  {
    path: "/fournisseurs",
    name: "Fournisseurs",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/fournisseurs/fournisseurs.vue"
      ),
  },
  {
    path: "/fournisseurs/:id",
    name: "seePackageFournisseur",
    component: () =>
      import(
        "../views/fournisseurs/package-fournisseurs.vue"
      ),
  },
  {
    path: "/gain-fournisseurs/:id",
    name: "seeGainFournisseur",
    component: () =>
      import(
        "../views/fournisseurs/GainFournisseurs.vue"
      ),
  },

  //====== SOUSCRIPTION ==========//
  {
    path: "/souscription",
    name: "list_souscrit",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/souscription/listSouscription.vue"
      ),
  },
  {
    path: "/souscription/:id",
    name: "modifier-souscription",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/souscription/modifySouscription.vue"
      ),
  },




//====== Ventes =====//


  {
    path: "/list-rapport-ventes",
    name: "listVente",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/ventes/listVentes.vue"
      ),
  },
  {
    path: "/saveRapportventes",
    name: "saveRapportVentes",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/ventes/saveRapportVentes.vue"
      ),
  },
  {
    path: "/details-Ventes/:id",
    name: "detailsVentes",
    props:true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/ventes/detailsVentes.vue"
      ),
  },


];

const router = createRouter({
  history: createWebHashHistory(),
  mode:"history",
  routes,
});

export default router;
