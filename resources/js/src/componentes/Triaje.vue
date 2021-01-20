<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row mb-2">
                        <div class="col-xl-6 col-lg-12 justify-content-end clicker">
                        <div class="input-group mb-3" style="width: 100%;">
                            <input type="text" class="form-control" placeholder="Buscar Pacientes para crear consulta..." aria-describedby="basic-addon2"  v-model="buscar" @keyup="listar(buscar)"/>
                            <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">
                                <i class="fas fa-search"></i>
                            </span>
                            </div>
                        </div>
                            <div class="menuescoger" v-if="buscar">
                                <template v-if="pacientes.length">
                                    <ul v-for="(tr,index) in pacientes" :key="index" @click="abrir(tr)">
                                        <li>
                                            <span style="font-weight: bold;font-size: 15px;">{{tr.TTJV_PersonaNombres}} {{tr.TTJV_PersonaApePaterno}} {{tr.TTJV_PersonaApeMaterno}}</span>
                                            <span class="posicion">
                                                <template v-if="tr.TTJV_PersonaIdentificacion"><span>Cédula:  {{tr.TTJV_PersonaIdentificacion}} </span> | </template>
                                                <template v-if="tr.TTJV_PersonaTelefono"><span>Teléfono:  {{tr.TTJV_PersonaTelefono}} </span> | </template>
                                                <template v-else-if="tr.TTJV_PersonaCelular"><span>Celular: {{tr.TTJV_PersonaCelular}} </span> | </template>
                                                <template v-if="tr.TTJV_PersonaSexo"><span>Género: {{tr.TTJV_PersonaSexo}}</span> </template>
                                            </span>
                                        </li>
                                    </ul>
                                </template>
                                <template v-else>
                                    <ul style="padding: 7px;text-align: center;">
                                        <li>
                                            ESTE PACIENTE NO EXISTE EN NUESTROS REGISTROS O YA FUE REGISTRADO EN RESULTADOS
                                        </li>
                                    </ul>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="row" v-if="id==0">
                        <div class="col-xl-12 col-lg-12 col-md-12">
                            <div class="alert alert-info text-center" role="alert">
                                DEBES ESCOGER UN PACIENTE PARA CREAR UNA CONSULTA
                            </div>
                        </div>
                    </div>
                    <div class="row" v-else>
                        <div class="alert alert-warning text-center mb-4 w-100" role="alert" v-show="edad">
                            ESTE ES UNA ATENCIÓN DE NIÑOS
                        </div>
                        <vs-divider class="estilotitulo">
                            DATOS DE USUARIO
                        </vs-divider>
                        <div class="col-12">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-12">
                                    <vs-list>
                                        <vs-list-item title="Nombres completos" v-bind:subtitle="rp.nombrescompletos"></vs-list-item>
                                        <vs-list-item title="Teléfono" v-if="rp.TTJV_PersonaTelefono" v-bind:subtitle="rp.TTJV_PersonaTelefono"></vs-list-item>
                                        <vs-list-item title="Celular" v-else v-bind:subtitle="rp.TTJV_PersonaCelular"></vs-list-item>
                                        <vs-list-item title="Dirección" v-bind:subtitle="rp.TTJV_PersonaDireccion"></vs-list-item>
                                    </vs-list>
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-12">
                                    <vs-list>
                                        <vs-list-item title="Número de cédula" v-bind:subtitle="rp.TTJV_PersonaIdentificacion"></vs-list-item>
                                        <vs-list-item title="Sexo" v-bind:subtitle="rp.TTJV_PersonaSexo"></vs-list-item>
                                        <vs-list-item title="Fecha de nacimiento" v-bind:subtitle="rp.TTJV_PersonaFhr | fecha"></vs-list-item>
                                    </vs-list>
                                </div>
                            </div>
                        </div>
                        <!--Cuerpo de la consulta-->
                        <vs-divider class="mt-5 estilotitulo">
                            DATOS GENERALES
                        </vs-divider>
                        <div class="col-xl-4 col-lg-6 col-md-12  mt-4" :class="{'col-xl-6':!caso}">
                            <label>Caso de consulta</label>
                            <select class="form-control" v-model="caso" @change="listarmotivos(caso),motivo=''">
                                <option value="">Seleccione un Caso</option>
                                <option :value="tr.TTJV_id_caso" v-for="(tr,index) in casos" :key="index" v-text="tr.TTJV_nombre"></option>
                            </select>
                            <div v-show="error">
                                <div class="invalid-feedback" style="display:block;" v-for="err in errorcaso" :key ="err">{{err}}</div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-6 col-md-12  mt-4" v-if="caso">
                            <label>Motivo de consulta</label>
                            <select  class="form-control" v-model="motivo">
                                <option value="">Seleccione un Motivo</option>
                                <option :value="tr.TTJV_id_motivo_consulta" v-for="(tr,index) in motivos" :key="index" v-text="tr.TTJV_nombre"></option>
                            </select>
                            <div v-show="error">
                                <div class="invalid-feedback" style="display:block;" v-for="err in errormotivo" :key ="err">{{err}}</div>
                            </div>
                        </div>
                        <div class="col-xl-4 col-lg-6 col-md-12  mt-4" :class="{'col-xl-6':!caso}">
                            <label>Politraumatismo</label>
                            <select  class="form-control" v-model="politraumatismo">
                                <option value="">Seleccione Politraumatismo</option>
                                <option :value="tr.TTJV_id_politraumatismo" v-for="(tr,index) in politraumatismos" :key="index" v-text="tr.TTJV_nombre"></option>
                            </select>
                        </div>
                        <div class="col-xl-12 mt-4">
                            <label>Observación</label>
                            <textarea class="form-control" rows="3" v-model="observacion"></textarea>
                        </div>
                        <div class="col-xl-12">
                            <div class="row">
                                <div class="col-xl-12 col-sm-12">
                                    <vs-divider class="mt-5 estilotitulo tituloflex">
                                        SIGNOS VITALES  
                                        <vs-switch class="ml-3" v-model="embarazada">
                                            <span slot="on">Paciente embarazada</span>
                                            <span slot="off">Paciente embarazada</span>
                                        </vs-switch>
                                    </vs-divider>
                                    <div class="col-xl-12">
                                        <div class="row justify-content-md-center">
                                            <div class="col-xl-3 col-lg-6 col-md-12  mt-4" v-if="!embarazada">
                                                <label>Presion arterial</label>
                                                <input type="text" class="form-control" v-model="presion" onkeypress="return solonumeros(event)" maxlength="3"> 
                                                <div v-show="error">
                                                    <div class="invalid-feedback" style="display:block;" v-for="err in errorpresion" :key ="err">{{err}}</div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-12  mt-4">
                                                <label>Frecuencia Cardiaca(Pulso)</label>
                                                <input type="text" class="form-control" v-model="frecuenciac" onkeypress="return solonumeros(event)" maxlength="3"> 
                                                <div v-show="error">
                                                    <div class="invalid-feedback" style="display:block;" v-for="err in errorfrecuenciac" :key ="err">{{err}}</div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-12  mt-4">
                                                <label>Temperatura Corporal</label>
                                                <input type="text" class="form-control" v-model="temperatura" onkeypress="return solonumeros(event)" maxlength="3"> 

                                                <div v-show="error">
                                                    <div class="invalid-feedback" style="display:block;" v-for="err in errortemperatura" :key ="err">{{err}}</div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-12  mt-4">
                                                <label>Frecuencia Ventilatoria</label>
                                                <input type="text" class="form-control" v-model="frecuenciav" onkeypress="return solonumeros(event)" maxlength="3"> 
                                                <div v-show="error">
                                                    <div class="invalid-feedback" style="display:block;" v-for="err in errorfrecuenciav" :key ="err">{{err}}</div>
                                                </div>
                                            </div>
                                            <div class="col-xl-3 col-lg-6 col-md-12  mt-4" v-if="embarazada">
                                                <label>Presión Sistólica</label>
                                                <input type="text" class="form-control" v-model="presion" onkeypress="return solonumeros(event)" maxlength="3"> 
                                                <div v-show="error">
                                                    <div class="invalid-feedback" style="display:block;" v-for="err in errorpresion" :key ="err">{{err}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-12 col-sm-12">
                                    <vs-divider class="mt-5 estilotitulo">
                                        ESCALA DE GLASOW
                                    </vs-divider>
                                    <div class="col-xl-12 col-lg-12 col-md-12  mt-4">
                                        <label>Respuesta apertura ocular</label>
                                        <div class="col-xl-12">
                                            <div class="row">
                                                <div class="col">
                                                    <vs-radio v-model="ocular" vs-name="ocular" class="mr-2" vs-value="4">Espontanea</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="ocular" vs-name="ocular" class="mr-2" vs-value="3">A órdenes verbales</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="ocular" vs-name="ocular" class="mr-2" vs-value="2">A estímulo doloroso</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="ocular" vs-name="ocular" class="mr-2" vs-value="1">No hay respuesta</vs-radio>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-show="error">
                                            <div class="invalid-feedback" style="display:block;" v-for="err in errorocular" :key ="err">{{err}}</div>
                                        </div>
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12  mt-4">
                                        <label>Respuesta verbal</label>
                                        <div class="col-xl-12">
                                            <div class="row">
                                                <div class="col">
                                                    <vs-radio v-model="verbal" vs-name="verbal" class="mr-2" vs-value="5">Orientada</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="verbal" vs-name="verbal" class="mr-2" vs-value="4">Confusa</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="verbal" vs-name="verbal" class="mr-2" vs-value="3">Palabras inapropiadas</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="verbal" vs-name="verbal" class="mr-2" vs-value="2">Sonidos incomprensibles</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="verbal" vs-name="verbal" class="mr-2" vs-value="1">No hay respuesta</vs-radio>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-show="error">
                                            <div class="invalid-feedback" style="display:block;" v-for="err in errorverbal" :key ="err">{{err}}</div>
                                        </div>
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12  mt-4">
                                        <label>Mejor respuesta motora</label>
                                        <div class="col-xl-12">
                                            <div class="row">
                                                <div class="col">
                                                    <vs-radio v-model="motora" vs-name="motora" class="mr-2" vs-value="6">Obedece órdenes</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="motora" vs-name="motora" class="mr-2" vs-value="5">Localiza el dolor</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="motora" vs-name="motora" class="mr-2" vs-value="4">Retira el dolor</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="motora" vs-name="motora" class="mr-2" vs-value="3">Flexión anormal</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="motora" vs-name="motora" class="mr-2" vs-value="2">Respuesta en extensión</vs-radio>
                                                </div>
                                                <div class="col">
                                                    <vs-radio v-model="motora" vs-name="motora" class="mr-2" vs-value="1">No movimientos</vs-radio>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-show="error">
                                            <div class="invalid-feedback" style="display:block;" v-for="err in errormotora" :key ="err">{{err}}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <vs-divider class="mt-6 estilotitulo">
                            RESULTADOS
                        </vs-divider>
                        <div class="col-xl-12 mt-5 text-center">
                            <h1>EL RESULADO ES: <span :style="'color:'+color[1]">EMERGENCIA DE COLOR {{color[0]}}</span></h1>
                        </div>
                        <div class="col-xl-12 mt-5">
                            <div class="row">
                                <button class="btn btn-primary w-100" @click="guardar()">Guardar</button>
                            </div>
                        </div>
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
        buscar: "",
        error:0,
        id:0,
        ida:0,
        idt:0,
        pacientes:[],
        rp:{},
        edad:0,
        embarazada:0,

        caso:"",
        motivo:"",
        politraumatismo:"",
        observacion:"",

        ocular:4,
        verbal:5,
        motora:6,

        presion:"",
        frecuenciac:"",
        temperatura:"",
        frecuenciav:"",
        sistolica:"",

        casos:[],
        motivos:[],
        politraumatismos:[],

        errorcaso:[],
        errormotivo:[],
        errorpresion:[],
        errorfrecuenciac:[],
        errortemperatura:[],
        errorfrecuenciav:[],
        errorocular:[],
        errorverbal:[],
        errormotora:[],
        errorsistolica:[],
    }
  },
  filters:{
    fecha(data){
      return moment(data).format('LL');
    },
    fechayhora(data){
      return moment(data).format('LLL');
    }
  },
  computed: {
    color(){
        let color = 5;
        let valor = 15;
        let presionm = 0;
        let frecuenciam = 0;
        let temperaturam = 0;
        let frecuenciavm = 0;
        let ceb = 0;
        let resultado = "Azul";
        let tipo = "blue";
        if(this.politraumatismo){
            let valor = parseInt(this.ocular) + parseInt(this.verbal) + parseInt(this.motora);
            if(valor==15){
                color = 5;
            }else if(valor>=13 && valor<=14){
                color = 4;
            }else if(valor>=9 && valor<=12){
                color = 3;
            }else if(valor>=5 && valor<=8){
                color = 2;
            }else{
                color = 1;
            }
            //signos vitales
            if(this.presion>200){
                presionm = 0;
            }else if(this.presion<70){
                presionm =2;    
            }else if((this.presion>=71 && this.presion<=80) || (this.presion>=101 && this.presion<=199)){
                presionm = 3;
            }else if(this.presion>=81 && this.presion<=100){
                presionm = 5;
            }else if(this.presion < 1){
                presionm = 5;
            }

            if(this.frecuenciac>=30){
                frecuenciam = 0;
            }else if((this.frecuenciac<=8) || (this.frecuenciac>=21 && this.frecuenciac<=29)){
                frecuenciam =2;    
            }else if(this.frecuenciac>=15 && this.frecuenciac<=20){
                frecuenciam = 3;
            }else if(this.frecuenciac>=9 && this.frecuenciac<=14){
                frecuenciam = 5;
            }else if(this.frecuenciac < 1){
                frecuenciam = 5;
            }

            if(this.temperatura>=38.6){
                temperaturam = 0;
            }else if(this.temperatura<=35){
                temperaturam =2;    
            }else if((this.temperatura>=35.1 && this.temperatura<=36) || (this.temperatura>=38 && this.temperatura<=38.5)){
                temperaturam = 3;
            }else if(this.temperatura>=36.1 && this.temperatura<=37.9){
                temperaturam = 5;
            }else if(this.temperatura < 1){
                temperaturam = 5;
            }

            if(this.frecuenciav>=131){
                frecuenciavm = 0;
            }else if((this.frecuenciav<=40) || (this.frecuenciav>=111 && this.frecuenciav<=130)){
                frecuenciavm =2;    
            }else if((this.frecuenciav>=41 && this.frecuenciav<=50) || (this.frecuenciav>=101 && this.frecuenciav<=110)){
                frecuenciavm = 3;
            }else if(this.frecuenciav>=51 && this.frecuenciav<=100){
                frecuenciavm = 5;
            }else if(this.frecuenciav < 1){
                frecuenciavm = 5;
            }
            var suma = parseInt(presionm) + parseInt(frecuenciam) + parseInt(temperaturam) + parseInt(frecuenciavm);
            var div =parseFloat(suma)/4;
            console.log(div);
            ceb = Math.floor(div);
            if(ceb<=1){
                ceb=1;
            }
            if(color>=2){
                color=2;
            }
        }else{

            let valor = parseInt(this.ocular) + parseInt(this.verbal) + parseInt(this.motora);
            if(valor==15){
                color = 5;
            }else if(valor>=13 && valor<=14){
                color = 4;
            }else if(valor>=9 && valor<=12){
                color = 3;
            }else if(valor>=5 && valor<=8){
                color = 2;
            }else{
                color = 1;
            }

            //signos vitales
            if(this.presion>200){
                presionm = 0;
            }else if(this.presion<70){
                presionm =2;    
            }else if((this.presion>=71 && this.presion<=80) || (this.presion>=101 && this.presion<=199)){
                presionm = 3;
            }else if(this.presion>=81 && this.presion<=100){
                presionm = 5;
            }else if(this.presion < 1){
                presionm = 5;
            }

            if(this.frecuenciac>=30){
                frecuenciam = 0;
            }else if((this.frecuenciac<=8) || (this.frecuenciac>=21 && this.frecuenciac<=29)){
                frecuenciam =2;    
            }else if(this.frecuenciac>=15 && this.frecuenciac<=20){
                frecuenciam = 3;
            }else if(this.frecuenciac>=9 && this.frecuenciac<=14){
                frecuenciam = 5;
            }else if(this.frecuenciac < 1){
                frecuenciam = 5;
            }

            if(this.temperatura>=38.6){
                temperaturam = 0;
            }else if(this.temperatura<=35){
                temperaturam =2;    
            }else if((this.temperatura>=35.1 && this.temperatura<=36) || (this.temperatura>=38 && this.temperatura<=38.5)){
                temperaturam = 3;
            }else if(this.temperatura>=36.1 && this.temperatura<=37.9){
                temperaturam = 5;
            }else if(this.temperatura < 1){
                temperaturam = 5;
            }

            if(this.frecuenciav>=131){
                frecuenciavm = 0;
            }else if((this.frecuenciav<=40) || (this.frecuenciav>=111 && this.frecuenciav<=130)){
                frecuenciavm =2;    
            }else if((this.frecuenciav>=41 && this.frecuenciav<=50) || (this.frecuenciav>=101 && this.frecuenciav<=110)){
                frecuenciavm = 3;
            }else if(this.frecuenciav>=51 && this.frecuenciav<=100){
                frecuenciavm = 5;
            }else if(this.frecuenciav < 1){
                frecuenciavm = 5;
            }
            var suma = parseInt(presionm) + parseInt(frecuenciam) + parseInt(temperaturam) + parseInt(frecuenciavm);
            var div =parseFloat(suma)/4;
            console.log(div);
            ceb = Math.floor(div);
            if(ceb<=1){
                ceb=1;
            }
            //resultado almacenado en la variable de color
            if(parseFloat(ceb)<color){
                color = ceb;
            }
        }
        if(color==1){
            resultado = "ROJO";
            tipo = "red";
        }else if(color==2){
            resultado = "NARANJA";
            tipo = "orange";
        }else if(color==3){
            resultado = "AMARILLO";
            tipo = "yellow";
        }else if(color==4){
            resultado = "VERDE";
            tipo = "green";
        }else{
            resultado = "AZUL";
            tipo = "blue";
        }
        return [resultado,tipo,color];
    }
  },
  methods: {
    listar(buscar) {
        $(".menuescoger").show();
        if(buscar){
            axios.get("/triaje/listar?buscar=" + buscar).then(res => {
                this.pacientes = res.data;
                this.existe=1;
            });
        }else{
            this.pacientes = [];
        }
    },
    listarcasos(){
        axios.get("/triaje/listarcasos").then(res => {
            this.casos = res.data;
        });
    },
    listarmotivos(id){
        axios.get("/triaje/listarmotivos/"+id).then(res => {
            this.motivos = res.data;
        });
    },
    listarpolitraumatismos(){
        axios.get("/triaje/listarpolitraumatismos").then(res => {
            this.politraumatismos = res.data;
        });
    },
    abrir(tr){
        this.id = tr.TTJV_id_persona;
        this.ida = tr.TTJV_id_atencion;
        this.idt = tr.TTJV_id_turnos;
        this.rp = tr;
        this.buscar = tr.nombrescompletos;
        var valor = tr.TTJV_PersonaFchNacimiento;
        var edad = moment(moment(valor).format("YYYYMMDD"), "YYYYMMDD").fromNow();
        var element   = edad.match(/\d+/);
        if(element<18){
            this.edad = 1;
        }else{
            this.edad = 0;
        }
        $(".menuescoger").hide();
    },
    validar(){
        this.error = 0;
        this.errorcaso = [];
        this.errormotivo = [];
        this.errorpresion = [];
        this.errorfrecuenciac = [];
        this.errortemperatura = [];
        this.errorfrecuenciav = [];
        this.errorocular = [];
        this.errorverbal = [];
        this.errormotora = [];
        this.errorsistolica = [];

        if(!this.caso){
            this.errorcaso.push("Ingresar caso");
            this.error = 1;
        }
        if(!this.motivo){
            this.errormotivo.push("Ingresar motivo");
            this.error = 1;
        }
        if(!this.presion){
            this.errorpresion.push("Ingresar presión arterial");
            this.error = 1;
        }
        if(!this.frecuenciac){
            this.errorfrecuenciac.push("Ingresar fecuencia cardiaca");
            this.error = 1;
        }
        if(!this.temperatura){
            this.errortemperatura.push("Ingresar temperatura corporal");
            this.error = 1;
        }
        if(!this.frecuenciav){
            this.errorfrecuenciav.push("Ingresar frecuencia ventilatoria");
            this.error = 1;
        }
        if(!this.politraumatismo){
            if(!this.ocular){
                this.errorocular.push("Ingresar Respuesta apertura ocular");
                this.error = 1;
            }
            if(!this.verbal){
                this.errorverbal.push("Ingresar Respuesta verbal");
                this.error = 1;
            }
            if(!this.motora){
                this.errormotora.push("Ingresar Mejor respuesta motora");
                this.error = 1;
            }
        }
        if(this.error==1){
            setTimeout(() => {
                var valor = $(".invalid-feedback:first-child").offset().top - 200;
                $("html, body").animate({
                    scrollTop: valor,
                }, 500);
            }, 50);
        }
        return this.error;
    },
    guardar(){
        if(this.validar()){return;}
        axios.post("/triaje/guardar",{
            id:this.id,
            ida:this.ida,
            idt:this.idt,
            caso:this.caso,
            motivo:this.motivo,
            politraumatismo:this.politraumatismo,
            observacion:this.observacion,
            ocular:this.ocular,
            verbal:this.verbal,
            motora:this.motora,
            presion:this.presion,
            frecuenciac:this.frecuenciac,
            temperatura:this.temperatura,
            frecuenciav:this.frecuenciav,
            color: this.color[2],
        }).then(res => {
            this.id = 0;
            alertify.success('Triaje Creado exitosamente');
            this.$router.push("/resultados");
        });
    }
  },
  mounted(){
      this.listarcasos();
      this.listarpolitraumatismos();
  }
}
</script>
<style>
    .asqui .vs-divider-background-default{
        display:flex;
    }
    .swt .vs-switch--input{
        left: 0px;
    }
    .cursor-pointer{
        cursor: pointer;
    }
    .colob{
        color: #1f74ff!important;
    }
    .borradoarray{
        position: absolute;
        right: 15px;
        top: 42px;
        display: none;
    }
    .invarray:hover  .borradoarray{
        display: block;
    }
    .tituloflex .vs-divider--text{
        display: flex;
    }
</style>
