<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12 justify-content-end">
                <div class="btn-group" style="float: right;"> 
                                                    <button
                                    type="button"
                                    class="btn btn-outline-primary ml-4"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Exportar PDF Todos"
                                    @click="pdf()"
                                >
                                    <i
                                        style="color:black"
                                        class="fas fa-file-pdf"
                                    ></i>
                                </button>
                                                                                    <button
                                    type="button"
                                    class="btn btn-outline-primary "
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Exportar PDF Rojos"
                                    @click="pdf1()"
                                >
                                    <i
                                        style="color:red"
                                        class="fas fa-file-pdf"
                                    ></i>
                                </button>
                                                                                    <button
                                    type="button"
                                    class="btn btn-outline-primary "
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Exportar PDF Naranjas"
                                    @click="pdf2()"
                                >
                                    <i
                                        style="color:orange"
                                        class="fas fa-file-pdf"
                                    ></i>
                                </button>
                                                                                    <button
                                    type="button"
                                    class="btn btn-outline-primary "
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Exportar PDF Amarillos"
                                    @click="pdf3()"
                                >
                                    <i
                                        style="color:yellow"
                                        class="fas fa-file-pdf"
                                    ></i>
                                </button>
                                                                                    <button
                                    type="button"
                                    class="btn btn-outline-primary "
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Exportar PDF Verdes"
                                    @click="pdf4()"
                                >
                                    <i
                                        style="color:green"
                                        class="fas fa-file-pdf"
                                    ></i>
                                </button>
                                                                                    <button
                                    type="button"
                                    class="btn btn-outline-primary "
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Exportar PDF Azules"
                                    @click="pdf5()"
                                >
                                    <i
                                        style="color:blue"
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
                  <th>Motivo de consulta</th>
                  <th>Color</th>
                  <th>Tratamiento</th>
                  <th>Proxima cita</th>
                  <th>Plan</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody v-if="recupera.length">
                <tr v-for="(tr,index) in recupera" :key="index">
                  <td>{{tr.TTJV_codigo}}</td>
                  <td>{{tr.TTJV_PersonaNombres}} {{tr.TTJV_PersonaApePaterno}} {{tr.TTJV_PersonaApeMaterno}}</td>
                  <td v-if="tr.TTJV_nombre">{{tr.TTJV_nombre}}</td><td v-else>Emergencia</td>
                  <td v-if="tr.TTJV_color==1" style="background:red;color:#000;font-weight: bold;">Rojo</td><td v-else-if="tr.TTJV_color==2" style="background:orange;color:#000;font-weight: bold;">Naranja</td><td v-else-if="tr.TTJV_color==3" style="background:yellow;color:#000;font-weight: bold;">Amarillo</td><td v-else-if="tr.TTJV_color==4" style="background:green;color:#000;font-weight: bold;">Verde</td><td v-else style="background:blue;color:#000;font-weight: bold;">Azul</td>
                  <td v-if="tr.TTJV_tratamiento">{{tr.TTJV_tratamiento}}</td><td v-else>-</td>
                  <td v-if="tr.TTJV_proxima_cita">{{tr.TTJV_proxima_cita}}</td><td v-else>-</td>
                  <td v-if="tr.TTJV_plan">{{tr.TTJV_plan}}</td><td v-else>-</td>
                  <td class="pointer acciones">
                    <i class="fa fa-edit" @click="abrir('editar', tr)"></i> |
                    <i class="fa fa-chevron-down" @click="up(tr.TTJV_id_resultado)" v-if="tr.TTJV_color<=4"></i> <template v-if="tr.TTJV_color<=4"> |</template>
                    <i class="fa fa-chevron-up" @click="down(tr.TTJV_id_resultado)" v-if="tr.TTJV_color>=2"></i> <template v-if="tr.TTJV_color>=2"> |</template>
                    <i class="fa fa-trash" @click="eliminar(tr.TTJV_id_resultado)"></i>
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
        <div class="modal-dialog" role="document">
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
                          <label for="exampleInputEmail1">Tratamiento</label>
                          <input type="text" class="form-control" v-model="tratamientoss">
                      </div> 
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Proxima cita</label>
                          <input type="date" class="form-control" v-model="citas">
                      </div> 
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Plan</label>
                          <input type="text" class="form-control" v-model="plans">
                      </div> 
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"  @click="cerrar()">Cerrar</button>
                <button type="button" class="btn btn-primary" v-if="tipomodal==1" @click="guardar()">Guardar</button>
                <button type="button" class="btn btn-primary" v-if="tipomodal==2" @click="guardar()">Editar</button>
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
        TTJV_tratamiento:"",
        TTJV_proxima_cita:"",
        TTJV_plan:"",
        TTJV_id_persona:"",
        TTJV_id_turno:"",
        TTJV_id_triaje:"",
        tratamientoss:"",
        citas:"",
        plans:"",
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
      axios.get("/resultados/listar?buscar=" + buscar + "&page=" + pagina).then(res => {
        this.recupera = res.data.datos.data;
        this.paginacion= res.data.paginacion;
      }).catch(err => {
        console.log(err);
      });
    },
    up(id){
      Swal.fire({
          title: 'Bajar Gravedad de registro?',
          text: "Esta seguro de Modificar este registro?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Aceptar'
      }).then((result) => {
          if (result.value) {
              axios.post("/resultados/up/"+id).then(res => {
                  alertify.success('Registro Actualizado');
                  this.listar(1,this.buscar);
              }).catch(err => {
                  console.log(err);
              });
          }
      });
    },
    down(id){
      Swal.fire({
          title: 'Subir Gravedad de registro?',
          text: "Esta seguro de Modificar este registro?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Aceptar'
      }).then((result) => {
          if (result.value) {
              axios.post("/resultados/down/"+id).then(res => {
                  alertify.success('Registro Actualizado');
                  this.listar(1,this.buscar);
              }).catch(err => {
                  console.log(err);
              });
          }
      });
    },
    abrir(tipo, datos){
      switch(tipo){
          case 'agregar': {
              this.titulomodal="Agregar nueva Atención";
              this.abrirmodal = 1;
              this.tipomodal = 1;
              this.id = null;
              //opcionales
              this.tratamientoss = "";
              this.citas = "";
              this.plans = "";
              break;
          }
          case 'editar': {
              this.titulomodal="Editar Atención";
              this.abrirmodal=1;
              this.tipomodal=2;
              this.id = datos.TTJV_id_resultado;
              this.tratamientoss = datos.TTJV_tratamiento;
              this.citas = datos.TTJV_proxima_cita;
              this.plans = datos.TTJV_plan;
              break;
          }
      }
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
                axios.delete("/resultados/eliminar/"+id).then(res => {
                    this.listar(1,this.buscar);
                    alertify.success('Registro Eliminado');
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    },
    cerrar(){
      this.abrirmodal = 0;
      this.id = null;
      this.TTJV_medicamento = "";
      this.TTJV_presentacion = "";
      this.TTJV_dosis = "";
      this.TTJV_duracion = "";
      this.TTJV_cantidad = "";
      this.TTJV_codigo = "";
      this.TTJV_id_turno = "";
    },
    guardar(){
      axios.post("/tratamiento/guardar",{
        id:this.id,
        tratamiento:this.tratamientoss,
        cita:this.citas,
        plan:this.plans
      }).then( res => {
        alertify.success('Registro Guardado');
        this.listar(1,this.buscar);
        this.cerrar();
      });
    },
    //funciones export archivos
    excel() {
      window.open("/resultados/excel", "_top");
    },
    pdf() {
      window.open("/resultados/pdf", "_top");
    },
    pdf1() {
      window.open("/resultados1/pdf", "_top");
    },
    pdf2() {
      window.open("/resultados2/pdf", "_top");
    },
    pdf3() {
      window.open("/resultados3/pdf", "_top");
    },
    pdf4() {
      window.open("/resultados4/pdf", "_top");
    },
    pdf5() {
      window.open("/resultados5/pdf", "_top");
    },
  },
  mounted() {
    this.listar(1, this.buscar);
  }
};
</script>
