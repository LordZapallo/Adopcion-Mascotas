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
                                    <th>No. Adopción</th>
                                    <th>Fecha de Emision</th>
                                    <th>Fexa de Expiración</th>
                                    <th>Mascota</th>
                                    <th>Albergue</th>
                                    <th>Estado Adopción</th>
                                </tr>
                            </thead>
                            <tbody v-if="recupera.length">
                                <tr
                                    v-for="(tr, index) in recupera"
                                    :key="index"
                                >
                                    <td>{{ tr.id_adopcion }}</td>
                                    <td>{{ tr.fecha_emision }}</td>
                                    <td>{{ tr.fecha_finalizacion }}</td>
                                    <td>{{ tr.nombre_mascota }}</td>
                                    <td>{{ tr.nombre_albergue }}</td>
                                    <td>
                                        <span
                                            class="estado-general"
                                            :class="{
                                                'text-verde':
                                                    tr.estado ==
                                                    'Adopción Aprobada',
                                                'text-danger':
                                                    tr.estado ==
                                                    'Adopción Rechazada'
                                            }"
                                        >
                                            {{ tr.estado }}</span
                                        >
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
        <!-- MODAL-->
        <div class="modal" :class="{ abrirmodal: modal.estado }">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">
                            {{ modal.titulo }}
                        </h5>
                        <button type="button" class="close" @click="cerrar()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row form-material">
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <img
                                    :src="
                                        '/imagenes/mascotas/' + mascota.imagen
                                    "
                                    class="imagen-modal1"
                                />
                            </div>
                            <div class="col-xl-3 col-lg-3 col-md-3">
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="label-input"
                                            >Nombre: {{ mascota.nombre }}</label
                                        >
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="label-input"
                                            >Edad: {{ mascota.edad }}</label
                                        >
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="label-input"
                                            >Sexo: {{ mascota.sexo }}</label
                                        >
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-5 col-lg-5 col-md-5">
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="label-input"
                                            >Albergue:
                                            {{ albergue.nombre }}</label
                                        >
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="label-input"
                                            >Dirección:
                                            {{ albergue.ubicacion }}</label
                                        >
                                    </div>
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="label-input"
                                            >Identificación:
                                            {{ albergue.identificacion }}</label
                                        >
                                    </div>
                                </div>
                            </div>
                            <vs-divider class="divider"> </vs-divider>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Fecha Emisión:</label
                                    >
                                    <input
                                        disabled
                                        type="date"
                                        class="form-control"
                                        placeholder="Buscar.."
                                        aria-describedby="basic-addon2"
                                        v-model="ficha.fecha_emision"
                                    />
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Fecha Finalización:</label
                                    >
                                    <input
                                        disabled
                                        type="date"
                                        class="form-control"
                                        placeholder="Buscar.."
                                        aria-describedby="basic-addon2"
                                        v-model="ficha.fecha_finalizacion"
                                    />
                                </div>
                            </div>
                            <vs-divider class="divider">
                                Referencia Personal
                            </vs-divider>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="form-group">
                                    <label class="label-input">Nombre:</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="
                                            ficha.referencia_personal_nombre
                                        "
                                    />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Parentesco:</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="
                                            ficha.referencia_personal_parentesco
                                        "
                                    />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="form-group">
                                    <label class="label-input">Teléfono:</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="
                                            ficha.referencia_personal_telefono
                                        "
                                    />
                                </div>
                            </div>
                            <vs-divider class="divider">
                                Información de Hogar
                            </vs-divider>
                            <div class="col-xl-3 col-lg-3 col-md-3">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Número de Familiares:</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="ficha.familiares_numero"
                                    />
                                </div>
                            </div>
                            <div class="col-xl-9 col-lg-9 col-md-9">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Algun Familiar Tiene Enfermedades
                                        Relevantes:</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="ficha.familiares_enfermedad"
                                    />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Tipo de Domicilio:</label
                                    >
                                    <select
                                        class="form-control"
                                        v-model="ficha.domicilio_tipo"
                                    >
                                        <option value="Casa">Casa</option>
                                        <option value="Departamento"
                                            >Departamento</option
                                        ><option value="Otro">Otro</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Estatus de Domicilio:</label
                                    >
                                    <select
                                        class="form-control"
                                        v-model="ficha.domicilio_estatus"
                                    >
                                        <option value="Propio">Propio</option>
                                        <option value="Arrendado"
                                            >Arrendado</option
                                        >
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Tamaño (Metros Cuadrados):</label
                                    >
                                    <select
                                        class="form-control"
                                        v-model="ficha.domicilio_metros"
                                    >
                                        <option value=" - 10">- 10</option>
                                        <option value=" - 20">- 20</option>
                                        <option value=" - 30">- 30</option>
                                        <option
                                            value=" + 3
                                        0"
                                            >+ 30</option
                                        >
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12">
                                <label class="label-input"
                                    >¿Por que desea adoptar?</label
                                >
                                <textarea
                                    class="form-control"
                                    rows="2"
                                    v-model="ficha.porque_adoptar"
                                ></textarea>
                            </div>
                            <vs-divider class="divider">
                                Cuidados de Mascota
                            </vs-divider>
                            <div class="col-xl-3 col-lg-3 col-md-3">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Tipo de Comida:</label
                                    >
                                    <select
                                        class="form-control"
                                        v-model="ficha.tipo_comida_mascota"
                                    >
                                        <option value="Casera">Casera</option>
                                        <option value="Croquetas"
                                            >Croquetas</option
                                        >
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-5 col-lg-5 col-md-5">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Responsable de Gastos de
                                        Mascota:</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="
                                            ficha.responsable_gastos_mascota
                                        "
                                    />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Gasto Estimado Mensual:</label
                                    >
                                    <input
                                        type="text"
                                        class="form-control"
                                        v-model="ficha.gasto_estimado_mensual"
                                    />
                                </div>
                            </div>
                            <div
                                class="row form-material"
                                style="margin:auto; margin-bottom: 2%;"
                            >
                                <div class="col-xl-10 col-lg-10 col-md-10">
                                    <label class="label-input"
                                        >¿Acepta a tener visitas de
                                        supervisión?</label
                                    >
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-2">
                                    <select
                                        class="form-control"
                                        v-model="ficha.tipo_comida_mascota"
                                    >
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                            <div
                                class="row form-material"
                                style="margin:auto; margin-bottom: 2%;"
                            >
                                <div class="col-xl-10 col-lg-10 col-md-10">
                                    <label class="label-input"
                                        >¿Planea Esterilizar a su
                                        mascota?</label
                                    >
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-2">
                                    <select
                                        class="form-control"
                                        v-model="ficha.esterilizacion"
                                    >
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                            <div
                                class="row form-material"
                                style="margin:auto; margin-bottom: 2%;"
                            >
                                <div class="col-xl-10 col-lg-10 col-md-10">
                                    <label class="label-input"
                                        >¿La adopción será compartida?</label
                                    >
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-2">
                                    <select
                                        class="form-control"
                                        v-model="ficha.adopcion_compartida"
                                    >
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12">
                                <label class="label-input"
                                    >Observaciones o Inquitudes
                                    Adicionales:</label
                                >
                                <textarea
                                    class="form-control"
                                    rows="2"
                                    v-model="ficha.observaciones"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="cancelar()"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            class="btn btn-success"
                            @click="guardar()"
                        >
                            Enviar Ficha de Adopción
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
var moment = require("moment");
moment.locale("es");
export default {
    data() {
        return {
            //tabla
            buscar: "",
            recupera: [],
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
            //modal
            modal: {
                titulo: "Ficha de Adopción Animal",
                estado: false
            },
            usuario: [],
            mascota: [],
            albergue: [],
            ficha: {
                fecha_emision: moment().format("YYYY-MM-DD"),
                fecha_finalizacion: moment().format("YYYY-MM-DD"),
                referencia_personal_nombre: "",
                referencia_personal_parentesco: "",
                referencia_personal_telefono: "",
                familiares_numero: "",
                familiares_enfermedad: "",
                domicilio_tipo: "",
                domicilio_estatus: "",
                domicilio_metros: "",
                porque_adoptar: "",
                tipo_comida_mascota: "",
                si_mascota_enferma: "",
                responsable_gastos_mascota: "",
                gasto_estimado_mensual: "",
                visita_periodica: "",
                esterilizacion: "",
                adopcion_compartida: "",
                observaciones: ""
            }
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
        //metodos adicionales
        listar(pagina, buscar) {
            axios
                .get("/adopcion/listar?buscar=" + buscar + "&page=" + pagina)
                .then(res => {
                    this.recupera = res.data.datos.data;
                    this.paginacion = res.data.paginacion;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        listarficha() {
            axios
                .get("/sesion/recuperar")
                .then(res => {
                    if (res.data) {
                        this.usuario = res.data.datauser[0];
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            axios
                .get(`/ficha/listar?id_mascota=${this.$route.params.id}`)
                .then(({ data }) => {
                    this.mascota = data.mascota;
                    this.albergue = data.albergue;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        guardar() {},
        cerrar() {
            this.modal.estado = false;
        },
        cancelar() {
            this.modal.estado = false;
            this.$router.push("/mascotas/");
        }
    },
    mounted() {
        this.listar(1, this.buscar);
    }
};
</script>
<style lang="css">
.divider {
    margin-bottom: 1%;
    margin-top: auto;
    background: none;
    border-radius: 4px;
    padding: none;
    color: none;
}

.label-input {
    margin-bottom: auto;
}
.text-verde {
    color: #28a745 !important;
}
.estado-general {
    text-transform: capitalize;
    color: orange;
}
.imagen-modal1 {
    width: 95%;
    height: 169px;
    border-radius: 8px;
    border: 1px solid #3e3e3e;
    margin-bottom: 4%;
    margin-top: -3%;
}
</style>
