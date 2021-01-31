<template>
    <aside class="left-sidebar">
      <div class="scroll-sidebar">
        <div class="user-profile" style="background: url(imagenes/user-info.jpg) no-repeat;">
            <div class="profile-img"> <img src="/imagenes/profile.png" alt="user" /> </div>
            <div class="profile-text"> <a href="#" class="dropdown-toggle u-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">{{nombre_usuario}}</a>
                <div class="dropdown-menu animated flipInY">
                    <div class="dropdown-divider"></div> <a href="/logout" class="dropdown-item" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="fa fa-power-off"></i> Cerrar sesión</a>
                </div>
            </div>
        </div>
        <nav class="sidebar-nav">
          <ul id="sidebarnav">
            <li v-if="this.rol_usuario.id_rol==3 || this.rol_usuario.id_rol==2"><router-link to="/mascotas">
              <i class="mdi mdi-paw"></i><span class="hide-menu">MASCOTAS </span>
             <!-- <ul aria-expanded="false" class="collapse">
                  <li v-if="rol_usuario.nombre"><router-link to="/">FICHA USUARIO</router-link></li>
              </ul>-->
            </router-link></li>
            <li v-if="this.rol_usuario.id_rol==3"><router-link to="/adopciones">
              <i class="mdi mdi-file"></i><span class="hide-menu">ADOPCIONES</span>
            </router-link></li>
            <li v-if="this.rol_usuario.id_rol==2"><router-link to="/gestionadopciones">
              <i class="mdi mdi-file-outline"></i><span class="hide-menu">GESTIÓN ADOPCIONES </span>
            </router-link></li>
          </ul>
        </nav>
      </div>
    </aside>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2';
import $ from "jquery";
var moment = require('moment');
moment.locale("es");
export default {
  data() {
    return {
      nombre_usuario:"",
      rol_usuario:"",
      correo_usuario:"",
    };
  },
  methods: {
    recuperar() {
      axios.get("/sesion/recuperar").then(res => {
        if(res.data){
          this.nombre_usuario = res.data.nombre;
          this.rol_usuario= res.data.roles[0];
          this.correo_usuario= res.data.email;
        }else{
          $(".cerrarsesion").click();
        }
      }).catch(err => {
          $(".cerrarsesion").click();
      });
    },
  },
  mounted() {
    this.recuperar();
  }
};
</script>
<style>
  .router-link-exact-active{
    background: #1e88e5;
    color:#fff!important;
  }
  .router-link-exact-active i{
    color:#fff!important;
  }
</style>