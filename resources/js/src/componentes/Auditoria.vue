<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12 justify-content-end">
                                          <div class="btn-group ml-1" style="float: right;">
                                <button
                                    type="button"
                                    class="btn btn-outline-primary"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Exportar PDF"
                                    @click="pdf()"
                                >
                                    <i
                                        style="color:#d40a0a"
                                        class="fas fa-file-pdf"
                                    ></i>
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-outline-primary"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Exportar Excel"
                                    @click="excel()"
                                >
                                    <i
                                        style="color:#107c42;"
                                        class="fas fa-file-excel"
                                    ></i>
                                </button>
                            </div>
              <div class="input-group mb-3" style="width: 20em;float: right;">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Buscar.."
                  aria-describedby="basic-addon2"
                  v-model="buscar"
                  @keyup="listar(1,buscar)"
                />
                <div class="input-group-append">
                  <span class="input-group-text" id="basic-addon2">
                    <i class="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Acción</th>
                  <th>Fecha</th>
                  <th>Módulo</th>
                  <th>Origen</th>
                </tr>
              </thead>
              <tbody v-if="recupera.length">
                <tr v-for="(tr,index) in recupera" :key="index">
                  <td>{{tr.usuario}}</td>
                  <td>{{tr.TTJV_accion}}</td>
                  <td>{{tr.TTJV_fecha | fechayhora}}</td>
                  <td>{{tr.TTJV_modulo}}</td>
                  <td>{{tr.TTJV_origen}}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="99">
                    <div class="alert alert-warning text-center" role="alert">SIN REGISTROS</div>
                  </td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul class="pagination justify-content-center">
                <li class="page-item" v-if="paginacion.current_page > 1">
                  <a class="page-link" href="#" @click.prevent="cambiarPagina(paginacion.current_page - 1)">&laquo;</a>
                </li>
                <li class="page-item" v-else>
                  <a class="page-link" disabled>&laquo;</a>
                </li>
                <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                  <a class="page-link" href="#" @click.prevent="cambiarPagina(page)" v-text="page"></a>
                </li>
                <li class="page-item" v-if="paginacion.current_page < paginacion.last_page">
                  <a class="page-link" href="#" @click.prevent="cambiarPagina(paginacion.current_page + 1)">&raquo;</a>
                </li>
                <li class="page-item" v-else>
                  <a class="page-link" disabled>&raquo;</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from 'sweetalert2';
var moment = require('moment');
moment.locale("es");
export default {
  data() {
    return {
        //datos obligatorios
        recupera: [],
        buscar: "",
        pagina: 1,
        paginacion: {
            total: 0,
            current_page: 0,
            per_page: 0,
            last_page: 0,
            from: 0,
            to: 0
        },
        offset:3,
    };
  },
  computed: {
    // No mover obligatorios
    isActived() {
      return this.paginacion.current_page;
    },
    pagesNumber() {
      if (!this.paginacion.to) {
        return [];
      }
      var from = this.paginacion.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      var to = from + this.offset * 2;
      if (to >= this.paginacion.last_page) {
        to = this.paginacion.last_page;
      }
      var pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++;
      }
      return pagesArray;
    },
    fechaalerta(){
      return moment().add(91, 'days').format('YYYY-MM-DD hh:ss');
    },
    fechaalerta1(){
      return moment().add(182, 'days').format('YYYY-MM-DD hh:ss');
    }
  },
  filters:{
    fechayhora(data){
      return moment(data).format('LLL');
    },
    fecha(data){
      return moment(data).format('LL');
    }
  },
  methods: {
    // No mover obligatorios
    cambiarPagina(page){
      this.paginacion.current_page = page;
      this.listar(page,this.buscar);
    },
    //metodos cambiantes
    listar(pagina, buscar) {
      axios.get("/auditoria/listar?buscar=" + buscar + "&page=" + pagina).then(res => {
        this.recupera = res.data.datos.data;
        this.paginacion= res.data.paginacion;
      }).catch(err => {
        console.log(err);
      });
    },
                //funciones export archivos
        excel() {
            window.open("/auditoria/excel", "_top");
                   },
                                              pdf() {
            window.open("/auditoria/pdf", "_top");
                   }
  
  },
  mounted() {
    this.listar(1, this.buscar);
  }
};
</script>
