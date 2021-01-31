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
                                    <th>Estado Adopción</th>
                                </tr>
                            </thead>
                            <tbody v-if="recupera.length">
                                <tr
                                    v-for="(tr, index) in recupera"
                                    :key="index"
                                >
                                    <td>{{ tr.id_adopcion | ceros }}</td>
                                    <td>{{ tr.fecha_emision }}</td>
                                    <td>{{ tr.fecha_finalizacion }}</td>
                                    <td>{{ tr.nombre_mascota }}</td>
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
                                            {{ tr.estado }}
                                        </span>
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
                            {{ modal.titulo }} {{ mascota.nombre }}
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
                            <vs-divider class="divider mt-4 mb-4 bold">
                                Información del Solicitante
                            </vs-divider>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div>
                                    <label class="label-input"
                                        >Nombre: {{ usuario.nombres }}
                                        {{ usuario.apellidos }}</label
                                    >
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div>
                                    <label class="label-input"
                                        >Identificación:
                                        {{ usuario.identificacion }}</label
                                    >
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div>
                                    <label class="label-input"
                                        >Email: {{ usuario.email }}</label
                                    >
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div>
                                    <label class="label-input"
                                        >Dirección:
                                        {{ usuario.domicilio }}</label
                                    >
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div>
                                    <label class="label-input"
                                        >Teléfono: {{ usuario.telefono }}</label
                                    >
                                </div>
                            </div>
                            <div class="col-xl-6 col-lg-6 col-md-6">
                                <div>
                                    <label class="label-input"
                                        >Celular: {{ usuario.celular }}</label
                                    >
                                </div>
                            </div>
                            <vs-divider class="divider mt-4 mb-4 bold">
                                Referencia Personal
                            </vs-divider>
                            <div class="col-xl-4 col-lg-4 col-md-4">
                                <div class="form-group">
                                    <label class="label-input">Nombre:</label>
                                    <input
                                        disabled
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
                                        disabled
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
                                        disabled
                                        type="text"
                                        class="form-control"
                                        v-model="
                                            ficha.referencia_personal_telefono
                                        "
                                    />
                                </div>
                            </div>
                            <vs-divider class="divider mt-4 mb-4 bold">
                                Información de Hogar
                            </vs-divider>
                            <div class="col-xl-3 col-lg-3 col-md-3">
                                <div class="form-group">
                                    <label class="label-input"
                                        >N° Familiares:</label
                                    >
                                    <input
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                    disabled
                                    class="form-control"
                                    rows="2"
                                    v-model="ficha.porque_adoptar"
                                ></textarea>
                            </div>
                            <vs-divider class="divider mt-4 mb-4 bold">
                                Cuidados de Mascota
                            </vs-divider>
                            <div class="col-xl-3 col-lg-3 col-md-3">
                                <div class="form-group">
                                    <label class="label-input"
                                        >Tipo de Comida:</label
                                    >
                                    <select
                                        disabled
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
                                        disabled
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
                                        disabled
                                        type="text"
                                        class="form-control"
                                        v-model="ficha.gasto_estimado_mensual"
                                    />
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-12">
                                <div class="col-xl-10 col-lg-10 col-md-10">
                                    <label class="label-input"
                                        >¿Acepta tener visitas de
                                        supervisión?</label
                                    >
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div class="row">
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="visita_periodica"
                                                id="visita_periodica_si"
                                                value="Si"
                                                disabled
                                                v-model="ficha.visita_periodica"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="visita_periodica_si"
                                            >
                                                Si
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="visita_periodica"
                                                id="visita_periodica_no"
                                                value="No"
                                                disabled
                                                v-model="ficha.visita_periodica"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="visita_periodica_no"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-12">
                                <div class="col-xl-10 col-lg-10 col-md-10">
                                    <label class="label-input"
                                        >¿Planea Esterilizar a su
                                        mascota?</label
                                    >
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div class="row">
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="esterilizacion"
                                                id="esterilizacion_si"
                                                value="Si"
                                                disabled
                                                v-model="ficha.esterilizacion"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="esterilizacion_si"
                                            >
                                                Si
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="esterilizacion"
                                                id="esterilizacion_no"
                                                value="No"
                                                disabled
                                                v-model="ficha.esterilizacion"
                                            />
                                            <label
                                                class="form-check-label"
                                                for="esterilizacion_no"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-4 col-lg-4 col-md-12">
                                <div class="col-xl-10 col-lg-10 col-md-10">
                                    <label class="label-input"
                                        >¿La adopción será compartida?</label
                                    >
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12">
                                    <div class="row">
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="adopcion_compartida"
                                                id="adopcion_compartida_si"
                                                value="Si"
                                                disabled
                                                v-model="
                                                    ficha.adopcion_compartida
                                                "
                                            />
                                            <label
                                                class="form-check-label"
                                                for="adopcion_compartida_si"
                                            >
                                                Si
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="radio"
                                                name="adopcion_compartida"
                                                id="adopcion_compartida_no"
                                                value="No"
                                                disabled
                                                v-model="
                                                    ficha.adopcion_compartida
                                                "
                                            />
                                            <label
                                                class="form-check-label"
                                                for="adopcion_compartida_no"
                                            >
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-12 col-lg-12 col-md-12 mt-4">
                                <label class="label-input"
                                    >Observaciones o Inquitudes
                                    Adicionales:</label
                                >
                                <textarea
                                    disabled
                                    class="form-control"
                                    rows="2"
                                    v-model="ficha.observaciones"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div
                        class="modal-footer"
                        v-if="ficha.estado == 'Adopción Pendiente'"
                    >
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="estado('Adopción Rechazada')"
                        >
                            Rechazar adopción
                        </button>
                        <button
                            type="button"
                            class="btn btn-success"
                            @click="estado('Adopción Aprobada')"
                        >
                            Aprobar Adopción
                        </button>
                    </div>
                    <div class="modal-footer" v-else>
                        <button
                            type="button"
                            class="btn btn-danger"
                            @click="cerrar()"
                        >
                            Cerrar
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
                titulo: "Ficha de Adopción de ",
                estado: false
            },
            usuario: [],
            mascota: [],
            albergue: [],
            ficha: {
                id_adopcion: null,
                fecha_emision: moment().format("YYYY-MM-DD"),
                fecha_finalizacion: moment().format("YYYY-MM-DD"),
                estado: null,
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
    filters: {
        ceros(data) {
            let number = data;
            let width = 5;
            width -= number.toString().length;
            if (width > 0) {
                return (
                    new Array(width + (/\./.test(number) ? 2 : 1)).join("0") +
                    number
                );
            }
            return number + ""; // siempre devuelve tipo cadena
        }
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
        ver(data) {
            axios
                .get(
                    `/ficha/listar?id_mascota=${data.id_mascota}&id_adopcion=${data.id_adopcion}&id_albergue=${data.id_albergue}`
                )
                .then(({ data }) => {
                    this.mascota = data.mascota;
                    this.albergue = data.albergue;
                    this.usuario = data.solicitante;
                    this.modal.estado = true;
                    this.ficha = {
                        id_adopcion: data.ficha.id_adopcion,
                        fecha_emision: moment(data.ficha.fecha_emision).format(
                            "YYYY-MM-DD"
                        ),
                        fecha_finalizacion: moment(
                            data.ficha.fecha_finalizacion
                        ).format("YYYY-MM-DD"),
                        estado: data.ficha.estado,
                        referencia_personal_nombre:
                            data.ficha.referencia_personal_nombre,
                        referencia_personal_parentesco:
                            data.ficha.referencia_personal_parentesco,
                        referencia_personal_telefono:
                            data.ficha.referencia_personal_telefono,
                        familiares_numero: data.ficha.familiares_numero,
                        familiares_enfermedad: data.ficha.familiares_enfermedad,
                        domicilio_tipo: data.ficha.domicilio_tipo,
                        domicilio_estatus: data.ficha.domicilio_estatus,
                        domicilio_metros: data.ficha.domicilio_metros,
                        porque_adoptar: data.ficha.porque_adoptar,
                        tipo_comida_mascota: data.ficha.tipo_comida_mascota,
                        si_mascota_enferma: data.ficha.si_mascota_enferma,
                        responsable_gastos_mascota:
                            data.ficha.responsable_gastos_mascota,
                        gasto_estimado_mensual:
                            data.ficha.gasto_estimado_mensual,
                        visita_periodica: data.ficha.visita_periodica,
                        esterilizacion: data.ficha.esterilizacion,
                        adopcion_compartida: data.ficha.adopcion_compartida,
                        observaciones: data.ficha.observaciones
                    };
                })
                .catch(error => {
                    console.log(error);
                });
        },
        estado(estado) {
            axios
                .post("/adopcion/estado", {
                    estado: estado,
                    id: this.ficha.id_adopcion
                })
                .then(({ data }) => {
                    alertify.success("Ficha Actualizada exitosamente");
                })
                .catch(error => {
                    console.log(error);
                });
            this.modal.estado = false;
            this.listar(1, this.buscar);
        },
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
.bold {
    font-weight: bold;
}
</style>
