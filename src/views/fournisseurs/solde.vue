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
              <li class="fw-bold h3"><span>Mon solde</span></li>
            </ol>
          </div>
        </div>
      </div>
    </div>


<div class="card w-50 mx-auto">
  <div class="card-header d-flex justify-content-between align-items-center p-3">
  <h4>Montant</h4><h4>{{moneyFormat.format(user.solde)}} Fcfa</h4>
  </div>
  <div class="card-body">
    <input type="text" class="w-50" pattern="^([0-9]*)$"> <br>
    <button class="btn btn-primary mt-2">Retrait</button>
  </div>
</div>
  </div>
  <Footer class="my_footer"></Footer>
</template>
<script>
import Header from "@/components/header";
import Menu from "@/components/menu";
import Footer from "@/components/footer";
export default {
  name: "Solde",
  components: {
    Footer,
    Header,
    Menu,
  },
  data() {
    return {
     user:this.$store.state.user,
      moneyFormat: new Intl.NumberFormat("de-DE")
    };
  },
};
</script>
<style scoped>
*{
font-weight: bold;
}
.icon{
position:absolute;
left:1em;
top:0;
}
.icon h1{
cursor: pointer;
}
.publie{
min-height:38px;
border:none;
border-radius:.25rem;
}
.btn-primary{
background: rgb(231, 202, 15) !important;
border:3px solid black !important;
font-weight: bold !important;
}

.my_footer{
position:absolute;
width:100%;
bottom:0;
margin-left: 0 !important;
}
input,select{ 
  border: 1px solid black !important;
}
.form-group{ 
  text-align: left !important;
}


</style>

