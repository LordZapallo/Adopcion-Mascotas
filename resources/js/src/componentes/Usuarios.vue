<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-12 justify-content-end">
                <div class="btn-group" style="float: right;">
                    <button type="button" class="btn btn-primary ml-2" @click="abrir('agregar')">Agregar Usuario</button>
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
                  <th>Cédula</th>
                  <th>Persona</th>
                  <th>Email</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody v-if="recupera.length">
                <tr v-for="(tr,index) in recupera" :key="index">
                  <td>{{tr.cedula}}</td>
                  <td>{{tr.nombre}} {{tr.apellido}}</td>
                  <td>{{tr.email}}</td>
                  <td v-if="tr.estado">Activo</td>
                  <td v-else>Inactivo</td>
                  <td class="pointer acciones">
                    <i class="fa fa-edit" @click="abrir('editar', tr)"></i> |
                    <i class="fa fa-trash" @click="eliminar(tr.id)"></i>
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
                  <div class="col-xl-4 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Nombres</label>
                          <input type="text" class="form-control" v-model="nombre" onkeypress="return sololetras(event)">
                          <div v-show="error">
                              <div class="invalid-feedback" style="display:block;" v-for="err in errornombre" :key ="err">{{err}}</div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-4 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Apellidos</label>
                          <input type="text" class="form-control" v-model="apellido" onkeypress="return sololetras(event)">
                          <div v-show="error">
                              <div class="invalid-feedback" style="display:block;" v-for="err in errorapellido" :key ="err">{{err}}</div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-4 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Cédula</label>
                          <input type="text" class="form-control" v-model="cedula" onkeypress="return solonumeros(event)">
                          <div v-show="error">
                              <div class="invalid-feedback" style="display:block;" v-for="err in errorcedula" :key ="err">{{err}}</div>
                          </div>
                      </div> 
                  </div>
                  <div class="col-xl-12 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Dirección</label>
                          <input type="text" class="form-control" v-model="direccion">
                      </div> 
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Teléfono</label>
                          <input type="text" class="form-control" v-model="telefono" onkeypress="return solonumeros(event)" maxlength="9">
                          <div v-show="error">
                              <div class="invalid-feedback" style="display:block;" v-for="err in errortelefono" :key ="err">{{err}}</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Celular</label>
                          <input type="text" class="form-control" v-model="celular" onkeypress="return solonumeros(event)" maxlength="10">
                      </div>
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Correo electrónico</label>
                          <input type="text" class="form-control" v-model="email">
                          <div v-show="error">
                              <div class="invalid-feedback" style="display:block;" v-for="err in erroremail" :key ="err">{{err}}</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Estado</label>
                          <select class="form-control" v-model="estado">
                            <option value="1">Activo</option>
                            <option value="0">Inactivo</option>
                          </select>
                      </div>
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Contraseña <span v-if="tipomodal==2" style="font-size: 10px;font-weight: bold;font-family: unset;">(Dejar vacío si no se cambia)</span></label>
                          <input type="password" name="passusuariob" autocomplete="current-passwordb" class="form-control" v-model="password">
                          <div v-show="error">
                              <div class="invalid-feedback" style="display:block;" v-for="err in errorpassword" :key ="err">{{err}}</div>
                          </div>
                      </div>
                  </div>
                  <div class="col-xl-6 col-lg-12 col-md-12">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Repetir Contraseña</label>
                          <input type="password" name="repassusuariob" autocomplete="recurrent-passwordb" class="form-control" v-model="repassword">
                          <div v-show="error">
                              <div class="invalid-feedback" style="display:block;" v-for="err in errorrepassword" :key ="err">{{err}}</div>
                          </div>
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
        nombre:"",
        apellido:"",
        cedula:"",
        direccion:"",
        telefono:"",
        celular:"",
        estado:1,
        email:"",
        password:"",
        repassword:"",
        //errores
        errornombre: [],
        errorapellido: [],
        errorcedula: [],
        errortelefono: [],
        erroremail: [],
        errorpassword: [],
        errorrepassword: [],
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
      axios.get("/usuarios/listar?buscar=" + buscar + "&page=" + pagina).then(res => {
        this.recupera = res.data.datos.data;
        this.paginacion= res.data.paginacion;
      }).catch(err => {
        console.log(err);
      });
    },
    abrir(tipo, datos){
        this.errornombre =  [];
        this.errorapellido =  [];
        this.errorcedula =  [];
        this.errortelefono =  [];
        this.erroremail =  [];
        this.errorpassword =  [];
        this.errorrepassword =  [];
        switch(tipo){
            case 'agregar': {
                this.titulomodal="Agregar Usuarios";
                this.abrirmodal=1;
                this.tipomodal=1;
                this.id = null;
                //opcionales
                this.nombre = "";
                this.apellido = "";
                this.cedula = "";
                this.direccion = "";
                this.telefono = "";
                this.celular = "";
                this.estado = 1;
                this.email = "";
                this.password = "";
                this.repassword = "";
                break;
            }
            case 'editar': {
                this.titulomodal="Editar Usuario";
                this.abrirmodal=1;
                this.tipomodal=2;
                //opcionales
                this.id = datos.id;
                this.nombre = datos.nombre;
                this.apellido = datos.apellido;
                this.cedula = datos.cedula;
                this.direccion = datos.direccion;
                this.telefono = datos.telefono;
                this.celular = datos.celular;
                this.estado = datos.estado;
                this.email = datos.email;
                this.password = datos.password;
                break;
            }
        }
    },
    guardar(){
        if(this.validar()){return;}
        axios.post("/usuarios/guardar",{
          nombre: this.nombre,
          apellido: this.apellido,
          cedula: this.cedula,
          direccion: this.direccion,
          telefono: this.telefono,
          celular: this.celular,
          estado: this.estado,
          email: this.email,
          password: this.password
        }).then(res => {
            this.cerrar();
            this.listar(1,this.buscar);
            alertify.success('Registro Guardado');
        }).catch(err => {
          console.log(err);
        });
    },
    editar(){
        if(this.validar()){return;}
        axios.put("/usuarios/editar",{
          id: this.id,
          nombre: this.nombre,
          apellido: this.apellido,
          cedula: this.cedula,
          direccion: this.direccion,
          telefono: this.telefono,
          celular: this.celular,
          estado: this.estado,
          email: this.email,
          password: this.password
        }).then(res => {
          this.cerrar();
          this.listar(1,this.buscar);
          alertify.success('Registro Actualizado');
        }).catch(err => {
          console.log(err);
        });
    },
    cerrar(){
        this.abrirmodal=0;
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
                axios.delete("/usuarios/eliminar/"+id);
                this.listar(1,this.buscar);
                alertify.success('Registro Eliminado');
            }
        });
    },
    validar(){
        this.error = 0;
        this.errornombre = [];
        this.errorapellido = [];
        this.errorcedula = [];
        this.errortelefono = [];
        this.erroremail = [];
        this.errorpassword = [];
        this.errorrepassword = [];

        if(!this.nombre){
          this.errornombre.push("Ingrese su Nombre");
          this.error = 1;
        }
        if(!this.apellido){
          this.errorapellido.push("Ingrese su Apellido");
          this.error = 1;
        }
        if(!this.cedula){
          this.errorcedula.push("Ingrese su Cédula");
          this.error = 1;
        }
        if(!this.telefono){
          this.errortelefono.push("Ingrese su Telefono");
          this.error = 1;
        }
        if(!this.email){
          this.erroremail.push("Ingrese su Correo");
          this.error = 1;
        }
        if(this.tipomodal==2 && this.password){
          if(!this.password){
            this.errorpassword.push("Ingrese una contraseña");
            this.error = 1;
          }
          if(this.password != this.repassword){
            this.errorrepassword.push("Las contraseñas no coinciden");
            this.error = 1;
          }
        }
        if(this.tipomodal==1){
          if(!this.password){
            this.errorpassword.push("Ingrese una contraseña");
            this.error = 1;
          }
          if(this.password != this.repassword){
            this.errorrepassword.push("Las contraseñas no coinciden");
            this.error = 1;
          }
        }
        return this.error;
    },
            //funciones export archivos
        excel() {
            window.open("/usuario/excel", "_top");
                   },
                           pdf() {
            window.open("/usuario/pdf", "_top");
                   }
  },
  mounted() {
    this.listar(1, this.buscar);
  }
};
</script>
