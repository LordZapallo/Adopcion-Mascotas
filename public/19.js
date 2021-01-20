(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Atencion.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/componentes/Atencion.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

moment.locale("es");
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var _ref;

    return _ref = {
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
      tipomodal: null
    }, _defineProperty(_ref, "error", 0), _defineProperty(_ref, "id", 0), _defineProperty(_ref, "pacientes", []), _defineProperty(_ref, "TTJV_servicio", ""), _defineProperty(_ref, "TTJV_fecha", ""), _defineProperty(_ref, "TTJV_estado", 1), _defineProperty(_ref, "TTJV_id_persona", ""), _defineProperty(_ref, "errorTTJV_servicio", []), _defineProperty(_ref, "errorTTJV_fecha", []), _defineProperty(_ref, "errorTTJV_id_persona", []), _ref;
  },
  computed: {
    // No mover obligatorios
    isActived: function isActived() {
      return this.paginacion.current_page;
    },
    pagesNumber: function pagesNumber() {
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
    fechaalerta: function fechaalerta() {
      return moment().add(91, 'days').format('YYYY-MM-DD hh:ss');
    },
    fechaalerta1: function fechaalerta1() {
      return moment().add(182, 'days').format('YYYY-MM-DD hh:ss');
    }
  },
  filters: {
    fechaformato: function fechaformato(data) {
      return moment(data).format('LL');
    },
    fechayhoraformato: function fechayhoraformato(data) {
      return moment(data).format('LLL');
    }
  },
  methods: {
    // No mover obligatorios
    cambiarPagina: function cambiarPagina(page) {
      this.paginacion.current_page = page;
      this.listar(page, this.buscar);
    },
    //metodos cambiantes
    listar: function listar(pagina, buscar) {
      var _this = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/atencion/listar?buscar=" + buscar + "&page=" + pagina).then(function (res) {
        _this.recupera = res.data.datos.data;
        _this.paginacion = res.data.paginacion;
      })["catch"](function (err) {
        console.log(err);
      });
    },
    listarpaciente: function listarpaciente() {
      var _this2 = this;

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/persona/todos").then(function (res) {
        _this2.pacientes = res.data;
      })["catch"](function (err) {
        console.log(err);
      });
    },
    abrir: function abrir(tipo, datos) {
      switch (tipo) {
        case 'agregar':
          {
            this.titulomodal = "Agregar nueva Atención";
            this.abrirmodal = 1;
            this.tipomodal = 1;
            this.id = null; //opcionales

            this.TTJV_servicio = "";
            this.TTJV_fecha = "";
            this.TTJV_estado = 1;
            this.TTJV_id_persona = "";
            break;
          }

        case 'editar':
          {
            this.titulomodal = "Editar Atención";
            this.abrirmodal = 1;
            this.tipomodal = 2;
            this.id = datos.TTJV_id_atencion;
            this.TTJV_servicio = datos.TTJV_servicio;
            this.TTJV_fecha = moment(datos.TTJV_fecha).format('YYYY-MM-DD\Thh:mm');
            this.TTJV_estado = datos.TTJV_estado;
            this.TTJV_id_persona = datos.TTJV_id_persona;
            break;
          }
      }
    },
    guardar: function guardar() {
      var _this3 = this;

      if (this.validar()) {
        return;
      }

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.put("/atencion/guardar", {
        TTJV_servicio: this.TTJV_servicio,
        TTJV_fecha: this.TTJV_fecha,
        TTJV_estado: this.TTJV_estado,
        TTJV_id_persona: this.TTJV_id_persona
      }).then(function (res) {
        _this3.listar(1, _this3.buscar);

        _this3.cerrar();

        alertify.success('Registro Agregado');
      })["catch"](function (err) {
        console.log(err);
      });
    },
    editar: function editar() {
      var _this4 = this;

      if (this.validar()) {
        return;
      }

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.put("/atencion/editar", {
        id: this.id,
        TTJV_servicio: this.TTJV_servicio,
        TTJV_fecha: this.TTJV_fecha,
        TTJV_estado: this.TTJV_estado,
        TTJV_id_persona: this.TTJV_id_persona
      }).then(function (res) {
        _this4.listar(1, _this4.buscar);

        _this4.cerrar();

        alertify.success('Registro Actualizado');
      })["catch"](function (err) {
        console.log(err);
      });
    },
    eliminar: function eliminar(id) {
      var _this5 = this;

      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        title: 'Eliminar registro?',
        text: "Esta seguro de eliminar este registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Eliminar'
      }).then(function (result) {
        if (result.value) {
          axios__WEBPACK_IMPORTED_MODULE_0___default.a["delete"]("/atencion/eliminar/" + id).then(function (res) {
            _this5.listar(1, _this5.buscar);

            alertify.success('Registro Eliminado');
          })["catch"](function (err) {
            console.log(err);
          });
        }
      });
    },
    desactivar: function desactivar(id) {
      var _this6 = this;

      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        title: 'Desactivar registro?',
        text: "Esta seguro desea desactivar este registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Desactivar'
      }).then(function (result) {
        if (result.value) {
          axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/atencion/desactivar/" + id).then(function (res) {
            _this6.listar(1, _this6.buscar);

            alertify.success('Registro Desactivado');
          })["catch"](function (err) {
            console.log(err);
          });
        }
      });
    },
    activar: function activar(id) {
      var _this7 = this;

      sweetalert2__WEBPACK_IMPORTED_MODULE_1___default.a.fire({
        title: 'Activar registro?',
        text: "Esta seguro desea activar este registro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Activar'
      }).then(function (result) {
        if (result.value) {
          axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/atencion/activar/" + id).then(function (res) {
            _this7.listar(1, _this7.buscar);

            alertify.success('Registro Desactivado');
          })["catch"](function (err) {
            console.log(err);
          });
        }
      });
    },
    cerrar: function cerrar() {
      this.abrirmodal = 0;
      this.id = null;
      this.TTJV_servicio = "";
      this.TTJV_fecha = "";
      this.TTJV_estado = 1;
      this.TTJV_id_persona = "";
    },
    validar: function validar() {
      this.error = 0;
      this.errorTTJV_fecha = [];
      this.errorTTJV_id_persona = [];

      if (!this.TTJV_fecha) {
        this.errorTTJV_fecha.push("Ingrese una fecha");
        this.error = 1;
      }

      if (!this.TTJV_id_persona) {
        this.errorTTJV_id_persona.push("Escoga un paciente para añadir la atención");
        this.error = 1;
      }

      return this.error;
    },
    //funciones export archivos
    excel: function excel() {
      window.open("/atencion/excel", "_top");
    }
  },
  mounted: function mounted() {
    this.listar(1, this.buscar);
    this.listarpaciente();
  }
});

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-SG": "./node_modules/moment/locale/en-SG.js",
	"./en-SG.js": "./node_modules/moment/locale/en-SG.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Atencion.vue?vue&type=template&id=f0f2d824&":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/componentes/Atencion.vue?vue&type=template&id=f0f2d824& ***!
  \****************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "row" }, [
    _c("div", { staticClass: "col-12" }, [
      _c("div", { staticClass: "card" }, [
        _c("div", { staticClass: "card-body" }, [
          _c("div", { staticClass: "row" }, [
            _c("div", { staticClass: "col-lg-12 justify-content-end" }, [
              _c(
                "div",
                { staticClass: "btn-group", staticStyle: { float: "right" } },
                [
                  _vm._m(0),
                  _vm._v(" "),
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-outline-primary",
                      attrs: {
                        type: "button",
                        "data-toggle": "tooltip",
                        "data-placement": "top",
                        title: "Exportar Excel"
                      },
                      on: {
                        click: function($event) {
                          return _vm.excel()
                        }
                      }
                    },
                    [
                      _c("i", {
                        staticClass: "fas fa-file-excel",
                        staticStyle: { color: "#107c42" }
                      })
                    ]
                  )
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticClass: "input-group mb-3",
                  staticStyle: { width: "20em", float: "right" }
                },
                [
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.buscar,
                        expression: "buscar"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "text",
                      placeholder: "Buscar..",
                      "aria-describedby": "basic-addon2"
                    },
                    domProps: { value: _vm.buscar },
                    on: {
                      keyup: function($event) {
                        return _vm.listar(1, _vm.buscar)
                      },
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.buscar = $event.target.value
                      }
                    }
                  }),
                  _vm._v(" "),
                  _vm._m(1)
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "table-responsive" }, [
            _c("table", { staticClass: "table" }, [
              _vm._m(2),
              _vm._v(" "),
              _vm.recupera.length
                ? _c(
                    "tbody",
                    _vm._l(_vm.recupera, function(tr, index) {
                      return _c("tr", { key: index }, [
                        _c("td", [_vm._v(_vm._s(tr.TTJV_codigo))]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(tr.TTJV_PersonaNombres) +
                              " " +
                              _vm._s(tr.TTJV_PersonaApePaterno) +
                              " " +
                              _vm._s(tr.TTJV_PersonaApeMaterno)
                          )
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(
                            _vm._s(_vm._f("fechayhoraformato")(tr.TTJV_fecha))
                          )
                        ]),
                        _vm._v(" "),
                        tr.TTJV_estado
                          ? _c("td", { staticStyle: { color: "green" } }, [
                              _vm._v("Activo")
                            ])
                          : _c("td", { staticStyle: { color: "red" } }, [
                              _vm._v("Inactivo")
                            ]),
                        _vm._v(" "),
                        _c("td", [
                          _vm._v(_vm._s(tr.nombre) + " " + _vm._s(tr.apellido))
                        ]),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "pointer acciones" },
                          [
                            _c("i", {
                              staticClass: "fa fa-edit",
                              on: {
                                click: function($event) {
                                  return _vm.abrir("editar", tr)
                                }
                              }
                            }),
                            _vm._v(" |\n                  "),
                            tr.TTJV_estado
                              ? _c("i", {
                                  staticClass: "fa fa-toggle-off",
                                  on: {
                                    click: function($event) {
                                      return _vm.desactivar(tr.TTJV_id_atencion)
                                    }
                                  }
                                })
                              : _vm._e(),
                            tr.TTJV_estado ? [_vm._v(" |")] : _vm._e(),
                            _vm._v(" "),
                            !tr.TTJV_estado
                              ? _c("i", {
                                  staticClass: "fa fa-toggle-on",
                                  on: {
                                    click: function($event) {
                                      return _vm.activar(tr.TTJV_id_atencion)
                                    }
                                  }
                                })
                              : _vm._e(),
                            !tr.TTJV_estado ? [_vm._v(" |")] : _vm._e(),
                            _vm._v(" "),
                            _c("i", {
                              staticClass: "fa fa-trash",
                              on: {
                                click: function($event) {
                                  return _vm.eliminar(tr.TTJV_id_atencion)
                                }
                              }
                            }),
                            _vm._v(" | \n                  "),
                            _c("i", {
                              staticClass: "fas fa-ticket-alt",
                              on: {
                                click: function($event) {
                                  return _vm.eliminar(tr.TTJV_id_atencion)
                                }
                              }
                            })
                          ],
                          2
                        )
                      ])
                    }),
                    0
                  )
                : _c("tbody", [_vm._m(3)])
            ]),
            _vm._v(" "),
            _c("nav", { attrs: { "aria-label": "Page navigation example" } }, [
              _c(
                "ul",
                { staticClass: "pagination justify-content-center" },
                [
                  _vm.paginacion.current_page > 1
                    ? _c("li", { staticClass: "page-item" }, [
                        _c(
                          "a",
                          {
                            staticClass: "page-link",
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.cambiarPagina(
                                  _vm.paginacion.current_page - 1
                                )
                              }
                            }
                          },
                          [_vm._v("«")]
                        )
                      ])
                    : _c("li", { staticClass: "page-item" }, [
                        _c(
                          "a",
                          { staticClass: "page-link", attrs: { disabled: "" } },
                          [_vm._v("«")]
                        )
                      ]),
                  _vm._v(" "),
                  _vm._l(_vm.pagesNumber, function(page) {
                    return _c(
                      "li",
                      {
                        key: page,
                        staticClass: "page-item",
                        class: [page == _vm.isActived ? "active" : ""]
                      },
                      [
                        _c("a", {
                          staticClass: "page-link",
                          attrs: { href: "#" },
                          domProps: { textContent: _vm._s(page) },
                          on: {
                            click: function($event) {
                              $event.preventDefault()
                              return _vm.cambiarPagina(page)
                            }
                          }
                        })
                      ]
                    )
                  }),
                  _vm._v(" "),
                  _vm.paginacion.current_page < _vm.paginacion.last_page
                    ? _c("li", { staticClass: "page-item" }, [
                        _c(
                          "a",
                          {
                            staticClass: "page-link",
                            attrs: { href: "#" },
                            on: {
                              click: function($event) {
                                $event.preventDefault()
                                return _vm.cambiarPagina(
                                  _vm.paginacion.current_page + 1
                                )
                              }
                            }
                          },
                          [_vm._v("»")]
                        )
                      ])
                    : _c("li", { staticClass: "page-item" }, [
                        _c(
                          "a",
                          { staticClass: "page-link", attrs: { disabled: "" } },
                          [_vm._v("»")]
                        )
                      ])
                ],
                2
              )
            ])
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "modal", class: { abrirmodal: _vm.abrirmodal } }, [
      _c(
        "div",
        { staticClass: "modal-dialog modal-lg", attrs: { role: "document" } },
        [
          _c("div", { staticClass: "modal-content" }, [
            _c("div", { staticClass: "modal-header" }, [
              _c(
                "h5",
                {
                  staticClass: "modal-title",
                  attrs: { id: "exampleModalLabel" }
                },
                [_vm._v(_vm._s(_vm.titulomodal))]
              ),
              _vm._v(" "),
              _c(
                "button",
                {
                  staticClass: "close",
                  attrs: { type: "button" },
                  on: {
                    click: function($event) {
                      return _vm.cerrar()
                    }
                  }
                },
                [
                  _c("span", { attrs: { "aria-hidden": "true" } }, [
                    _vm._v("×")
                  ])
                ]
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-body" }, [
              _c("form", { attrs: { action: "" } }, [
                _c("div", { staticClass: "row form-material" }, [
                  _c("div", { staticClass: "col-xl-12 col-lg-12 col-md-12" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                        _vm._v("Paciente")
                      ]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.TTJV_id_persona,
                              expression: "TTJV_id_persona"
                            }
                          ],
                          staticClass: "form-control",
                          on: {
                            change: function($event) {
                              var $$selectedVal = Array.prototype.filter
                                .call($event.target.options, function(o) {
                                  return o.selected
                                })
                                .map(function(o) {
                                  var val = "_value" in o ? o._value : o.value
                                  return val
                                })
                              _vm.TTJV_id_persona = $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            }
                          }
                        },
                        [
                          _c("option", { attrs: { value: "" } }, [
                            _vm._v("Selecciona el paciente")
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.pacientes, function(tr, index) {
                            return _c(
                              "option",
                              {
                                key: index,
                                domProps: { value: tr.TTJV_id_persona }
                              },
                              [
                                _vm._v(
                                  _vm._s(tr.TTJV_PersonaNombres) +
                                    " " +
                                    _vm._s(tr.TTJV_PersonaApePaterno) +
                                    " " +
                                    _vm._s(tr.TTJV_PersonaApeMaterno)
                                )
                              ]
                            )
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      !_vm.TTJV_id_persona
                        ? _c(
                            "div",
                            _vm._l(_vm.errorTTJV_id_persona, function(err) {
                              return _c(
                                "div",
                                {
                                  key: err,
                                  staticClass: "invalid-feedback",
                                  staticStyle: { display: "block" }
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(err) +
                                      "\n                          "
                                  )
                                ]
                              )
                            }),
                            0
                          )
                        : _vm._e()
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-xl-6 col-lg-12 col-md-12" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                        _vm._v("Fecha")
                      ]),
                      _vm._v(" "),
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.TTJV_fecha,
                            expression: "TTJV_fecha"
                          }
                        ],
                        staticClass: "form-control",
                        attrs: { type: "datetime-local" },
                        domProps: { value: _vm.TTJV_fecha },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.TTJV_fecha = $event.target.value
                          }
                        }
                      }),
                      _vm._v(" "),
                      !_vm.TTJV_fecha
                        ? _c(
                            "div",
                            _vm._l(_vm.errorTTJV_fecha, function(err) {
                              return _c(
                                "div",
                                {
                                  key: err,
                                  staticClass: "invalid-feedback",
                                  staticStyle: { display: "block" }
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(err) +
                                      "\n                          "
                                  )
                                ]
                              )
                            }),
                            0
                          )
                        : _vm._e()
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-xl-6 col-lg-12 col-md-12" }, [
                    _c("div", { staticClass: "form-group" }, [
                      _c("label", { attrs: { for: "exampleInputEmail1" } }, [
                        _vm._v("Estado")
                      ]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.TTJV_estado,
                              expression: "TTJV_estado"
                            }
                          ],
                          staticClass: "form-control",
                          on: {
                            change: function($event) {
                              var $$selectedVal = Array.prototype.filter
                                .call($event.target.options, function(o) {
                                  return o.selected
                                })
                                .map(function(o) {
                                  var val = "_value" in o ? o._value : o.value
                                  return val
                                })
                              _vm.TTJV_estado = $event.target.multiple
                                ? $$selectedVal
                                : $$selectedVal[0]
                            }
                          }
                        },
                        [
                          _c("option", { attrs: { value: "1" } }, [
                            _vm._v("Activo")
                          ]),
                          _vm._v(" "),
                          _c("option", { attrs: { value: "0" } }, [
                            _vm._v("Inactivo")
                          ])
                        ]
                      )
                    ])
                  ])
                ])
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "modal-footer" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-secondary",
                  attrs: { type: "button" },
                  on: {
                    click: function($event) {
                      return _vm.cerrar()
                    }
                  }
                },
                [_vm._v("Cerrar")]
              ),
              _vm._v(" "),
              _vm.tipomodal == 1
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-primary",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.guardar()
                        }
                      }
                    },
                    [_vm._v("Guardar")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _vm.tipomodal == 2
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-primary",
                      attrs: { type: "button" },
                      on: {
                        click: function($event) {
                          return _vm.editar()
                        }
                      }
                    },
                    [_vm._v("Editar")]
                  )
                : _vm._e()
            ])
          ])
        ]
      )
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "btn btn-outline-primary ml-4",
        attrs: {
          type: "button",
          "data-toggle": "tooltip",
          "data-placement": "top",
          title: "Exportar PDF"
        }
      },
      [
        _c("i", {
          staticClass: "fas fa-file-pdf",
          staticStyle: { color: "#d40a0a" }
        })
      ]
    )
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c(
        "span",
        { staticClass: "input-group-text", attrs: { id: "basic-addon2" } },
        [_c("i", { staticClass: "fas fa-search" })]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Turno")]),
        _vm._v(" "),
        _c("th", [_vm._v("Paciente")]),
        _vm._v(" "),
        _c("th", [_vm._v("Fecha de creación")]),
        _vm._v(" "),
        _c("th", [_vm._v("Estado")]),
        _vm._v(" "),
        _c("th", [_vm._v("Usuario Creador")]),
        _vm._v(" "),
        _c("th", [_vm._v("Acciones")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("td", { attrs: { colspan: "99" } }, [
        _c(
          "div",
          {
            staticClass: "alert alert-warning text-center",
            attrs: { role: "alert" }
          },
          [_vm._v("SIN REGISTROS")]
        )
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/componentes/Atencion.vue":
/*!***************************************************!*\
  !*** ./resources/js/src/componentes/Atencion.vue ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Atencion_vue_vue_type_template_id_f0f2d824___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Atencion.vue?vue&type=template&id=f0f2d824& */ "./resources/js/src/componentes/Atencion.vue?vue&type=template&id=f0f2d824&");
/* harmony import */ var _Atencion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Atencion.vue?vue&type=script&lang=js& */ "./resources/js/src/componentes/Atencion.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Atencion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Atencion_vue_vue_type_template_id_f0f2d824___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Atencion_vue_vue_type_template_id_f0f2d824___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/componentes/Atencion.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/componentes/Atencion.vue?vue&type=script&lang=js&":
/*!****************************************************************************!*\
  !*** ./resources/js/src/componentes/Atencion.vue?vue&type=script&lang=js& ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Atencion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Atencion.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Atencion.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Atencion_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/componentes/Atencion.vue?vue&type=template&id=f0f2d824&":
/*!**********************************************************************************!*\
  !*** ./resources/js/src/componentes/Atencion.vue?vue&type=template&id=f0f2d824& ***!
  \**********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Atencion_vue_vue_type_template_id_f0f2d824___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Atencion.vue?vue&type=template&id=f0f2d824& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Atencion.vue?vue&type=template&id=f0f2d824&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Atencion_vue_vue_type_template_id_f0f2d824___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Atencion_vue_vue_type_template_id_f0f2d824___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);