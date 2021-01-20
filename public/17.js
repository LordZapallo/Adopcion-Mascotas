(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Vista.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/componentes/Vista.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
<<<<<<< HEAD
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



=======
>>>>>>> 1ec3673d8f99dd430b4d57edc31e363022c96122
var moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

moment.locale("es");
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
<<<<<<< HEAD
      buscar: "",
      error: 0,
      id: 0,
      ida: 0,
      idt: 0,
      pacientes: [],
      rp: {},
      edad: 0,
      caso: "",
      motivo: "",
      politraumatismo: "",
      observacion: "",
      ocular: 4,
      verbal: 5,
      motora: 6,
      presion: "",
      frecuenciac: "",
      temperatura: "",
      frecuenciav: "",
      sistolica: "",
      casos: [],
      motivos: [],
      politraumatismos: [],
      errorcaso: [],
      errormotivo: [],
      errorpresion: [],
      errorfrecuenciac: [],
      errortemperatura: [],
      errorfrecuenciav: [],
      errorocular: [],
      errorverbal: [],
      errormotora: [],
      errorsistolica: []
    };
  },
  filters: {
    fecha: function fecha(data) {
      return moment(data).format('LL');
    },
    fechayhora: function fechayhora(data) {
      return moment(data).format('LLL');
    }
  },
  computed: {
    color: function color() {
      var color = 5;
      var valor = 15;
      var presionm = 0;
      var frecuenciam = 0;
      var temperaturam = 0;
      var frecuenciavm = 0;
      var ceb = 0;
      var resultado = "Azul";
      var tipo = "blue";

      if (this.politraumatismo) {
        var _valor = parseInt(this.ocular) + parseInt(this.verbal) + parseInt(this.motora);

        if (_valor == 15) {
          color = 5;
        } else if (_valor >= 13 && _valor <= 14) {
          color = 4;
        } else if (_valor >= 9 && _valor <= 12) {
          color = 3;
        } else if (_valor >= 5 && _valor <= 8) {
          color = 2;
        } else {
          color = 1;
        }

        if (this.presion >= 2) {
          contador++;
        }

        if (this.frecuenciac >= 3) {
          contador++;
        }

        if (this.temperatura == 2 || this.temperatura == 3 || this.temperatura == 4) {
          contador++;
        }

        if (this.frecuenciav >= 3) {
          contador++;
        }

        if (contador == 0) {
          ceb = 5;
        } else if (contador == 1) {
          ceb = 4;
        } else if (contador == 2) {
          ceb = 3;
        } else if (contador == 3) {
          ceb = 2;
        } else {
          ceb = 1;
        }

        if (ceb < color) {
          color = ceb;
        }

        if (color >= 2) {
          color = 2;
        }
      } else {
        var _valor2 = parseInt(this.ocular) + parseInt(this.verbal) + parseInt(this.motora);

        if (_valor2 == 15) {
          color = 5;
        } else if (_valor2 >= 13 && _valor2 <= 14) {
          color = 4;
        } else if (_valor2 >= 9 && _valor2 <= 12) {
          color = 3;
        } else if (_valor2 >= 5 && _valor2 <= 8) {
          color = 2;
        } else {
          color = 1;
        }

        if (this.presion > 200) {
          presionm = 1;
        } else if (this.presion < 70) {
          presionm = 2;
        } else if (this.presion >= 71 && this.presion <= 80 || this.presion >= 101 && this.presion <= 199) {
          presionm = 3;
        } else if (this.presion >= 81 && this.presion <= 100) {
          presionm = 5;
        }

        if (this.frecuenciac >= 30) {
          frecuenciam = 1;
        } else if (this.frecuenciac <= 8) {
          frecuenciam = 2;
        } else if (this.frecuenciac >= 15 && this.frecuenciac <= 20) {
          frecuenciam = 3;
        } else if (this.frecuenciac >= 9 && this.frecuenciac <= 14) {
          frecuenciam = 5;
        }

        if (this.temperatura >= 38.6) {
          temperaturam = 1;
        } else if (this.temperatura <= 35) {
          temperaturam = 2;
        } else if (this.temperatura >= 35.1 && this.temperatura <= 36 || this.temperatura >= 38 && this.temperatura <= 38.5) {
          temperaturam = 3;
        } else if (this.temperatura >= 36.1 && this.temperatura <= 37.9) {
          temperaturam = 5;
        }

        if (this.frecuenciav >= 131) {
          frecuenciavm = 1;
        } else if (this.frecuenciav <= 40 || this.frecuenciav >= 111 && this.frecuenciav <= 130) {
          frecuenciavm = 2;
        } else if (this.frecuenciav >= 41 && this.frecuenciav <= 50 || this.frecuenciav >= 101 && this.frecuenciav <= 110) {
          frecuenciavm = 3;
        } else if (this.frecuenciav >= 51 && this.frecuenciav <= 100) {
          frecuenciavm = 5;
        }

        console.log(presionm + " " + frecuenciam + " " + temperaturam + " " + frecuenciavm);
        ceb = (parseInt(presionm) + parseInt(frecuenciam) + parseInt(temperaturam) + parseInt(frecuenciavm)) / 4;

        if (ceb < color) {
          color = ceb;
        }
      }

      if (color == 1) {
        resultado = "ROJO";
        tipo = "red";
      } else if (color == 2) {
        resultado = "NARANJA";
        tipo = "orange";
      } else if (color == 3) {
        resultado = "AMARILLO";
        tipo = "yellow";
      } else if (color == 4) {
        resultado = "VERDE";
        tipo = "green";
      } else {
        resultado = "AZUL";
        tipo = "blue";
      }

      return [resultado, tipo, color];
    }
  },
