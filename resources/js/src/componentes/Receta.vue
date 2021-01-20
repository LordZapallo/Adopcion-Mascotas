<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12 justify-content-end">
                <div class="btn-group" style="float: right;">
                  <button type="button" class="btn btn-primary ml-2" @click="abrir('agregar')">Agregar Atención</button>
                  <button type="button" class="btn btn-outline-primary" data-toggle="tooltip" data-placement="top" title="Exportar PDF" @click="pdf()">
                      <i style="color:#d40a0a" class="fas fa-file-pdf"></i>
                  </button>
                  <button type="button" class="btn btn-outline-primary" data-toggle="tooltip" data-placement="top" title="Exportar Excel" @click="excel()">
                      <i style="color:#107c42;" class="fas fa-file-excel"></i>
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
                  <th>Medicamento</th>
                  <th>Presentación</th>
                  <th>Dosis</th>
                  <th>Duración</th>
                  <th>Cantidad</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody v-if="recupera.length">
                <tr v-for="(tr,index) in recupera" :key="index">
                  <td>{{tr.TTJV_codigo}}</td>
                  <td>{{tr.TTJV_PersonaNombres}} {{tr.TTJV_PersonaApePaterno}} {{tr.TTJV_PersonaApeMaterno}}</td>
                  <td v-if="tr.TTJV_medicamento">{{tr.TTJV_medicamento}}</td><td v-else>-</td>
                  <td v-if="tr.TTJV_presentacion">{{tr.TTJV_presentacion}}</td><td v-else>-</td>
                  <td v-if="tr.TTJV_dosis">{{tr.TTJV_dosis}}</td><td v-else>-</td>
                  <td v-if="tr.TTJV_duracion">{{tr.TTJV_duracion}}</td><td v-else>-</td>
                  <td v-if="tr.TTJV_cantidad">{{tr.TTJV_cantidad}}</td><td v-else>-</td>
                  <td class="pointer acciones">
                    <i class="fa fa-edit" @click="abrir('editar', tr)"></i> |
                    <i class="fa fa-trash" @click="eliminar(tr.TTJV_id_receta)"></i>
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
                          <label for="exampleInputEmail1">Turno</label>
                          <select class="form-control" v-model="TTJV_id_resultado">
                            <option value="">Selecciona un turno</option>
                            <option v-for="(tr,index) in turnos" :key="index" :value="tr.TTJV_id_resultado">{{tr.TTJV_codigo}} - <template v-if="tr.TTJV_PersonaIdentificacion!=9999999999">{{tr.TTJV_PersonaNombres}} {{tr.TTJV_PersonaApeMaterno}}</template></option>
                          </select>
                          <div v-if="!TTJV_id_resultado">
                            <div class="invalid-feedback" style="display:block;" v-for="err in errorTTJV_id_resultado" :key="err">
                              {{ err }}
                            </div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Medicamento</label>
                          <input type="text" class="form-control" v-model="TTJV_medicamento" onkeypress="return sololetras(event)" >
                          <div v-if="!TTJV_medicamento">
                            <div class="invalid-feedback" style="display:block;" v-for="err in errorTTJV_medicamento" :key="err">
                              {{ err }}
                            </div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Presentación</label>
                          <input type="text" class="form-control" v-model="TTJV_presentacion" onkeypress="return sololetras(event)" >
                          <div v-if="!TTJV_presentacion">
                            <div class="invalid-feedback" style="display:block;" v-for="err in errorTTJV_presentacion" :key="err">
                              {{ err }}
                            </div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Dosis</label>
                          <input type="text" class="form-control" v-model="TTJV_dosis" onkeypress="return solonumeros(event)" maxlength="5">
                          <div v-if="!TTJV_dosis">
                            <div class="invalid-feedback" style="display:block;" v-for="err in errorTTJV_dosis" :key="err">
                              {{ err }}
                            </div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Duración</label>
                          <input type="text" class="form-control" v-model="TTJV_duracion" onkeypress="return solonumeros(event)" maxlength="5">
                          <div v-if="!TTJV_duracion">
                            <div class="invalid-feedback" style="display:block;" v-for="err in errorTTJV_duracion" :key="err">
                              {{ err }}
                            </div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Cantidad</label>
                          <input type="text" class="form-control" v-model="TTJV_cantidad" onkeypress="return solonumeros(event)" maxlength="5">
                          <div v-if="!TTJV_cantidad">
                            <div class="invalid-feedback" style="display:block;" v-for="err in errorTTJV_cantidad" :key="err">
                              {{ err }}
                            </div>
                          </div>
                      </div> 
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"  @click="cerrar()">Cerrar</button>
                <button type="button" class="btn btn-primary" v-if="tipomodal==1" @click="guardar()">Guardar</button>
                <button type="button" class="btn btn-primary" v-if="tipomodal==2" @click="editar()">Actualizar</button>
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
        TTJV_medicamento:"",
        TTJV_presentacion:"",
        TTJV_dosis:"",
        TTJV_duracion:"",
        TTJV_cantidad:"",
        TTJV_codigo:"",
        TTJV_id_resultado:"",
        turnos:[],

        errorTTJV_medicamento:[],
        errorTTJV_presentacion:[],
        errorTTJV_dosis:[],
        errorTTJV_duracion:[],
        errorTTJV_cantidad:[],
        errorTTJV_id_resultado:[],
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
      axios.get("/receta/listar?buscar=" + buscar + "&page=" + pagina).then(res => {
        this.recupera = res.data.datos.data;
        this.paginacion= res.data.paginacion;
      }).catch(err => {
        console.log(err);
      });
    },
    listarturnos(){
      axios.get("/receta/listarturno").then(res => {
        this.turnos = res.data;
      }).catch(err => {
        console.log(err);
      });
    },
    guardar(){
      if(this.validar()){return;}
      axios.post("/receta/guardar",{
        TTJV_medicamento: this.TTJV_medicamento,
        TTJV_presentacion: this.TTJV_presentacion,
        TTJV_dosis: this.TTJV_dosis,
        TTJV_duracion: this.TTJV_duracion,
        TTJV_cantidad: this.TTJV_cantidad,
        TTJV_id_resultado: this.TTJV_id_resultado ,
      }).then(res => {
          this.listar(1,this.buscar);
          this.cerrar();
          alertify.success('Registro Guardado');
      }).catch(err => {
          console.log(err);
      });
    },
    editar(){
      if(this.validar()){return;}
      axios.put("/receta/editar",{
        TTJV_medicamento: this.TTJV_medicamento,
        TTJV_presentacion: this.TTJV_presentacion,
        TTJV_dosis: this.TTJV_dosis,
        TTJV_duracion: this.TTJV_duracion,
        TTJV_cantidad: this.TTJV_cantidad,
        TTJV_id_resultado: this.TTJV_id_resultado,
        id:this.id
      }).then(res => {
          console.log(res.data);
          this.listar(1,this.buscar);
          this.cerrar();
          alertify.success('Registro Actualizado');
      }).catch(err => {
          console.log(err);
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
              this.TTJV_medicamento = "";
              this.TTJV_presentacion = "";
              this.TTJV_dosis = "";
              this.TTJV_duracion = "";
              this.TTJV_cantidad = "";
              this.TTJV_codigo = "";
              this.TTJV_id_resultado =  "";
              break;
          }
          case 'editar': {
              this.titulomodal="Editar Atención";
              this.abrirmodal=1;
              this.tipomodal=2;
              this.id = datos.TTJV_id_receta;
              this.TTJV_medicamento = datos.TTJV_medicamento;
              this.TTJV_presentacion = datos.TTJV_presentacion;
              this.TTJV_dosis = datos.TTJV_dosis;
              this.TTJV_duracion = datos.TTJV_duracion;
              this.TTJV_cantidad = datos.TTJV_cantidad;
              this.TTJV_codigo = datos.TTJV_cantidad;
              this.TTJV_id_resultado = datos.TTJV_id_resultado;
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
                axios.delete("/receta/eliminar/"+id).then(res => {
                  console.log(res.data);
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
      this.errorTTJV_medicamento = [];
      this.errorTTJV_presentacion = [];
      this.errorTTJV_dosis = [];
      this.errorTTJV_duracion = [];
      this.errorTTJV_cantidad = [];
      this.errorTTJV_id_resultado = [];

      if(!this.TTJV_medicamento){
        this.errorTTJV_medicamento.push("Ingresar Medicamento");
        this.error = 1;
      }
      if(!this.TTJV_presentacion){
        this.errorTTJV_presentacion.push("Ingresar Presentación");
        this.error = 1;
      }
      if(!this.TTJV_dosis){
        this.errorTTJV_dosis.push("Ingresar Dosis");
        this.error = 1;
      }
      if(!this.TTJV_duracion){
        this.errorTTJV_duracion.push("Ingresar Duración");
        this.error = 1;
      }
      if(!this.TTJV_cantidad){
        this.errorTTJV_cantidad.push("Ingresar Cantidad");
        this.error = 1;
      }
      if(!this.TTJV_id_resultado){
        this.errorTTJV_id_resultado.push("Escoger turno");
        this.error = 1;
      }

      return this.error;
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
                //funciones export archivos
        excel() {
            window.open("/receta/excel", "_top");
                   },
                                              pdf() {
            window.open("/receta/pdf", "_top");
                   }
  },
  mounted() {
    this.listar(1, this.buscar);
    this.listarturnos();
  }
};
</script>
