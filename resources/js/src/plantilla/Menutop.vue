<template>
    <header class="topbar" style="position: fixed;width: 100%;">
      <nav class="navbar top-navbar navbar-expand-md navbar-light">
        <div class="navbar-header">
          <a class="navbar-brand" href="javascript:void(0)">
            <b>
              <img src="/imagenes/avt.png" class="light-logo lluno" alt="homepage" style="width: 55px;margin-left: -4px;display:none;"/>
            </b>
            <span>
              <img src="/imagenes/avt.png" class="light-logo lldos" alt="homepage" style="width: 41%;"/>
            </span>
          </a>
        </div>
        <div class="navbar-collapse">
          <ul class="navbar-nav mr-auto mt-md-0">
            <li class="nav-item"> <a class="nav-link sidebartoggler hidden-sm-down text-muted waves-effect waves-dark" @click="menu()" href="javascript:void(0)"><i class="ti-menu"></i></a> </li>
            <li class="nav-item">
              <a
                class="nav-link nav-toggler hidden-md-up text-muted waves-effect waves-dark"
                href="javascript:void(0)"
              >
                <i class="mdi mdi-menu"></i>
              </a>
            </li>
          </ul>
          <ul class="navbar-nav my-lg-0">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle text-muted waves-effect waves-dark"
                href
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src="/imagenes/profile.png" alt="user" class="profile-pic" />
              </a>
              <div class="dropdown-menu dropdown-menu-right scale-up">
                <ul class="dropdown-user">
                  <li>
                    <div class="dw-user-box" style="text-align: center;">
                      <div class="u-text">
                        <h4>{{nombre_usuario}}</h4>
                        <p class="text-muted">{{correo_usuario}}</p>
                      </div>
                    </div>
                  </li>
                  <li role="separator" class="divider"></li>
                  <li>
                    <a href="/logout" class="cerrarsesion" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                      <i class="fa fa-power-off"></i>  Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </header>
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
        correo_usuario:""
    };
  },
  methods: {
    recuperar() {
      axios
        .get("/sesion/recuperar")
        .then(res => {
          if(res.data){
            this.nombre_usuario = res.data.nombre;
            this.rol_usuario= res.data.rol;
            this.correo_usuario= res.data.email;
          }else{
            $(".cerrarsesion").click();
          }
        }).catch(err => {
            $(".cerrarsesion").click();
        });
    },
    menu(){ 
      if($("body").hasClass("mini-sidebar")){
        $(".lluno").hide();
        $(".lldos").show();
        $("body").removeClass("mini-sidebar");
      }else{
        $(".lluno").show();
        $(".lldos").hide(); 
        $("body").addClass("mini-sidebar");
      }
    }
  },
  mounted() {
    this.recuperar();
  }
};
</script>