=======
      lista: [],
      total: 1,
      fechainicio: moment().format('YYYY-MM-DD'),
      fechafin: moment().format('YYYY-MM-DD')
    };
  },
>>>>>>> 1ec3673d8f99dd430b4d57edc31e363022c96122
  methods: {
    listar: function listar() {
      var _this = this;

      axios.get("/vista/listar?inicio=" + this.fechainicio + "&fin=" + this.fechafin).then(function (res) {
        _this.lista = [];
        _this.total = 999999999999;

        _this.lista.push({
          label: res.data.rojo + ' De Color Rojo',
          value: res.data.rojo,
          color: 'red'
        });

        _this.lista.push({
          label: res.data.naranja + ' De Color Naranja',
          value: res.data.naranja,
          color: 'orange'
        });

<<<<<<< HEAD
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/triaje/listarpolitraumatismos").then(function (res) {
        _this4.politraumatismos = res.data;
      });
    },
    abrir: function abrir(tr) {
      this.id = tr.TTJV_id_persona;
      this.ida = tr.TTJV_id_atencion;
      this.idt = tr.TTJV_id_turnos;
      this.rp = tr;
      this.buscar = tr.nombrescompletos;
      var valor = tr.TTJV_PersonaFhr;
      var edad = moment(moment(valor).format("YYYYMMDD"), "YYYYMMDD").fromNow();
      var element = edad.match(/\d+/);

      if (element < 18) {
        this.edad = 1;
      }

      $(".menuescoger").hide();
    },
    validar: function validar() {
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

      if (!this.caso) {
        this.errorcaso.push("Ingresar caso");
        this.error = 1;
      }

      if (!this.motivo) {
        this.errormotivo.push("Ingresar motivo");
        this.error = 1;
      }

      if (!this.presion) {
        this.errorpresion.push("Ingresar presión arterial");
        this.error = 1;
      }

      if (!this.frecuenciac) {
        this.errorfrecuenciac.push("Ingresar fecuencia cardiaca");
        this.error = 1;
      }

      if (!this.temperatura) {
        this.errortemperatura.push("Ingresar temperatura corporal");
        this.error = 1;
      }

      if (!this.frecuenciav) {
        this.errorfrecuenciav.push("Ingresar frecuencia ventilatoria");
        this.error = 1;
      }

      if (!this.sistolica) {
        this.errorsistolica.push("Ingresar presión sistólica");
        this.error = 1;
      }

      if (!this.politraumatismo) {
        if (!this.ocular) {
          this.errorocular.push("Ingresar Respuesta apertura ocular");
          this.error = 1;
        }

        if (!this.verbal) {
          this.errorverbal.push("Ingresar Respuesta verbal");
          this.error = 1;
        }

        if (!this.motora) {
          this.errormotora.push("Ingresar Mejor respuesta motora");
          this.error = 1;
        }
      }

      if (this.error) {
        setTimeout(function () {
          var valor = $(".invalid-feedback:first-child").offset().top - 200;
          $("html, body").animate({
            scrollTop: valor
          }, 500);
        }, 50);
      }

      return this.error;
    },
    guardar: function guardar() {
      var _this5 = this;

      if (this.validar()) {
        return;
      }

      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/triaje/guardar", {
        id: this.id,
        ida: this.ida,
        idt: this.idt,
        caso: this.caso,
        motivo: this.motivo,
        politraumatismo: this.politraumatismo,
        observacion: this.observacion,
        ocular: this.ocular,
        verbal: this.verbal,
        motora: this.motora,
        presion: this.presion,
        frecuenciac: this.frecuenciac,
        temperatura: this.temperatura,
        frecuenciav: this.frecuenciav,
        color: this.color[2]
      }).then(function (res) {
        _this5.id = 0;
        alertify.success('Triaje Creado exitosamente');

        _this5.$router.push("/resultados");
=======
        _this.lista.push({
          label: res.data.amarillo + ' De Color Amarillo',
          value: res.data.amarillo,
          color: 'yellow'
        });

        _this.lista.push({
          label: res.data.verde + ' De Color Verde',
          value: res.data.verde,
          color: 'green'
        });

        _this.lista.push({
          label: res.data.azul + ' De Color Azul',
          value: res.data.azul,
          color: 'blue'
        });

        _this.total = res.data.total;
      })["catch"](function (err) {
        console.log(err);
>>>>>>> 1ec3673d8f99dd430b4d57edc31e363022c96122
      });
    }
  },
  mounted: function mounted() {
    this.listar();
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Vista.vue?vue&type=style&index=0&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/componentes/Vista.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.cdc{\n    width: 35em!important;\n    padding-bottom: 35em!important;\n} \n", ""]);

// exports


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

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Vista.vue?vue&type=style&index=0&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/componentes/Vista.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Vista.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Vista.vue?vue&type=style&index=0&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Vista.vue?vue&type=template&id=0fbb27d0&":
/*!*************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/src/componentes/Vista.vue?vue&type=template&id=0fbb27d0& ***!
  \*************************************************************************************************************************************************************************************************************/
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
          _c("div", { staticClass: "row justify-content-md-center" }, [
            _c("div", { staticClass: "col-lg-4 mb-4 justify-content-end" }, [
              _c("div", { staticClass: "input-group mb-3" }, [
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fechainicio,
                      expression: "fechainicio"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "date",
                    placeholder: "Buscar..",
                    "aria-describedby": "basic-addon2"
                  },
                  domProps: { value: _vm.fechainicio },
                  on: {
                    change: function($event) {
                      return _vm.listar()
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.fechainicio = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
<<<<<<< HEAD
                _vm.buscar
                  ? _c(
                      "div",
                      { staticClass: "menuescoger" },
                      [
                        _vm.pacientes.length
                          ? _vm._l(_vm.pacientes, function(tr, index) {
                              return _c(
                                "ul",
                                {
                                  key: index,
                                  on: {
                                    click: function($event) {
                                      return _vm.abrir(tr)
                                    }
                                  }
                                },
                                [
                                  _c("li", [
                                    _c(
                                      "span",
                                      {
                                        staticStyle: {
                                          "font-weight": "bold",
                                          "font-size": "15px"
                                        }
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
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "span",
                                      { staticClass: "posicion" },
                                      [
                                        tr.TTJV_PersonaIdentificacion
                                          ? [
                                              _c("span", [
                                                _vm._v(
                                                  "Cédula:  " +
                                                    _vm._s(
                                                      tr.TTJV_PersonaIdentificacion
                                                    ) +
                                                    " "
                                                )
                                              ]),
                                              _vm._v(" | ")
                                            ]
                                          : _vm._e(),
                                        _vm._v(" "),
                                        tr.TTJV_PersonaTelefono
                                          ? [
                                              _c("span", [
                                                _vm._v(
                                                  "Teléfono:  " +
                                                    _vm._s(
                                                      tr.TTJV_PersonaTelefono
                                                    ) +
                                                    " "
                                                )
                                              ]),
                                              _vm._v(" | ")
                                            ]
                                          : tr.TTJV_PersonaCelular
                                          ? [
                                              _c("span", [
                                                _vm._v(
                                                  "Celular: " +
                                                    _vm._s(
                                                      tr.TTJV_PersonaCelular
                                                    ) +
                                                    " "
                                                )
                                              ]),
                                              _vm._v(" | ")
                                            ]
                                          : _vm._e(),
                                        _vm._v(" "),
                                        tr.TTJV_PersonaSexo
                                          ? [
                                              _c("span", [
                                                _vm._v(
                                                  "Género: " +
                                                    _vm._s(tr.TTJV_PersonaSexo)
                                                )
                                              ])
                                            ]
                                          : _vm._e()
                                      ],
                                      2
                                    )
                                  ])
                                ]
                              )
                            })
                          : [_vm._m(1)]
                      ],
                      2
                    )
                  : _vm._e()
              ]
            )
          ]),
          _vm._v(" "),
          _vm.id == 0
            ? _c("div", { staticClass: "row" }, [_vm._m(2)])
            : _c(
                "div",
                { staticClass: "row" },
                [
                  _c(
                    "div",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.edad,
                          expression: "edad"
                        }
                      ],
                      staticClass: "alert alert-warning text-center mb-4 w-100",
                      attrs: { role: "alert" }
                    },
                    [
                      _vm._v(
                        "\n                        ESTE ES UNA ATENCIÓN DE NIÑOS\n                    "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c("vs-divider", { staticClass: "estilotitulo" }, [
                    _vm._v(
                      "\n                        DATOS DE USUARIO\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-12" }, [
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col-xl-6 col-lg-6 col-md-12" },
                        [
                          _c(
                            "vs-list",
                            [
                              _c("vs-list-item", {
                                attrs: {
                                  title: "Nombres completos",
                                  subtitle: _vm.rp.nombrescompletos
                                }
                              }),
                              _vm._v(" "),
                              _vm.rp.TTJV_PersonaTelefono
                                ? _c("vs-list-item", {
                                    attrs: {
                                      title: "Teléfono",
                                      subtitle: _vm.rp.TTJV_PersonaTelefono
                                    }
                                  })
                                : _c("vs-list-item", {
                                    attrs: {
                                      title: "Celular",
                                      subtitle: _vm.rp.TTJV_PersonaCelular
                                    }
                                  }),
                              _vm._v(" "),
                              _c("vs-list-item", {
                                attrs: {
                                  title: "Dirección",
                                  subtitle: _vm.rp.TTJV_PersonaDireccion
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-xl-6 col-lg-6 col-md-12" },
                        [
                          _c(
                            "vs-list",
                            [
                              _c("vs-list-item", {
                                attrs: {
                                  title: "Número de cédula",
                                  subtitle: _vm.rp.TTJV_PersonaIdentificacion
                                }
                              }),
                              _vm._v(" "),
                              _c("vs-list-item", {
                                attrs: {
                                  title: "Sexo",
                                  subtitle: _vm.rp.TTJV_PersonaSexo
                                }
                              }),
                              _vm._v(" "),
                              _c("vs-list-item", {
                                attrs: {
                                  title: "Fecha de nacimiento",
                                  subtitle: _vm._f("fecha")(
                                    _vm.rp.TTJV_PersonaFhr
                                  )
                                }
                              })
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("vs-divider", { staticClass: "mt-5 estilotitulo" }, [
                    _vm._v(
                      "\n                        DATOS GENERALES\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "col-xl-4 col-lg-6 col-md-12  mt-4",
                      class: { "col-xl-6": !_vm.caso }
                    },
                    [
                      _c("label", [_vm._v("Caso de consulta")]),
                      _vm._v(" "),
                      _c(
                        "select",
                        {
                          directives: [
                            {
                              name: "model",
                              rawName: "v-model",
                              value: _vm.caso,
                              expression: "caso"
                            }
                          ],
                          staticClass: "form-control",
                          on: {
                            change: [
                              function($event) {
                                var $$selectedVal = Array.prototype.filter
                                  .call($event.target.options, function(o) {
                                    return o.selected
                                  })
                                  .map(function(o) {
                                    var val = "_value" in o ? o._value : o.value
                                    return val
                                  })
                                _vm.caso = $event.target.multiple
                                  ? $$selectedVal
                                  : $$selectedVal[0]
                              },
                              function($event) {
                                _vm.listarmotivos(_vm.caso), (_vm.motivo = "")
                              }
                            ]
                          }
                        },
                        [
                          _c("option", { attrs: { value: "" } }, [
                            _vm._v("Seleccione un Caso")
                          ]),
                          _vm._v(" "),
                          _vm._l(_vm.casos, function(tr, index) {
                            return _c("option", {
                              key: index,
                              domProps: {
                                value: tr.TTJV_id_caso,
                                textContent: _vm._s(tr.TTJV_nombre)
                              }
                            })
                          })
                        ],
                        2
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value: _vm.error,
                              expression: "error"
                            }
                          ]
                        },
                        _vm._l(_vm.errorcaso, function(err) {
                          return _c(
                            "div",
                            {
                              key: err,
                              staticClass: "invalid-feedback",
                              staticStyle: { display: "block" }
                            },
                            [_vm._v(_vm._s(err))]
                          )
                        }),
                        0
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _vm.caso
                    ? _c(
                        "div",
                        { staticClass: "col-xl-4 col-lg-6 col-md-12  mt-4" },
                        [
                          _c("label", [_vm._v("Motivo de consulta")]),
                          _vm._v(" "),
                          _c(
                            "select",
                            {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.motivo,
                                  expression: "motivo"
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
                                      var val =
                                        "_value" in o ? o._value : o.value
                                      return val
                                    })
                                  _vm.motivo = $event.target.multiple
                                    ? $$selectedVal
                                    : $$selectedVal[0]
                                }
                              }
                            },
                            [
                              _c("option", { attrs: { value: "" } }, [
                                _vm._v("Seleccione un Motivo")
                              ]),
                              _vm._v(" "),
                              _vm._l(_vm.motivos, function(tr, index) {
                                return _c("option", {
                                  key: index,
                                  domProps: {
                                    value: tr.TTJV_id_motivo_consulta,
                                    textContent: _vm._s(tr.TTJV_nombre)
                                  }
                                })
                              })
                            ],
                            2
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              directives: [
                                {
                                  name: "show",
                                  rawName: "v-show",
                                  value: _vm.error,
                                  expression: "error"
                                }
                              ]
                            },
                            _vm._l(_vm.errormotivo, function(err) {
                              return _c(
                                "div",
                                {
                                  key: err,
                                  staticClass: "invalid-feedback",
                                  staticStyle: { display: "block" }
                                },
                                [_vm._v(_vm._s(err))]
                              )
                            }),
                            0
                          )
                        ]
                      )
                    : _vm._e(),
                  _vm._v(" "),
                  _c(
                    "div",
=======
                _vm._m(0)
              ])
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "col-lg-4 mb-4 justify-content-end" }, [
              _c("div", { staticClass: "input-group mb-3" }, [
                _c("input", {
                  directives: [
>>>>>>> 1ec3673d8f99dd430b4d57edc31e363022c96122
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.fechafin,
                      expression: "fechafin"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "date",
                    placeholder: "Buscar..",
                    "aria-describedby": "basic-addon2"
                  },
                  domProps: { value: _vm.fechafin },
                  on: {
                    change: function($event) {
                      return _vm.listar()
                    },
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
<<<<<<< HEAD
                    })
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-xl-12" }, [
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "div",
                        { staticClass: "col-xl-12 col-sm-12" },
                        [
                          _c(
                            "vs-divider",
                            { staticClass: "mt-5 estilotitulo" },
                            [
                              _vm._v(
                                "\n                                    SIGNOS VITALES\n                                "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "col-xl-12" }, [
                            _c(
                              "div",
                              { staticClass: "row justify-content-md-center" },
                              [
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "col-xl-4 col-lg-6 col-md-12  mt-4"
                                  },
                                  [
                                    _c("label", [_vm._v("Presion arterial")]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.presion,
                                          expression: "presion"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        onkeypress: "return solonumeros(event)",
                                        maxlength: "5"
                                      },
                                      domProps: { value: _vm.presion },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.presion = $event.target.value
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value: _vm.error,
                                            expression: "error"
                                          }
                                        ]
                                      },
                                      _vm._l(_vm.errorpresion, function(err) {
                                        return _c(
                                          "div",
                                          {
                                            key: err,
                                            staticClass: "invalid-feedback",
                                            staticStyle: { display: "block" }
                                          },
                                          [_vm._v(_vm._s(err))]
                                        )
                                      }),
                                      0
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "col-xl-4 col-lg-6 col-md-12  mt-4"
                                  },
                                  [
                                    _c("label", [
                                      _vm._v("Frecuencia Cardiaca(Pulso)")
                                    ]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.frecuenciac,
                                          expression: "frecuenciac"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        onkeypress: "return solonumeros(event)",
                                        maxlength: "5"
                                      },
                                      domProps: { value: _vm.frecuenciac },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.frecuenciac = $event.target.value
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value: _vm.error,
                                            expression: "error"
                                          }
                                        ]
                                      },
                                      _vm._l(_vm.errorfrecuenciac, function(
                                        err
                                      ) {
                                        return _c(
                                          "div",
                                          {
                                            key: err,
                                            staticClass: "invalid-feedback",
                                            staticStyle: { display: "block" }
                                          },
                                          [_vm._v(_vm._s(err))]
                                        )
                                      }),
                                      0
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "col-xl-4 col-lg-6 col-md-12  mt-4"
                                  },
                                  [
                                    _c("label", [
                                      _vm._v("Temperatura Corporal")
                                    ]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.temperatura,
                                          expression: "temperatura"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        onkeypress: "return solonumeros(event)",
                                        maxlength: "5"
                                      },
                                      domProps: { value: _vm.temperatura },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.temperatura = $event.target.value
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value: _vm.error,
                                            expression: "error"
                                          }
                                        ]
                                      },
                                      _vm._l(_vm.errortemperatura, function(
                                        err
                                      ) {
                                        return _c(
                                          "div",
                                          {
                                            key: err,
                                            staticClass: "invalid-feedback",
                                            staticStyle: { display: "block" }
                                          },
                                          [_vm._v(_vm._s(err))]
                                        )
                                      }),
                                      0
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "col-xl-4 col-lg-6 col-md-12  mt-4"
                                  },
                                  [
                                    _c("label", [
                                      _vm._v("Frecuencia Ventilatoria")
                                    ]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.frecuenciav,
                                          expression: "frecuenciav"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        onkeypress: "return solonumeros(event)",
                                        maxlength: "5"
                                      },
                                      domProps: { value: _vm.frecuenciav },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.frecuenciav = $event.target.value
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value: _vm.error,
                                            expression: "error"
                                          }
                                        ]
                                      },
                                      _vm._l(_vm.errorfrecuenciav, function(
                                        err
                                      ) {
                                        return _c(
                                          "div",
                                          {
                                            key: err,
                                            staticClass: "invalid-feedback",
                                            staticStyle: { display: "block" }
                                          },
                                          [_vm._v(_vm._s(err))]
                                        )
                                      }),
                                      0
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "col-xl-4 col-lg-6 col-md-12  mt-4"
                                  },
                                  [
                                    _c("label", [_vm._v("Presión Sistólica")]),
                                    _vm._v(" "),
                                    _c("input", {
                                      directives: [
                                        {
                                          name: "model",
                                          rawName: "v-model",
                                          value: _vm.sistolica,
                                          expression: "sistolica"
                                        }
                                      ],
                                      staticClass: "form-control",
                                      attrs: {
                                        type: "text",
                                        onkeypress: "return solonumeros(event)",
                                        maxlength: "5"
                                      },
                                      domProps: { value: _vm.sistolica },
                                      on: {
                                        input: function($event) {
                                          if ($event.target.composing) {
                                            return
                                          }
                                          _vm.sistolica = $event.target.value
                                        }
                                      }
                                    }),
                                    _vm._v(" "),
                                    _c(
                                      "div",
                                      {
                                        directives: [
                                          {
                                            name: "show",
                                            rawName: "v-show",
                                            value: _vm.error,
                                            expression: "error"
                                          }
                                        ]
                                      },
                                      _vm._l(_vm.errorsistolica, function(err) {
                                        return _c(
                                          "div",
                                          {
                                            key: err,
                                            staticClass: "invalid-feedback",
                                            staticStyle: { display: "block" }
                                          },
                                          [_vm._v(_vm._s(err))]
                                        )
                                      }),
                                      0
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "col-xl-12 col-sm-12" },
                        [
                          _c(
                            "vs-divider",
                            { staticClass: "mt-5 estilotitulo" },
                            [
                              _vm._v(
                                "\n                                    ESCALA DE GLASOW\n                                "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "col-xl-12 col-lg-12 col-md-12  mt-4"
                            },
                            [
                              _c("label", [
                                _vm._v("Respuesta apertura ocular")
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "col-xl-12" }, [
                                _c("div", { staticClass: "row" }, [
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "ocular",
                                            "vs-value": "4"
                                          },
                                          model: {
                                            value: _vm.ocular,
                                            callback: function($$v) {
                                              _vm.ocular = $$v
                                            },
                                            expression: "ocular"
                                          }
                                        },
                                        [_vm._v("Espontanea")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "ocular",
                                            "vs-value": "3"
                                          },
                                          model: {
                                            value: _vm.ocular,
                                            callback: function($$v) {
                                              _vm.ocular = $$v
                                            },
                                            expression: "ocular"
                                          }
                                        },
                                        [_vm._v("A órdenes verbales")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "ocular",
                                            "vs-value": "2"
                                          },
                                          model: {
                                            value: _vm.ocular,
                                            callback: function($$v) {
                                              _vm.ocular = $$v
                                            },
                                            expression: "ocular"
                                          }
                                        },
                                        [_vm._v("A estímulo doloroso")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "ocular",
                                            "vs-value": "1"
                                          },
                                          model: {
                                            value: _vm.ocular,
                                            callback: function($$v) {
                                              _vm.ocular = $$v
                                            },
                                            expression: "ocular"
                                          }
                                        },
                                        [_vm._v("No hay respuesta")]
                                      )
                                    ],
                                    1
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.error,
                                      expression: "error"
                                    }
                                  ]
                                },
                                _vm._l(_vm.errorocular, function(err) {
                                  return _c(
                                    "div",
                                    {
                                      key: err,
                                      staticClass: "invalid-feedback",
                                      staticStyle: { display: "block" }
                                    },
                                    [_vm._v(_vm._s(err))]
                                  )
                                }),
                                0
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "col-xl-12 col-lg-12 col-md-12  mt-4"
                            },
                            [
                              _c("label", [_vm._v("Respuesta verbal")]),
                              _vm._v(" "),
                              _c("div", { staticClass: "col-xl-12" }, [
                                _c("div", { staticClass: "row" }, [
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "verbal",
                                            "vs-value": "5"
                                          },
                                          model: {
                                            value: _vm.verbal,
                                            callback: function($$v) {
                                              _vm.verbal = $$v
                                            },
                                            expression: "verbal"
                                          }
                                        },
                                        [_vm._v("Orientada")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "verbal",
                                            "vs-value": "4"
                                          },
                                          model: {
                                            value: _vm.verbal,
                                            callback: function($$v) {
                                              _vm.verbal = $$v
                                            },
                                            expression: "verbal"
                                          }
                                        },
                                        [_vm._v("Confusa")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "verbal",
                                            "vs-value": "3"
                                          },
                                          model: {
                                            value: _vm.verbal,
                                            callback: function($$v) {
                                              _vm.verbal = $$v
                                            },
                                            expression: "verbal"
                                          }
                                        },
                                        [_vm._v("Palabras inapropiadas")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "verbal",
                                            "vs-value": "2"
                                          },
                                          model: {
                                            value: _vm.verbal,
                                            callback: function($$v) {
                                              _vm.verbal = $$v
                                            },
                                            expression: "verbal"
                                          }
                                        },
                                        [_vm._v("Sonidos incomprensibles")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "verbal",
                                            "vs-value": "1"
                                          },
                                          model: {
                                            value: _vm.verbal,
                                            callback: function($$v) {
                                              _vm.verbal = $$v
                                            },
                                            expression: "verbal"
                                          }
                                        },
                                        [_vm._v("No hay respuesta")]
                                      )
                                    ],
                                    1
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.error,
                                      expression: "error"
                                    }
                                  ]
                                },
                                _vm._l(_vm.errorverbal, function(err) {
                                  return _c(
                                    "div",
                                    {
                                      key: err,
                                      staticClass: "invalid-feedback",
                                      staticStyle: { display: "block" }
                                    },
                                    [_vm._v(_vm._s(err))]
                                  )
                                }),
                                0
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "div",
                            {
                              staticClass: "col-xl-12 col-lg-12 col-md-12  mt-4"
                            },
                            [
                              _c("label", [_vm._v("Mejor respuesta motora")]),
                              _vm._v(" "),
                              _c("div", { staticClass: "col-xl-12" }, [
                                _c("div", { staticClass: "row" }, [
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "motora",
                                            "vs-value": "6"
                                          },
                                          model: {
                                            value: _vm.motora,
                                            callback: function($$v) {
                                              _vm.motora = $$v
                                            },
                                            expression: "motora"
                                          }
                                        },
                                        [_vm._v("Obedece órdenes")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "motora",
                                            "vs-value": "5"
                                          },
                                          model: {
                                            value: _vm.motora,
                                            callback: function($$v) {
                                              _vm.motora = $$v
                                            },
                                            expression: "motora"
                                          }
                                        },
                                        [_vm._v("Localiza el dolor")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "motora",
                                            "vs-value": "4"
                                          },
                                          model: {
                                            value: _vm.motora,
                                            callback: function($$v) {
                                              _vm.motora = $$v
                                            },
                                            expression: "motora"
                                          }
                                        },
                                        [_vm._v("Retira el dolor")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "motora",
                                            "vs-value": "3"
                                          },
                                          model: {
                                            value: _vm.motora,
                                            callback: function($$v) {
                                              _vm.motora = $$v
                                            },
                                            expression: "motora"
                                          }
                                        },
                                        [_vm._v("Flexión anormal")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "motora",
                                            "vs-value": "2"
                                          },
                                          model: {
                                            value: _vm.motora,
                                            callback: function($$v) {
                                              _vm.motora = $$v
                                            },
                                            expression: "motora"
                                          }
                                        },
                                        [_vm._v("Respuesta en extensión")]
                                      )
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "div",
                                    { staticClass: "col" },
                                    [
                                      _c(
                                        "vs-radio",
                                        {
                                          staticClass: "mr-2",
                                          attrs: {
                                            "vs-name": "motora",
                                            "vs-value": "1"
                                          },
                                          model: {
                                            value: _vm.motora,
                                            callback: function($$v) {
                                              _vm.motora = $$v
                                            },
                                            expression: "motora"
                                          }
                                        },
                                        [_vm._v("No movimientos")]
                                      )
                                    ],
                                    1
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c(
                                "div",
                                {
                                  directives: [
                                    {
                                      name: "show",
                                      rawName: "v-show",
                                      value: _vm.error,
                                      expression: "error"
                                    }
                                  ]
                                },
                                _vm._l(_vm.errormotora, function(err) {
                                  return _c(
                                    "div",
                                    {
                                      key: err,
                                      staticClass: "invalid-feedback",
                                      staticStyle: { display: "block" }
                                    },
                                    [_vm._v(_vm._s(err))]
                                  )
                                }),
                                0
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ])
                  ]),
                  _vm._v(" "),
                  _c("vs-divider", { staticClass: "mt-6 estilotitulo" }, [
                    _vm._v(
                      "\n                        RESULTADOS\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-xl-12 mt-5 text-center" }, [
                    _c("h1", [
                      _vm._v("EL RESULADO ES: "),
                      _c("span", { style: "color:" + _vm.color[1] }, [
                        _vm._v("EMERGENCIA DE COLOR " + _vm._s(_vm.color[0]))
                      ])
                    ])
                  ]),
                  _vm._v(" "),
                  _c("div", { staticClass: "col-xl-12 mt-5" }, [
                    _c("div", { staticClass: "row" }, [
                      _c(
                        "button",
                        {
                          staticClass: "btn btn-primary w-100",
                          on: {
                            click: function($event) {
                              return _vm.guardar()
                            }
                          }
                        },
                        [_vm._v("Guardar")]
                      )
                    ])
                  ])
                ],
                1
