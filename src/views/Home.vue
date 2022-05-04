<template>
<div class="skin-default card-no-border">
    <section id="wrapper">
      <div
        class="login-register"
        style="
          background-image: url(/assets/images/invest.jpg);
        "
      >
        <div class="login-box card log">
          <div class="card-body mybody">
            <form class="form-horizontal form-material" id="loginform" @submit.prevent="Connecter">
              <h3 class="text-center m-b-20">Connexion</h3>
              <div class="form-group">
                <div class="col-xs-12">
                  <input
                    class="form-control text-dark"
                    type="text"
                    placeholder="Email"
                    required
                    v-model="email"
                  />
                </div>
              </div>
              <div class="form-group">
                <div class="col-xs-12">
                  <input
                    class="form-control text-dark"
                    type="password"
                    placeholder="password"
                    required
                    v-model="password"
                  />
                </div>
              </div>
              <div class="form-group text-center p-b-20">
                <div class="col-xs-12">
                  <button
                    class="btn btn-warning bouton_connecte btn-lg w-100 btn-rounded text-uppercase text-dark"
                    type="submit"
                  >
                    se connecter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from 'axios'
import {lien} from '/src/assets/api.js'
export default {
  name: "Home",
   data() {
   return {
       email:null,
       password:null,
   }
 },
 methods: {
   Connecter(){
     axios.post(lien+"/api/auth/loginByAdmin",{
       email:this.email,
       password:this.password,
     })
     .then(reponse =>{
       console.log("USER",reponse.data.user)
       console.log("TOKEN",reponse.data.access_token);
       
       if(reponse.data.access_token){
        localStorage.setItem('token',JSON.stringify(reponse.data.access_token))
        localStorage.setItem('user',JSON.stringify(reponse.data.user)) 
       }
        
        //  this.$router.push('/dashboard')
         this.$store.state.user = reponse.data.user
         this.$store.state.token = reponse.data.access_token
        window.location.href='/dashboard'
    
     })
     .catch(error=>{
       console.log(error);
       Swal.fire({
              text:"email ou mot de passe n'existe pas",
              icon: 'error',
              showConfirmButton: false,
              timer: 1500,
              timerProgressBar: true,
            });
       
     })
      
   }
 }
 
};
</script>
<style>

@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@500;900&display=swap");
* {
  font-family: "Roboto", sans-serif !important;
  
}
.bouton_connecte:active{
box-shadow:1px 1px 1px transparent !important;
transform:scale(0.9);
}
.mybody{
background: rgb(255, 255, 255) !important;
color:rgb(0, 0, 0) !important;
border: 5px solid rgb(202, 176, 10) !important;
border-radius: 10px !important;
}
::placeholder{
color:rgb(0, 0, 0);
}
.log{
border-radius: 10px !important;
}



</style>
