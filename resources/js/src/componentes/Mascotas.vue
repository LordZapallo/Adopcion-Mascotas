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
                                    <th>Hist. C.</th>
                                    <th>Identificación</th>
                                    <th>Apellido paterno</th>
                                    <th>Apellido materno</th>
                                    <th>Nombres</th>
                                    <th>Tipo</th>
                                    <th>Categoría</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody v-if="recupera.length">
                                <tr
                                    v-for="(tr, index) in recupera"
                                    :key="index"
                                >
                                    <td>{{ tr.TTJV_id_persona }}</td>
                                    <td>{{ tr.TTJV_PersonaIdentificacion }}</td>
                                    <td>{{ tr.TTJV_PersonaApePaterno }}</td>
                                    <td>{{ tr.TTJV_PersonaApeMaterno }}</td>
                                    <td>{{ tr.TTJV_PersonaNombres }}</td>
                                    <td>{{ tr.TTJV_PersonaSexo }}</td>
                                    <td>{{ tr.TTJV_PersonaFchNacimiento | vertipo }}</td>
                                    <td class="pointer acciones">
                                        <i
                                            class="fa fa-eye"
                                            @click="abrir('editar', tr)"
                                        ></i>
                                        |
                                        <i
                                            class="fa fa-trash"
                                            @click="
                                                eliminar(tr.TTJV_id_persona)
                                            "
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
                        <h5 class="modal-title" id="exampleModalLabel">
                            {{ titulomodal }}
                        </h5>
                        <button type="button" class="close" @click="cerrar()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action>
                            <div class="row form-material">
                                <div class="col-xl-3 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Tipo Identificación</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="tipo_identificacion"
                                        >
                                            <option value="Cédula"
                                                >Cédula</option
                                            >
                                            <option value="Pasaporte"
                                                >Pasaporte</option
                                            >
                                        </select>
                                        <div v-if="!tipo_identificacion">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errortipo_identificacion"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Ingrese Identificación:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="identificacion"
                                            onkeypress="return solonumeros(event)" maxlength="10"
                                        />
                                        <div v-if="!identificacion">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in erroridentificacion"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-5 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Apellido Paterno:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="ape_paterno"
                                            onkeypress="return sololetras(event)"
                                        />
                                        <div v-if="!ape_paterno">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorape_paterno"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-5 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Apellido Materno:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="ape_materno"
                                            onkeypress="return sololetras(event)"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-7 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Nombres:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="nombre"
                                            onkeypress="return sololetras(event)"
                                        />
                                        <div v-if="!nombre">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errornombre"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Fecha de Nacimiento</label
                                        >
                                        <input
                                            type="date"
                                            class="form-control"
                                            v-model="fecha_nacimiento"
                                        />
                                        <div v-if="!fecha_nacimiento">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorfecha_nacimiento"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        {{ sexo }}
                                        <label for="exampleInputEmail1"
                                            >Sexo:</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="sexo"
                                        >
                                            <option value="Hombre"
                                                >Hombre</option
                                            >
                                            <option value="Mujer"
                                                >Mujer</option
                                            >
                                                <option value="Otros"
                                                >Otros</option
                                            >
                                        </select>
                                        <div v-if="!sexo">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorsexo"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Orientacion Sexual:</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="orient_sex"
                                        >
                                            <option value="Heterosexual"
                                                >Heterosexual</option
                                            >
                                            <option value="Homosexual"
                                                >Homosexual</option
                                            >
                                            <option value="Bisexual"
                                                >Bisexual</option
                                            >
                                            <option value="Asexual"
                                                >Asexual</option
                                            >
                                            <option value="Pansexual"
                                                >Pansexual</option
                                            >
                                            <option value="Demisexual"
                                                >Demisexual</option
                                            >
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Estado Civil:</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="est_civil"
                                        >
                                            <option value="Soltero(a)"
                                                >Soltero</option
                                            >
                                            <option value="Casado(a)"
                                                >Casado</option
                                            >
                                            <option value="Divorciado(a)"
                                                >Divorciado</option
                                            >
                                            <option value="Viudo(a)"
                                                >Viudo</option
                                            >
                                        </select>
                                        <div v-if="!est_civil">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorest_civil"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Nacionalidad:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="nacionalidad"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Discapacidad:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="discapacidad"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Alergias:</label
                                        >
                                        <textarea
                                            rows="3"
                                            type="text"
                                            class="form-control"
                                            v-model="alergias"
                                        ></textarea>
                                        <div v-if="!alergias">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in erroralergias"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Intervenciones Quirúrgicas:</label
                                        >
                                        <textarea
                                            rows="3"
                                            type="text"
                                            class="form-control"
                                            v-model="intervenciones"
                                        ></textarea>
                                        <div v-if="!intervenciones">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorintervenciones"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Vacunas Completas:</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="vacunas"
                                        >
                                            <option value="SI">SI</option>
                                            <option value="NO">NO</option>
                                        </select>
                                        <div v-if="!vacunas">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorvacunas"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Tipo de Sangre:</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="tipo_sangre"
                                        >
                                            <option value="A+">A+</option>
                                            <option value="B+">B+</option>
                                            <option value="O+">O+</option>
                                            <option value="AB+">AB+</option>
                                            <option value="A-">A-</option>
                                            <option value="B-">B-</option>
                                            <option value="O-">O-</option>
                                            <option value="AB-">AB-</option>
                                        </select>
                                        <div v-if="!tipo_sangre">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errortipo_sangre"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Ocupacion</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="ocupacion"
                                        />
                                        <div v-if="!ocupacion">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorocupacion"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Religión</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="religion"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Dirección:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="direccion"
                                        />
                                        <div v-if="!direccion">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errordireccion"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Teléfono Domicilio:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="telef_dom"
                                            onkeypress="return solonumeros(event)" maxlength="15"
                                        />
                                        <div v-if="!telef_dom">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errortelef_dom"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Teléfono Trabajo</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="telef_trab"
                                            onkeypress="return solonumeros(event)" maxlength="15"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Teléfono Celular</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="telef_cell"
                                            onkeypress="return solonumeros(event)" maxlength="10"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Email:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="email"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Nombre Familiar:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="nom_fam"
                                            onkeypress="return sololetras(event)"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Apellido Familiar:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="ape_fam"
                                            onkeypress="return sololetras(event)"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Dirección Familiar:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="direc_fam"
                                            onkeypress="return sololetras(event)"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-12 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Teléfono Celular Familiar:</label
                                        >
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="cel_fam"
                                            onkeypress="return solonumeros(event)" maxlength="10"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Estado</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="estado"
                                        >
                                            <option value="Activo"
                                                >Activo</option
                                            >
                                            <option value="Inactivo"
                                                >Inactivo</option
                                            >
                                        </select>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Etnia:</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="etnia"
                                        >
                                            <option
                                                :value="tr.TTJV_codetnia"
                                                v-for="(tr, index) in contetnia"
                                                :key="index"
                                                v-text="tr.TTJV_descripcion"
                                            ></option>
                                        </select>
                                        <div v-if="!etnia">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in erroretnia"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Grupo Etario</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="grup_etario"
                                        >
                                            <option
                                                :value="tr.TTJV_id_grupoetario"
                                                v-for="(tr,
                                                index) in contetario"
                                                :key="index"
                                                v-text="tr.TTJV_descricion"
                                            ></option>
                                        </select>
                                        <div v-if="!grup_etario">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorgrup_etario"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Provincia</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="provincia"
                                            @change="listcanton(provincia)"
                                        >
                                            <option
                                                :value="tr.TTJV_cod_provincia"
                                                v-for="(tr,
                                                index) in contprovincia"
                                                :key="index"
                                                v-text="tr.TTJV_descripcion"
                                            ></option>
                                        </select>
                                        <div v-if="!provincia">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorprovincia"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-6 col-md-12">
                                    <div class="form-group">
                                        <label for="exampleInputEmail1"
                                            >Cantón</label
                                        >
                                        <select
                                            class="form-control"
                                            v-model="canton"
                                        >
                                            <option
                                                :value="tr.TTJV_cod_canton"
                                                v-for="(tr,
                                                index) in contcanton"
                                                :key="index"
                                                v-text="tr.TTJV_descripcion"
                                            ></option>
                                        </select>
                                        <div v-if="!canton">
                                            <div
                                                class="invalid-feedback"
                                                style="display:block;"
                                                v-for="err in errorcanton"
                                                :key="err"
                                            >
                                                {{ err }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--Fin-->
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                            style="margin-left: auto;"
                            type="button"
                            class="btn btn-warning"
                            v-if="tipomodal == 1"
                            @click="guardaremergencia()"
                        >
                            Ingresar Paciente de Emergencia
                        </button>
                        <button
                            type="button"
                            class="btn btn-secondary"
                            @click="cerrar()"
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            v-if="tipomodal == 1"
                            @click="guardar()"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            class="btn btn-primary"
                            v-if="tipomodal == 2"
                            @click="editar()"
                        >
                            Editar
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
            //variables paciente
            f_persona: moment().format("YYYY-M-D"),
            tipo_identificacion: "",
            identificacion: "",
            ape_paterno: "",
            ape_materno: "",
            nombre: "",
            fecha_nacimiento: "",
            sexo: "",
            orient_sex: "",
            est_civil: "",
            nacionalidad: "",
            discapacidad: "",
            alergias: "",
            intervenciones: "",
            vacunas: "",
            tipo_sangre: "",
            ocupacion: "",
            religion: "",
            direccion: "",
            telef_dom: "",
            telef_trab: "",
            telef_cell: "",
            email: "",
            nom_fam: "",
            ape_fam: "",
            direc_fam: "",
            cel_fam: "",
            estado: "",
            etnia: "",
            grup_etario: "",
            provincia: "",
            canton: "",
            //arrays recuperacion select paciente
            contetnia: [],
            contetario: [],
            contprovincia: [],
            contcanton: [],
            //validacion
            errortipo_identificacion: [],
            erroridentificacion: [],
            errorape_paterno: [],
            errornombre: [],
            errorfecha_nacimiento: [],
            errorsexo: [],
            errorest_civil: [],
            erroralergias: [],
            errorintervenciones: [],
            errorvacunas: [],
            errortipo_sangre: [],
            errorocupacion: [],
            errordireccion: [],
            errortelef_dom: [],
            erroretnia: [],
            errorgrup_etario: [],
            errorprovincia: [],
            errorcanton: []
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
        fechaalerta() {
            return moment()
                .add(91, "days")
                .format("YYYY-MM-DD hh:ss");
        },
        fechaalerta1() {
            return moment()
                .add(182, "days")
                .format("YYYY-MM-DD hh:ss");
        }
    },
    filters: {
        fechaformato(data) {
            return moment(data).format("LL");
        },
        vertipo(data){
            var edad = moment(moment(data).format("YYYYMMDD"), "YYYYMMDD").fromNow();
            var element   = edad.match(/\d+/);
            if(element<18){
                var tipo = "Niño";
            }else{
                var tipo = "Adulto";
            }
            return tipo;
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
                    console.log(res.data.datos.data);
                    this.recupera = res.data.datos.data;
                    this.paginacion = res.data.paginacion;
                })
                .catch(err => {
                    console.log(err);
                });
        },

        abrir(tipo, datos) {
            switch (tipo) {
                case "agregar": {
                    this.titulomodal = "Agregar Paciente";
                    this.abrirmodal = 1;
                    this.tipomodal = 1;
                    this.id = null;
                    //opcionales
                    this.tipo_identificacion = "";
                    this.identificacion = "";
                    this.ape_paterno = "";
                    this.ape_materno = "";
                    this.nombre = "";
                    this.fecha_nacimiento = "";
                    this.sexo = "";
                    this.orient_sex = "";
                    this.est_civil = "";
                    this.nacionalidad = "";
                    this.discapacidad = "";
                    this.alergias = "";
                    this.intervenciones = "";
                    this.vacunas = "";
                    this.tipo_sangre = "";
                    this.ocupacion = "";
                    this.religion = "";
                    this.direccion = "";
                    this.telef_dom = "";
                    this.telef_trab = "";
                    this.telef_cell = "";
                    this.email = "";
                    this.nom_fam = "";
                    this.ape_fam = "";
                    this.direc_fam = "";
                    this.cel_fam = "";
                    this.estado = "";
                    this.etnia = "";
                    this.grup_etario = "";
                    this.provincia = "";
                    this.canton = "";
                    break;
                }
                case "editar": {
                    this.titulomodal = "Editar Paciente";
                    this.abrirmodal = 1;
                    this.tipomodal = 2;
                    //opcionales
                    this.id = datos.TTJV_id_persona;
                    this.f_persona = datos.TTJV_PersonaFhr;
                    this.tipo_identificacion = datos.TTJV_PersonaTipoIden;
                    this.identificacion = datos.TTJV_PersonaIdentificacion;
                    this.ape_paterno = datos.TTJV_PersonaApePaterno;
                    this.ape_materno = datos.TTJV_PersonaApeMaterno;
                    this.nombre = datos.TTJV_PersonaNombres;
                    this.fecha_nacimiento = datos.TTJV_PersonaFchNacimiento;
                    this.sexo = datos.TTJV_PersonaSexo;
                    this.orient_sex = datos.TTJV_PersonaOrientacionSexual;
                    this.est_civil = datos.TTJV_PersonaEstadoCivil;
                    this.nacionalidad = datos.TTJV_PersonaNacionalidad;
                    this.discapacidad = datos.TTJV_PersonaDiscapacidad;
                    this.alergias = datos.TTJV_PersonaAlergia;
                    this.intervenciones = datos.TTJV_PersonaInterquirugicas;
                    this.vacunas = datos.TTJV_PersonaVacuCompletas;
                    this.tipo_sangre = datos.TTJV_PersonaTipoSangre;
                    this.ocupacion = datos.TTJV_PersonaOcupacion;
                    this.religion = datos.TTJV_PersonaReligion;
                    this.direccion = datos.TTJV_PersonaDireccion;
                    this.telef_dom = datos.TTJV_PersonaTelefono;
                    this.telef_trab = datos.TTJV_PersonaTelefonoTrabajo;
                    this.telef_cell = datos.TTJV_PersonaCelular;
                    this.email = datos.TTJV_PersonaEmail;
                    this.nom_fam = datos.TTJV_PersonaNombreFamiliar;
                    this.ape_fam = datos.TTJV_PersonaApellidoFamiliar;
                    this.direc_fam = datos.TTJV_PersonaDireccionFamiliar;
                    this.cel_fam = datos.TTJV_PersonaCelularFamiliar;
                    this.estado = datos.TTJV_PersonaEstado;
                    this.etnia = datos.TTJV_PersonaEtnia;
                    this.grup_etario = datos.TTJV_PersonaGrupoEtario;
                    this.provincia = datos.TTJV_PersonaProvincia;
                    this.listcanton(datos.TTJV_PersonaProvincia);
                    this.canton = datos.TTJV_PersonaCanton;
                    break;
                }
            }
        },
        cerrar() {
            this.abrirmodal = 0;
        },
        //CRUD
        guardar() {
            if (this.validar()) {
                return;
            }
            axios
                .post("/pacientes/guardar", {
                    TTJV_PersonaFhr: this.f_persona,
                    TTJV_PersonaTipoIden: this.tipo_identificacion,
                    TTJV_PersonaIdentificacion: this.identificacion,
                    TTJV_PersonaApePaterno: this.ape_paterno,
                    TTJV_PersonaApeMaterno: this.ape_materno,
                    TTJV_PersonaNombres: this.nombre,
                    TTJV_PersonaFchNacimiento: this.fecha_nacimiento,
                    TTJV_PersonaSexo: this.sexo,
                    TTJV_PersonaOrientacionSexual: this.orient_sex,
                    TTJV_PersonaEstadoCivil: this.est_civil,
                    TTJV_PersonaNacionalidad: this.nacionalidad,
                    TTJV_PersonaDiscapacidad: this.discapacidad,
                    TTJV_PersonaAlergia: this.alergias,
                    TTJV_PersonaInterquirugicas: this.intervenciones,
                    TTJV_PersonaVacuCompletas: this.vacunas,
                    TTJV_PersonaTipoSangre: this.tipo_sangre,
                    TTJV_PersonaOcupacion: this.ocupacion,
                    TTJV_PersonaReligion: this.religion,
                    TTJV_PersonaDireccion: this.direccion,
                    TTJV_PersonaTelefono: this.telef_dom,
                    TTJV_PersonaTelefonoTrabajo: this.telef_trab,
                    TTJV_PersonaCelular: this.telef_cell,
                    TTJV_PersonaEmail: this.email,
                    TTJV_PersonaNombreFamiliar: this.nom_fam,
                    TTJV_PersonaApellidoFamiliar: this.ape_fam,
                    TTJV_PersonaDireccionFamiliar: this.direc_fam,
                    TTJV_PersonaCelularFamiliar: this.cel_fam,
                    TTJV_PersonaEstado: this.estado,
                    TTJV_PersonaEtnia: this.etnia,
                    TTJV_PersonaGrupoEtario: this.grup_etario,
                    TTJV_PersonaProvincia: this.provincia,
                    TTJV_PersonaCanton: this.canton
                })
                .then(res => {
                    this.cerrar();
                    this.listar(1, this.buscar);
                    alertify.success("Registro Guardado");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        editar() {
            if (this.validar()) {
                return;
            }
            axios
                .post("/pacientes/editar", {
                    TTJV_id_persona: this.id,
                    TTJV_PersonaFhr: this.f_persona,
                    TTJV_PersonaTipoIden: this.tipo_identificacion,
                    TTJV_PersonaIdentificacion: this.identificacion,
                    TTJV_PersonaApePaterno: this.ape_paterno,
                    TTJV_PersonaApeMaterno: this.ape_materno,
                    TTJV_PersonaNombres: this.nombre,
                    TTJV_PersonaFchNacimiento: this.fecha_nacimiento,
                    TTJV_PersonaSexo: this.sexo,
                    TTJV_PersonaOrientacionSexual: this.orient_sex,
                    TTJV_PersonaEstadoCivil: this.est_civil,
                    TTJV_PersonaNacionalidad: this.nacionalidad,
                    TTJV_PersonaDiscapacidad: this.discapacidad,
                    TTJV_PersonaAlergia: this.alergias,
                    TTJV_PersonaInterquirugicas: this.intervenciones,
                    TTJV_PersonaVacuCompletas: this.vacunas,
                    TTJV_PersonaTipoSangre: this.tipo_sangre,
                    TTJV_PersonaOcupacion: this.ocupacion,
                    TTJV_PersonaReligion: this.religion,
                    TTJV_PersonaDireccion: this.direccion,
                    TTJV_PersonaTelefono: this.telef_dom,
                    TTJV_PersonaTelefonoTrabajo: this.telef_trab,
                    TTJV_PersonaCelular: this.telef_cell,
                    TTJV_PersonaEmail: this.email,
                    TTJV_PersonaNombreFamiliar: this.nom_fam,
                    TTJV_PersonaApellidoFamiliar: this.ape_fam,
                    TTJV_PersonaDireccionFamiliar: this.direc_fam,
                    TTJV_PersonaCelularFamiliar: this.cel_fam,
                    TTJV_PersonaEstado: this.estado,
                    TTJV_PersonaEtnia: this.etnia,
                    TTJV_PersonaGrupoEtario: this.grup_etario,
                    TTJV_PersonaProvincia: this.provincia,
                    TTJV_PersonaCanton: this.canton
                })
                .then(res => {
                    console.log(res.data);
                    this.cerrar();
                    this.listar(1, this.buscar);
                    alertify.success("Registro Editado");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        guardaremergencia() {
            axios
                .post("/pacientes/guardaremergency", {
                    TTJV_PersonaFhr: this.f_persona,
                    TTJV_PersonaTipoIden: "---",
                    TTJV_PersonaIdentificacion: "9999999999",
                    TTJV_PersonaApePaterno: "---",
                    TTJV_PersonaNombres: "Paciente Emergencia",
                    TTJV_PersonaFchNacimiento: moment().format("YYYY-MM-DD"),
                    TTJV_PersonaSexo: "---",
                    TTJV_PersonaEstadoCivil: "---",
                    TTJV_PersonaAlergia: "No comprobado Emergencia",
                    TTJV_PersonaInterquirugicas: "No comprobado Emergencia",
                    TTJV_PersonaVacuCompletas: "--",
                    TTJV_PersonaTipoSangre: "---",
                    TTJV_PersonaOcupacion: "---",
                    TTJV_PersonaDireccion: "---",
                    TTJV_PersonaTelefono: "---"
                })
                .then(res => {
                    this.cerrar();
                    this.listar(1, this.buscar);
                    alertify.success("Registro de Emergencia Guardado");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        eliminar(id) {
            Swal.fire({
                title: "Eliminar registro?",
                text: "Esta seguro de eliminar este registro?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "Cancelar",
                confirmButtonText: "Eliminar"
            }).then(result => {
                if (result.value) {
                    axios.delete("/pacientes/eliminar/" + id);
                    this.listar(1, this.buscar);
                    alertify.success("Registro Eliminado");
                }
            });
        },
        //Validaciones
        validar() {
            this.error = 0;
            this.errortipo_identificacion = [];
            this.erroridentificacion = [];
            this.errorape_paterno = [];
            this.errornombre = [];
            this.errorfecha_nacimiento = [];
            this.errorsexo = [];
            this.errorest_civil = [];
            this.erroralergias = [];
            this.errorintervenciones = [];
            this.errorvacunas = [];
            this.errortipo_sangre = [];
            this.errorocupacion = [];
            this.errordireccion = [];
            this.errortelef_dom = [];
            this.erroretnia = [];
            this.errorgrup_etario = [];
            this.errorprovincia = [];
            this.errorcanton = [];

            if (!this.tipo_identificacion) {
                this.errortipo_identificacion.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.identificacion) {
                this.erroridentificacion.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.ape_paterno) {
                this.errorape_paterno.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.nombre) {
                this.errornombre.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.fecha_nacimiento) {
                this.errorfecha_nacimiento.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.sexo) {
                this.errorsexo.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.est_civil) {
                this.errorest_civil.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.alergias) {
                this.erroralergias.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.intervenciones) {
                this.errorintervenciones.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.vacunas) {
                this.errorvacunas.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.tipo_sangre) {
                this.errortipo_sangre.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.ocupacion) {
                this.errorocupacion.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.direccion) {
                this.errordireccion.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.telef_dom) {
                this.errortelef_dom.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.etnia) {
                this.erroretnia.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.grup_etario) {
                this.errorgrup_etario.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.provincia) {
                this.errorprovincia.push("Campo obligatorio");
                this.error = 1;
            }
            if (!this.canton) {
                this.errorcanton.push("Campo obligatorio");
                this.error = 1;
            }

            return this.error;
        },
        //funciones export archivos
        excel() {
            window.open("/persona/excel", "_top");
            //this.$router.push("/persona/excel");
        },
        pdf() {
            window.open("/persona/pdf", "_top");
        }
    },
    mounted() {
        this.listar(1, this.buscar);
    }
};
</script>
<style>
@media (min-width: 1024px) {
    .modal-lg {
        max-width: 70%;
    }
}
</style>
