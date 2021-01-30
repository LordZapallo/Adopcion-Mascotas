<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

//Permisos rutas principales
Auth::routes();

//Sesion del backend
Route::get('/sesion/recuperar', 'SesionController@recuperar');
Route::get('/sesion/roles', 'SesionController@roles');

//mascota
Route::get('/mascotas/listar', 'MascotaController@listar');
Route::get('/ficha/listar', 'MascotaController@listarficha');
//albergue
Route::get('/albergue/listar/general', 'AlbergueController@listar_general');
//adopcion
Route::get('/adopcion/listar', 'AdopcionController@listar');



//CRUD Usuarios
Route::get('/usuarios/listar', 'UsuarioController@listar');
Route::post('/usuarios/guardar', 'UsuarioController@guardar');
Route::put('/usuarios/editar', 'UsuarioController@editar');
Route::delete('/usuarios/eliminar/{id}', 'UsuarioController@eliminar');
Route::get('/usuario/excel', 'UsuarioController@excel');
Route::get('/usuario/pdf', 'UsuarioController@pdf');

//CRUD Accesos
Route::get('/accesos/listar', 'AccesosController@listar');
Route::post('/accesos/guardar/{id}', 'AccesosController@guardar');

//CRUD Turnos
Route::get('/turnos/listar', 'ttjv_TurnosController@listar');
Route::delete('/turnos/eliminar/{id}', 'ttjv_TurnosController@eliminar');
Route::post('/turnos/ingreso', 'ttjv_TurnosController@ingreso');
Route::post('/turnos/ausente', 'ttjv_TurnosController@ausente');
Route::post('/turnos/reactivar', 'ttjv_TurnosController@reactivar');
Route::post('/turnos/volver', 'ttjv_TurnosController@volver');
Route::get('/turnos/excel', 'ttjv_TurnosController@excel');
Route::get('/turnos/pdf', 'ttjv_TurnosController@pdf');
Route::get('/turno/pdf/{idt}', 'ttjv_TurnosController@pdft');

//CRUD Atención
Route::get('/atencion/listar', 'ttjv_AtencionController@listar');
Route::delete('/atencion/eliminar/{id}', 'ttjv_AtencionController@eliminar');
Route::put('/atencion/editar', 'ttjv_AtencionController@editar');
Route::put('/atencion/guardar', 'ttjv_AtencionController@guardar');
Route::post('/atencion/desactivar/{id}', 'ttjv_AtencionController@desactivar');
Route::post('/atencion/activar/{id}', 'ttjv_AtencionController@activar');
Route::get('/atencion/excel', 'ttjv_AtencionController@excel');
Route::get('/atencion/pdf', 'ttjv_AtencionController@pdf');

//CRUD Triaje
Route::get('/triaje/listar', 'ttjv_TriajeController@listar');
Route::get('/triaje/listarcasos', 'ttjv_TriajeController@listarcasos');
Route::get('/triaje/listarmotivos/{id}', 'ttjv_TriajeController@listarmotivos');
Route::get('/triaje/listarpolitraumatismos', 'ttjv_TriajeController@listarpolitraumatismos');
Route::post('/triaje/guardar', 'ttjv_TriajeController@guardar');

//CRUD Persona (pacientes)
Route::get('/persona/listar', 'ttjv_PersonaController@listar');
Route::get('/persona/listetnia', 'ttjv_PersonaController@getetnia');
Route::get('/persona/listgrupetario', 'ttjv_PersonaController@getgrupetario');
Route::get('/persona/listprovincia', 'ttjv_PersonaController@getprov');
Route::get('/persona/listcanton/{cod}', 'ttjv_PersonaController@getcanton');
Route::get('/persona/todos', 'ttjv_PersonaController@todos');
Route::post('/pacientes/guardar', 'ttjv_PersonaController@store');
Route::post('/pacientes/guardaremergency', 'ttjv_PersonaController@storeemergency');
Route::post('/pacientes/editar', 'ttjv_PersonaController@edit');
Route::delete('/pacientes/eliminar/{id}', 'ttjv_PersonaController@delete');
Route::get('/persona/excel', 'ttjv_PersonaController@excel');
Route::get('/persona/pdf', 'ttjv_PersonaController@pdf');
//CRUD Actualizar (pacientes)
Route::get('/personass/listar', 'ttjv_ActualizarController@listar');
Route::get('/personass/listetnia', 'ttjv_ActualizarController@getetnia');
Route::get('/personass/listgrupetario', 'ttjv_ActualizarController@getgrupetario');
Route::get('/personass/listprovincia', 'ttjv_ActualizarController@getprov');
Route::get('/personass/listcanton/{cod}', 'ttjv_ActualizarController@getcanton');
Route::get('/personass/todos', 'ttjv_ActualizarController@todos');
Route::post('/pacientess/guardar', 'ttjv_ActualizarController@store');
Route::post('/pacientess/guardaremergency', 'ttjv_ActualizarController@storeemergency');
Route::post('/pacientess/editar', 'ttjv_ActualizarController@edit');
Route::delete('/pacientess/eliminar/{id}', 'ttjv_ActualizarController@delete');
Route::get('/personass/excel', 'ttjv_ActualizarController@excel');
Route::get('/personass/pdf', 'ttjv_ActualizarController@pdf');

//CRUD Resultados
Route::get('/resultados/listar', 'ttjv_ResultadoController@listar');
Route::post('/resultados/up/{id}', 'ttjv_ResultadoController@up');
Route::post('/resultados/down/{id}', 'ttjv_ResultadoController@down');
Route::delete('/resultados/eliminar/{id}', 'ttjv_ResultadoController@eliminar');
Route::get('/resultados/excel', 'ttjv_ResultadoController@excel');
Route::get('/resultados/pdf', 'ttjv_ResultadoController@pdf');
Route::get('/resultados1/pdf', 'ttjv_ResultadoController@pdf1');
Route::get('/resultados2/pdf', 'ttjv_ResultadoController@pdf2');
Route::get('/resultados3/pdf', 'ttjv_ResultadoController@pdf3');
Route::get('/resultados4/pdf', 'ttjv_ResultadoController@pdf4');
Route::get('/resultados5/pdf', 'ttjv_ResultadoController@pdf5');
Route::post('/tratamiento/guardar', 'ttjv_ResultadoController@guardar');

//CRUD Auditoria
Route::get('/auditoria/listar', 'ttjv_AuditoriaController@listar');
Route::get('/auditoria/excel', 'ttjv_AuditoriaController@excel');
Route::get('/auditoria/pdf', 'ttjv_AuditoriaController@pdf');

//CRUD Receta
Route::get('/receta/listar', 'ttjv_RecetaController@listar');
Route::get('/receta/listarturno', 'ttjv_RecetaController@listarturno');
Route::post('/receta/guardar', 'ttjv_RecetaController@guardar');
Route::put('/receta/editar', 'ttjv_RecetaController@editar');
Route::delete('/receta/eliminar/{id}', 'ttjv_RecetaController@eliminar');
Route::get('/receta/excel', 'ttjv_RecetaController@excel');
Route::get('/receta/pdf', 'ttjv_RecetaController@pdf');

//CRUD Vista
Route::get('/vista/listar', 'ttjv_ResultadoController@vercolores');

Route::get('/assets/plugins/popper/popper.min.js.map', function () {
    return redirect('/');
});
//Rutas del FrontEnd (Vuejs)
Route::get('/{any}', 'ApplicationController')->where('any', '.*');
