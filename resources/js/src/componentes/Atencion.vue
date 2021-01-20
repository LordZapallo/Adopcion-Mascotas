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
                                    title="Exportar PDF"
                                    @click=" pdf()"
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
                  <td>{{tr.TTJV_codigo}}</td>
                  <td>{{tr.TTJV_PersonaNombres}} {{tr.TTJV_PersonaApePaterno}} {{tr.TTJV_PersonaApeMaterno}}</td>
                  <td>{{tr.TTJV_fecha | fechayhoraformato}}</td>
                  <td v-if="tr.TTJV_estado" style="color:green">Activo</td>
                  <td v-else style="color:red">Inactivo</td>
                  <td>{{tr.nombre}} {{tr.apellido}}</td>
                  <td class="pointer acciones">
                    <i class="fa fa-edit" @click="abrir('editar', tr)"></i> |
                    <i class="fa fa-toggle-off" v-if="tr.TTJV_estado" @click="desactivar(tr.TTJV_id_atencion)"></i><template v-if="tr.TTJV_estado"> |</template> 
                    <i class="fa fa-toggle-on" v-if="!tr.TTJV_estado" @click="activar(tr.TTJV_id_atencion)"></i><template v-if="!tr.TTJV_estado"> |</template> 
                    <i class="fa fa-trash" @click="eliminar(tr.TTJV_id_atencion)"></i> | 
                    <i class="fas fa-ticket-alt" @click="turnpdf(tr.TTJV_id_turnos)"></i>
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
                          <label for="exampleInputEmail1">Paciente</label>
                          <select class="form-control" v-model="TTJV_id_persona">
                            <option value="">Selecciona el paciente</option>
                            <option v-for="(tr,index) in pacientes" :key="index" :value="tr.TTJV_id_persona">{{tr.TTJV_PersonaNombres}} {{tr.TTJV_PersonaApePaterno}} {{tr.TTJV_PersonaApeMaterno}}</option>
                          </select>
                          <div v-if="!TTJV_id_persona">
                            <div class="invalid-feedback" style="display:block;" v-for="err in errorTTJV_id_persona" :key="err">
                              {{ err }}
                            </div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Fecha</label>
                          <input type="datetime-local" class="form-control" v-model="TTJV_fecha">
                          <div v-if="!TTJV_fecha">
                            <div class="invalid-feedback" style="display:block;" v-for="err in errorTTJV_fecha" :key="err">
                              {{ err }}
                            </div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Estado</label>
                          <select class="form-control" v-model="TTJV_estado">
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                          </select>
                      </div> 
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary"  @click="cerrar()">Cerrar</button>
                <button type="button" class="btn btn-primary" v-if="tipomodal==1" @click="guardar()">Guardar</button>
                <button type="button" class="btn btn-primary" v-if="tipomodal==2" @click="editar()">Editar</button>
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
        pacientes:[],
        TTJV_servicio:"",
        TTJV_fecha:"",
        TTJV_estado:1,
        TTJV_id_persona:"",

        errorTTJV_servicio:[],
        errorTTJV_fecha:[],
        errorTTJV_id_persona:[],
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
      axios.get("/atencion/listar?buscar=" + buscar + "&page=" + pagina).then(res => {
        this.recupera = res.data.datos.data;
        this.paginacion= res.data.paginacion;
      }).catch(err => {
        console.log(err);
      });
    },
    listarpaciente(){
      axios.get("/persona/todos").then(res => {
        this.pacientes = res.data;
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
              this.TTJV_servicio = "";
              this.TTJV_fecha = "";
              this.TTJV_estado = 1;
              this.TTJV_id_persona = "";
              break;
          }
          case 'editar': {
              this.titulomodal="Editar Atención";
              this.abrirmodal=1;
              this.tipomodal=2;
              this.id = datos.TTJV_id_atencion;
              this.TTJV_servicio = datos.TTJV_servicio;
              this.TTJV_fecha = moment(datos.TTJV_fecha).format('YYYY-MM-DD\Thh:mm');
              this.TTJV_estado = datos.TTJV_estado;
              this.TTJV_id_persona = datos.TTJV_id_persona;
              break;
          }
      }
    },
    guardar(){
      if(this.validar()){return;} 
      axios.put("/atencion/guardar",{
        TTJV_servicio: this.TTJV_servicio,
        TTJV_fecha: this.TTJV_fecha,
        TTJV_estado: this.TTJV_estado,
        TTJV_id_persona: this.TTJV_id_persona,
      }).then(res => {
        this.listar(1,this.buscar);
        this.cerrar();
        alertify.success('Registro Agregado');
      }).catch(err => {
        console.log(err);
      });
    },
    editar(){
      if(this.validar()){return;}
      axios.put("/atencion/editar",{
        id: this.id,
        TTJV_servicio: this.TTJV_servicio,
        TTJV_fecha: this.TTJV_fecha,
        TTJV_estado: this.TTJV_estado,
        TTJV_id_persona: this.TTJV_id_persona,
      }).then(res => {
        this.listar(1,this.buscar);
        this.cerrar();
        alertify.success('Registro Actualizado');
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
                axios.delete("/atencion/eliminar/"+id).then(res => {
                    this.listar(1,this.buscar);
                    alertify.success('Registro Eliminado');
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    },
    desactivar(id){
      Swal.fire({
          title: 'Desactivar registro?',
          text: "Esta seguro desea desactivar este registro?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Desactivar'
      }).then((result) => {
          if (result.value) {
              axios.post("/atencion/desactivar/"+id).then(res => {
                  this.listar(1,this.buscar);
                  alertify.success('Registro Desactivado');
              }).catch(err => {
                  console.log(err);
              });
          }
      });
    },
    activar(id){
      Swal.fire({
          title: 'Activar registro?',
          text: "Esta seguro desea activar este registro?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Activar'
      }).then((result) => {
          if (result.value) {
              axios.post("/atencion/activar/"+id).then(res => {
                  this.listar(1,this.buscar);
                  alertify.success('Registro Desactivado');
              }).catch(err => {
                  console.log(err);
              });
          }
      });
    },
    cerrar(){
      this.abrirmodal = 0;
      this.id = null;
      this.TTJV_servicio = "";
      this.TTJV_fecha = "";
      this.TTJV_estado = 1;
      this.TTJV_id_persona = "";
    },
    validar(){
      this.error = 0;   
      this.errorTTJV_fecha = [];
      this.errorTTJV_id_persona = [];

      if(!this.TTJV_fecha){
        this.errorTTJV_fecha.push("Ingrese una fecha");
        this.error = 1;
      }
      if(!this.TTJV_id_persona){
        this.errorTTJV_id_persona.push("Escoga un paciente para añadir la atención");
        this.error = 1;
      }

      return this.error;
    },
    //funciones export archivos
    excel() {
      window.open("/atencion/excel", "_top");
    },                           
    pdf() {
      window.open("/atencion/pdf", "_top");
    },
    turnpdf(idt){
        window.open("/turno/pdf/" + idt, "_blank");
    }
  },
  mounted() {
    this.listar(1, this.buscar);
    this.listarpaciente();
  }
};
</script>
