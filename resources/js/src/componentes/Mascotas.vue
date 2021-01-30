<template>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-lg-12 justify-content-end">
                            <div
                                class="input-group mb-3"
                                style="width: 20em;float: right;"
                            >
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Buscar.."
                                    aria-describedby="basic-addon2"
                                    v-model="buscar"
                                    @keyup="listar(1, buscar)"
                                />
                                <div class="input-group-append">
                                    <span
                                        class="input-group-text"
                                        id="basic-addon2"
                                    >
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
                                    <th>Foto</th>
                                    <th>Nombre</th>
                                    <th>Especie</th>
                                    <th>Raza</th>
                                    <th>Sexo</th>
                                    <th>Peso</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody v-if="recupera.length">
                                <tr
                                    v-for="(tr, index) in recupera"
                                    :key="index"
                                >
                                    <td class="imagen-td cursor-pointer" @click="verimagen('/imagenes/mascotas/'+tr.imagen, tr.nombre)">
                                        <img :src="'/imagenes/mascotas/'+tr.imagen" class="imagen-tabla">
                                    </td>
                                    <td>{{ tr.nombre }}</td>
                                    <td>{{ tr.especie }}</td>
                                    <td>{{ tr.raza }}</td>
                                    <td>{{ tr.sexo }}</td>
                                    <td>{{ tr.peso }}</td>
                                    <td>
                                        <span class="estado-general" :class="{'text-verde':tr.estado == 'disponible', 'text-danger':tr.estado == 'adoptado'}"> {{ tr.estado }}</span>
                                    </td>
                                    <td class="pointer acciones">
                                        <i
                                            class="fa fa-eye"
                                            @click="ver(tr)"
                                        ></i>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else>
                                <tr>
                                    <td colspan="99">
                                        <div
                                            class="alert alert-warning text-center"
                                            role="alert"
                                        >
                                            SIN REGISTROS
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                                <li
                                    class="page-item"
                                    v-if="paginacion.current_page > 1"
                                >
                                    <a
                                        class="page-link"
                                        href="#"
                                        @click.prevent="
                                            cambiarPagina(
                                                paginacion.current_page - 1
                                            )
                                        "
                                        >&laquo;</a
                                    >
                                </li>
                                <li class="page-item" v-else>
                                    <a class="page-link" disabled>&laquo;</a>
                                </li>
                                <li
                                    class="page-item"
                                    v-for="page in pagesNumber"
                                    :key="page"
                                    :class="[page == isActived ? 'active' : '']"
                                >
                                    <a
                                        class="page-link"
                                        href="#"
                                        @click.prevent="cambiarPagina(page)"
                                        v-text="page"
                                    ></a>
                                </li>
                                <li
                                    class="page-item"
                                    v-if="
                                        paginacion.current_page <
                                            paginacion.last_page
                                    "
                                >
                                    <a
                                        class="page-link"
                                        href="#"
                                        @click.prevent="
                                            cambiarPagina(
                                                paginacion.current_page + 1
                                            )
                                        "
                                        >&raquo;</a
                                    >
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
        <!--Modal-->
        <div class="modal" :class="{ abrirmodal: abrirmodal }">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> {{ titulomodal }} </h5>
                        <button type="button" class="close" @click="cerrar()"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <form action>
                            <div class="row form-material">
                                <div class="col-xl-6 col-lg-6 col-md-12">
                                    <img :src="'/imagenes/mascotas/' + form.imagen" class="imagen-modal">
                                </div>
                                <div class="col-xl-6 col-lg-6 col-md-12">
                                    <div class="col-xl-12 col-lg-12 col-md-12">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Nombre:</label>
                                            <input type="text" class="form-control" v-model="form.nombre"/>
                                        </div>
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Especie:</label>
                                            <input type="text" class="form-control" v-model="form.especie"/>
                                        </div>
                                    </div>
                                    <div class="col-xl-12 col-lg-12 col-md-12">
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Raza:</label>
                                            <input type="text" class="form-control" v-model="form.raza"/>
                                        </div>
                                    </div>
                                    <div class="col-xl-12">
                                        <div class="row form-material">
                                            <div class="col-xl-6 col-lg-6 col-md-12">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Edad:</label>
                                                    <input type="text" class="form-control" v-model="form.edad"/>
                                                </div>
                                            </div>
                                            <div class="col-xl-6 col-lg-6 col-md-12">
                                                <div class="form-group">
                                                    <label for="exampleInputEmail1">Sexo:</label>
                                                    <input type="text" class="form-control" v-model="form.sexo"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Peso:</label>
                                        <input type="text" class="form-control" v-model="form.peso"/>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Talla:</label>
                                        <input type="text" class="form-control" v-model="form.talla"/>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Color:</label>
                                        <input type="text" class="form-control" v-model="form.color"/>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Esterilización:</label>
                                        <input type="text" class="form-control" v-model="form.esterilizacion"/>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Personalidad:</label>
                                        <input type="text" class="form-control" v-model="form.personalidad"/>
                                    </div>
                                </div>
                                <div class="col-xl-5 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Albergue:</label>
                                        <select class="form-control">
                                            <option v-for="tr in albergue_lista" :key="tr.id_albergue" :value="tr.id_albergue"> {{ tr.nombre }} </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Estado:</label>
                                        <input type="text" class="form-control" v-model="form.estado"/>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Salud:</label>
                                        <textarea rows="4" class="form-control" v-model="form.salud_cuidados"></textarea>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Información adicional:</label>
                                        <textarea rows="4" class="form-control" v-model="form.informacion_adicional"></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrar()">
                            Cerrar
                        </button>
                        <button type="button" class="btn btn-primary" @click="adoptar(form.id_mascota)">
                            Adoptar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" :class="{ abrirmodal: abrirmodalimagen }">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel"> Foto de <b>{{ vista_imagen_nombre }}</b> </h5>
                        <button type="button" class="close" @click="cerrar()"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body">
                        <img :src="vista_imagen" class="w-100">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="cerrar()">
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
var moment = require("moment");
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
            offset: 3,
            abrirmodal: 0,
            titulomodal: "",
            tipomodal: null,
            error: 0,
            id: 0,
            form:{
                id_mascota: null,
                nombre: null,
                especie: null,
                raza: null,
                edad: null,
                sexo: null,
                peso: null,
                talla: null,
                color: null,
                esterilizacion: null,
                personalidad: null,
                salud_cuidados: null,
                informacion_adicional: null,
                estado: null,
                id_albergue: null,
                imagen: null,
            },
            albergue_lista:[],
            vista_imagen: '',
            abrirmodalimagen: false,
            vista_imagen_nombre: ''
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
        }
    },
    methods: {
        // No mover obligatorios
        cambiarPagina(page) {
            this.paginacion.current_page = page;
            this.listar(page, this.buscar);
        },
        //metodos cambiantes
        listar(pagina, buscar) {
            axios
                .get("/mascotas/listar?buscar=" + buscar + "&page=" + pagina)
                .then(res => {
                    this.recupera = res.data.datos.data;
                    this.paginacion = res.data.paginacion;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        ver(tr) {
            this.titulomodal = "Ficha Animal de " + tr.nombre;
            this.abrirmodal = 1;
            this.tipomodal = 1;
            this.form = tr;
        },
        cerrar() {
            this.abrirmodal = false;
            this.abrirmodalimagen = false;
        },
        adoptar(id){
            console.log(id);
            this.$router.push("/adopciones/"+id);
        },
        albergue(){
            axios.get("/albergue/listar/general").then( ({data}) => {
                this.albergue_lista = data;
            }).catch( error => {
                console.log(error);
            });
        },
        verimagen(imagen, nombre){
            this.vista_imagen = imagen;
            this.abrirmodalimagen = true;
            this.vista_imagen_nombre = nombre;
        }
    },
    mounted() {
        this.listar(1, this.buscar);
        this.albergue();
    }
};
</script>
<style>
    .imagen-tabla{
        width: 50px;
        border-radius: 69px;
        height: 50px;
        border: 1px solid #3e3e3e;
    }
    .imagen-td{
        padding: 5px 0!important;
        margin: 0px;
        width: 60px;
    }
    td{
        vertical-align: middle!important;
    }
    .acciones{
        width: 60px;
    }
    .imagen-modal{
        width: 100%;
        max-height: 325px;
        border-radius: 8px;
        border:1px solid #3e3e3e;
        box-shadow: 7px 6px 10px;
    }
    label {
        display: inline-block;
        margin-bottom: .1rem!important;
    }
    .text-verde {
        color: #28a745!important;
    }
    .estado-general{
        text-transform: capitalize;
        color:orange;
    }
</style>
