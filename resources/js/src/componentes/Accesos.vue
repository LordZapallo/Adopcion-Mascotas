<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-lg-8 col-md-12 justify-content-end">
              <div class="row">
                <div class="col-lg-6">
                  <div class="input-group mb-3">
                    <span class="mt-2 mr-2">Usuario</span>
                    <select class="form-control" v-model="buscar">
                      <option v-for="tr in recupera" :key="tr.id" :value="tr.id"> {{ tr.nombre }} {{ tr.apellido }} </option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="input-group mb-3">
                    <span class="mt-2 mr-2">Menú</span>
                    <select class="form-control" v-model="modulo" @change="cargar()">
                      <option v-for="tr in menus" :key="tr.id" :value="tr.nombre"> {{ tr.nombre }} </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>N° Menú</th>
                  <th>Menú</th>
                  <th>Módulo</th>
                  <th style="width:1em;">Autorizar</th>
                </tr>
              </thead>
              <tbody v-if="tabla.length">
                <tr v-for="(tr,index) in tabla" :key="index">
                  <td>{{tr.id}}</td>
                  <td>{{modulo}}</td>
                  <td>{{tr.nombre}}</td>
                  <td> 
                    <div class="form-check">
                      <input type="checkbox" :name="tr.id" :id="tr.id" class="form-check-input" style="display: none;" :value="tr.id" v-model="tr.estado"> 
                      <label :for="tr.id" class="form-check-label">
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4">
          <button class="btn btn-primary" @click="guardar()">Guardar</button>
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
        buscar:1,
        modulo:"ADMINISTRACION",
        resultado:"",
        tabla:[1,1,1,1,1,1,1,1,1],
        menus:[
          {
            id:1,
            nombre:"ADMINISTRACION",
          },
          {
            id:2,
            nombre:"RECEPCION",
          },
          {
            id:3,
            nombre:"ENFERMERIA",
          },
          {
            id:4,
            nombre:"SEGUIMIENTO",
          }
        ],
        administracion:[
          {
            id:1,
            nombre:"FICHA USUARIO",
            estado:true
          },
          {
            id:2,
            nombre:"ACCESO USUARIO",
            estado:true
          },
          {
            id:3,
            nombre:"AUDITORIA",
            estado:true
          },
        ],
        recepcion:[
          {
            id:4,
            nombre:"PACIENTE",
            estado:true
          },
          {
            id:5,
            nombre:"TURNO",
            estado:true
          }
        ],
        enfermeria:[
          {
            id:6,
            nombre:"ATENCION",
            estado:true
          },
          {
            id:7,
            nombre:"TRIAJE",
            estado:true
          }
        ],
        seguimiento:[
          {
            id:8,
            nombre:"RESULTADOS",
            estado:true
          },
          {
            id:9,
            nombre:"ACT. INFORMACIÓN",
            estado:true
          },
          {
            id:10,
            nombre:"RECETA",
            estado:true
          }
        ],
    };
  },
  methods: {
    listar(buscar) {
      axios.get("/accesos/listar").then(res => {
        this.recupera = res.data;
        this.buscar = this.recupera[0].id;
      }).catch(err => {
        console.log(err);
      });
    },
    cargar(){
      if(this.modulo == "ADMINISTRACION"){
        this.tabla = this.administracion;
      }else if(this.modulo == "RECEPCION"){
        this.tabla = this.recepcion;
      }else if(this.modulo == "ENFERMERIA"){
        this.tabla = this.enfermeria;
      }else{
        this.tabla = this.seguimiento;
      }
    },
    guardar(){
      this.resultado = this.administracion[0].estado + "," +  this.administracion[1].estado + "," + this.administracion[2].estado + "," + this.recepcion[0].estado + "," + this.recepcion[1].estado + "," + this.enfermeria[0].estado + "," + this.enfermeria[1].estado + "," + this.seguimiento[0].estado + "," + this.seguimiento[1].estado + "," + this.seguimiento[2].estado;
      axios.post("/accesos/guardar/"+this.buscar, {valor:this.resultado}).then( res => {
        alertify.success('Asignación realizada exitosamente');
        setTimeout(() => {
          location.reload();
        }, 2000);
      }).catch( err => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.listar();
    this.cargar();
  }
};
</script>