=======
                      _vm.fechafin = $event.target.value
                    }
                  }
                }),
                _vm._v(" "),
                _vm._m(1)
              ])
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            [
              _c(
                "vc-donut",
                {
                  attrs: {
                    background: "white",
                    foreground: "grey",
                    size: 200,
                    unit: "px",
                    thickness: 30,
                    "has-legend": "",
                    "legend-placement": "top",
                    sections: _vm.lista,
                    total: _vm.total,
                    "start-angle": 0
                  }
                },
                [_c("h1", [_vm._v(_vm._s(_vm.total) + " Resultados")])]
>>>>>>> 1ec3673d8f99dd430b4d57edc31e363022c96122
              )
            ],
            1
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c(
        "span",
        { staticClass: "input-group-text", attrs: { id: "basic-addon2" } },
        [
          _vm._v(
            "\n                                    Fecha de inicio\n                                "
          )
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "input-group-append" }, [
      _c(
        "span",
        { staticClass: "input-group-text", attrs: { id: "basic-addon2" } },
        [
          _vm._v(
            "\n                                    Fecha de finalización\n                                "
          )
        ]
      )
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/src/componentes/Vista.vue":
/*!************************************************!*\
  !*** ./resources/js/src/componentes/Vista.vue ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vista_vue_vue_type_template_id_0fbb27d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vista.vue?vue&type=template&id=0fbb27d0& */ "./resources/js/src/componentes/Vista.vue?vue&type=template&id=0fbb27d0&");
/* harmony import */ var _Vista_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vista.vue?vue&type=script&lang=js& */ "./resources/js/src/componentes/Vista.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Vista_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Vista.vue?vue&type=style&index=0&lang=css& */ "./resources/js/src/componentes/Vista.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Vista_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Vista_vue_vue_type_template_id_0fbb27d0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Vista_vue_vue_type_template_id_0fbb27d0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/src/componentes/Vista.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/src/componentes/Vista.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/src/componentes/Vista.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./Vista.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Vista.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/src/componentes/Vista.vue?vue&type=style&index=0&lang=css&":
/*!*********************************************************************************!*\
  !*** ./resources/js/src/componentes/Vista.vue?vue&type=style&index=0&lang=css& ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/style-loader!../../../../node_modules/css-loader??ref--6-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--6-2!../../../../node_modules/vue-loader/lib??vue-loader-options!./Vista.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Vista.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/src/componentes/Vista.vue?vue&type=template&id=0fbb27d0&":
/*!*******************************************************************************!*\
  !*** ./resources/js/src/componentes/Vista.vue?vue&type=template&id=0fbb27d0& ***!
  \*******************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_template_id_0fbb27d0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./Vista.vue?vue&type=template&id=0fbb27d0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/src/componentes/Vista.vue?vue&type=template&id=0fbb27d0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_template_id_0fbb27d0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Vista_vue_vue_type_template_id_0fbb27d0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);