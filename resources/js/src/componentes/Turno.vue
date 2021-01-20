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
                <input type="text" class="form-control" placeholder="Buscar.." aria-describedby="basic-addon2" v-model="buscar" @keyup="listar(1,buscar)"/>
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
                  <th>Turno</th>
                  <th>Paciente</th>
                  <th>Fecha de creación</th>
                  <th>Estado</th>
                  <th>Usuario Creador</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody v-if="recupera.length">
                <tr v-for="(tr,index) in recupera" :key="index">
                  <td>{{ tr.TTJV_codigo }}</td>
                  <td>{{ tr.TTJV_PersonaNombres }} {{ tr.TTJV_PersonaApePaterno }} {{ tr.TTJV_PersonaApeMaterno }}</td>
                  <td>{{ tr.TTJV_fecha | fechayhoraformato}}</td>
                  <td v-if="tr.TTJV_estado==1" style="color: orange;">En Espera</td>
                  <td v-else-if="tr.TTJV_estado==2" style="color: green;">Ingresado</td>
                  <td v-else style="color: red;">Ausente</td>
                  <td>{{tr.nombre}} {{tr.apellido}}</td>
                  <td class="pointer acciones">
                    <i class="fas fa-university" @click="ingreso(tr)" v-if="tr.TTJV_estado==1" title="Paciente ingresado"> |</i> 
                    <i class="fas fa-toggle-off" @click="ausente(tr)" v-if="tr.TTJV_estado==1" title="Paciente ausente"> |</i> 
                    <i class="fas fa-toggle-on"  @click="reactivar(tr)" v-if="tr.TTJV_estado==3" title="reasignar turno al paciente"> |</i> 
                    <i class="fa fa-trash" @click="eliminar(tr.TTJV_id_turnos)" v-if="tr.TTJV_estado!=2" title="eliminar turno"></i>
                    <i class="fas fa-arrow-circle-left" @click="volver(tr)" v-if="tr.TTJV_estado==2" title="Volver a paciente en espera"> <span v-if="tr.TTJV_estado==2"> |</span> </i>
                    <i class="fas fa-ticket-alt" @click="turnpdf(tr.TTJV_id_turnos)" v-if="tr.TTJV_estado==2" title="imprimir paciente"></i>
                  </td>
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
    <div class="modal" :class="{'abrirmodal':abrirmodal}" >
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{titulomodal}}</h5>
                <button type="button" class="close" @click="cerrar()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <form action="">
                <div class="row form-material">
                  <div class="col-xl-12 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Servicio</label>
                          <input type="text" class="form-control" v-model="servicio">
                          <div v-show="error">
                              <div class="invalid-feedback" style="display:block;" v-for="err in errorservicio" :key ="err">{{err}}</div>
                          </div>
                      </div> 
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"  @click="cerrar()">Cerrar</button>
                <button type="button" class="btn btn-primary" @click="ingreso()">Guardar</button>
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
        id: null,
        pagina: 1,
        error: null,
        accion: null,
        paginacion: {
            total: 0,
            current_page: 0,
            per_page: 0,
            last_page: 0,
            from: 0,
            to: 0
        },
        offset:3,
        abrirmodal:0,
        titulomodal:"",
        tipomodal:null,
        error:0,
        id:0,
        //campos
        servicio:"",
        errorservicio:[],
        recuperalista:[],
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
    fechaformato(data){
      return moment(data).format('LL');
    },
    fechayhoraformato(data){
      return moment(data).format('LLL');
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
      axios.get("/turnos/listar?buscar=" + buscar + "&page=" + pagina).then(res => {
        this.recupera = res.data.datos.data;
        this.paginacion= res.data.paginacion;
      }).catch(err => {
        console.log(err);
      });
    },
    abriringreso(data){
        this.recuperalista = data;
        this.abrirmodal = 1;
        this.tipomodal = 1;
        this.titulomodal = "Ingresar el servicio a este paciente"
    },
    volver(data){
        axios.post("/turnos/volver",data).then(res => {
            alertify.success('Registro Actualizado');
            this.listar(1,this.buscar);
        }).catch(err => {
            console.log(err);
        });
    },
    ingreso(tr){
        axios.post("/turnos/ingreso",tr).then(res => {
            alertify.success('Registro Actualizado');
            this.listar(1,this.buscar);
            this.cerrar();
        }).catch(err => {
            console.log(err);
        });
    },
    ausente(data){
        axios.post("/turnos/ausente",data).then(res => {
            alertify.success('Registro Actualizado');
            this.listar(1,this.buscar);
        }).catch(err => {
            console.log(err);
        });
    },
    reactivar(data){
        axios.post("/turnos/reactivar",data).then(res => {
            alertify.success('Registro Actualizado');
            this.listar(1,this.buscar);
        }).catch(err => {
            console.log(err);
        });
    },
    eliminar(id){
        Swal.fire({
            title: 'Eliminar registro?',
            text: "Esta seguro de eliminar este registro?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.value) {
                axios.delete("/turnos/eliminar/"+id).then(res => {
                    this.listar(1,this.buscar);
                    alertify.success('Registro Eliminado');
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    },
    validar(){
        this.error = 0;
        this.errorservicio = [];
        if(!this.servicio){
            this.errorservicio.push("debe ingresar un servicio");
            this.error = 1;
        }
        return this.error;
    },
    cerrar(){
        this.abrirmodal = 0;
        this.servicio = "";
    },
                //funciones export archivos
        excel() {
            window.open("/turnos/excel", "_top");
                   },
                                              pdf() {
            window.open("/turnos/pdf", "_top");
                   },
                   turnpdf(idt){
            window.open("/turno/pdf/" + idt, "_blank");
                   }

  },
  mounted() {
    this.listar(1, this.buscar);
  }
};
</script>
