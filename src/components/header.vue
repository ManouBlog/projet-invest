<template>
  <div>
    <header class="topbar">
      <nav class="navbar top-navbar navbar-expand-md navbar-dark">
        <div class="navbar-collapse position-relative">
          <ul class="navbar-nav me-auto align-items-center">
            <!-- This is  -->
            <!-- <li class="nav-item"> <a class="nav-link nav-toggler d-block d-md-none waves-effect waves-dark" href="javascript:void(0)"><i class="ti-menu"></i></a> </li>
                        <li class="nav-item"> <a class="nav-link sidebartoggler d-none d-lg-block d-md-block waves-effect waves-dark" href="javascript:void(0)"><i class="icon-menu" id="icon_menu"></i></a> </li> -->

            <li class="nav-item">
              <form class="app-search d-none d-md-block d-lg-block">
                <input
                  type="text"
                  class="form-control rechercher"
                  placeholder="Recherche"
                />
              </form>
            </li>
            <li class="nav-item">
              <div id="google-translate"></div>
            </li>
          </ul>
          <!-- ============================================================== -->
          <!-- User profile and search -->
          <!-- ============================================================== -->
          <!-- <ul class="navbar-nav my-lg-0">
            <li class="nav-item right-side-toggle"> <a class="nav-link  waves-effect waves-light" href="javascript:void(0)"><i class="ti-settings"></i></a></li>
                    </ul> -->
        </div>
      </nav>
    </header>
  </div>
</template>
<script>
export default {
  name: "Header",
  methods: {},
};
</script>
<style scoped>
.navbar-header {
  background: rgb(0, 0, 0) !important;
}
.navbar-collapse {
  background: rgb(253, 253, 255) !important;
}
.navbar-collapse {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.541);
}
input {
  background: #000 !important;
  color: white !important;
}
::placeholder {
  color: rgb(255, 255, 255);
}
.icon-menu {
  color: rgb(54, 54, 52) !important;
  font-weight: bold !important;
}
.navbar-nav {
  position: absolute;
  right: 1em;
}
.skin-blue .topbar {
  background: rgb(0, 0, 0) !important;
}
.topbar .top-navbar {
  overflow: hidden !important;
}
.rechercher {
  caret-color: rgb(200, 140, 2);

}
select{
background-color: black !important;
}
</style>
