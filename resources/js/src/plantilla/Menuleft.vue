<template>
    <aside class="left-sidebar">
      <div class="scroll-sidebar">
        <div class="user-profile" style="background: url(imagenes/user-info.jpg) no-repeat;">
            <div class="profile-img"> <img src="imagenes/profile.png" alt="user" /> </div>
            <div class="profile-text"> <a href="#" class="dropdown-toggle u-dropdown" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">{{nombre_usuario}}</a>
                <div class="dropdown-menu animated flipInY">
                    <div class="dropdown-divider"></div> <a href="/logout" class="dropdown-item" onclick="event.preventDefault(); document.getElementById('logout-form').submit();"><i class="fa fa-power-off"></i> Cerrar sesión</a>
                </div>
            </div>
        </div>
        <nav class="sidebar-nav">
          <ul id="sidebarnav">
            <li>
              <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="mdi mdi-home"></i><span class="hide-menu">ADMINISTRACION </span></a>
              <ul aria-expanded="false" class="collapse">
                  <li v-if="rol_usuario.TTJV_ficha_usuario"><router-link to="/">FICHA USUARIO</router-link></li>
                  <li v-if="rol_usuario.TTJV_acceso_usuario"><router-link to="/accesos">ACCESO USUARIO</router-link></li>
                  <li v-if="rol_usuario.TTJV_auditoria"><router-link to="/auditorias">AUDITORIA</router-link></li>
                  <li><router-link to="/vista">VISTA</router-link></li>
              </ul>
            </li>
            <li>
              <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="mdi mdi-gauge"></i><span class="hide-menu">RECEPCION </span></a>
              <ul aria-expanded="false" class="collapse">
                  <li v-if="rol_usuario.TTJV_paciente"><router-link to="/pacientes">PACIENTE</router-link></li>
                  <li v-if="rol_usuario.TTJV_turno"><router-link to="/turnos">TURNO</router-link></li>
              </ul>
            </li>
            <li>
              <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fas fa-ambulance"></i><span class="hide-menu">ENFERMERIA </span></a>
              <ul aria-expanded="false" class="collapse">
                  <li v-if="rol_usuario.TTJV_atencion"><router-link to="/atencion">ATENCION</router-link></li>
                  <li v-if="rol_usuario.TTJV_triaje"><router-link to="/triaje">TRIAJE</router-link></li>
              </ul>
            </li>
            <li>
              <a class="has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><i class="fas fa-address-card"></i><span class="hide-menu">SEGUIMIENTO </span></a>
              <ul aria-expanded="false" class="collapse">
                  <li v-if="rol_usuario.TTJV_resultados"><router-link to="/resultados">RESULTADOS</router-link></li>
                  <li v-if="rol_usuario.TTJV_actualizar"><router-link to="/actualizar">ACT. INFORMACIÓN</router-link></li>
                  <li v-if="rol_usuario.TTJV_receta"><router-link to="/recetas">RECETA</router-link></li>
              </ul>
            </li>
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