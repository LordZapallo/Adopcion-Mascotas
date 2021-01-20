<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Persona extends Model
{
    protected $table='ttjv_persona';
    protected $primaryKey='TTJV_id_persona';
    protected $fillable = ['TTJV_PersonaTipoIden', 'TTJV_PersonaIdentificacion', 'TTJV_PersonaApePaterno', 'TTJV_PersonaApeMaterno', 'TTJV_PersonaNombres', 'TTJV_PersonaFchNacimiento', 'TTJV_PersonaSexo', 'TTJV_PersonaEstadoCivil', 'TTJV_PersonaAlergia', 'TTJV_PersonaInterquirugicas', 'TTJV_PersonaVacuCompletas', 'TTJV_PersonaDireccion', 'TTJV_PersonaTelefono', 'TTJV_PersonaEmail', 'TTJV_PersonaOcupacion', 'TTJV_PersonaResponsable', 'TTJV_PersonaFhr', 'TTJV_PersonaUsuario', 'TTJV_PersonaTipoSangre', 'TTJV_PersonaReligion', 'TTJV_PersonaTelefonoTrabajo', 'TTJV_PersonaCelular', 'TTJV_PersonaNacionalidad', 'TTJV_PersonaDiscapacidad', 'TTJV_PersonaOrientacionSexual', 'TTJV_PersonaNombreFamiliar', 'TTJV_PersonaApellidoFamiliar', 'TTJV_PersonaDireccionFamiliar', 'TTJV_PersonaCelularFamiliar', 'TTJV_PersonaEstado', 'TTJV_PersonaEtnia', 'TTJV_PersonaGrupoEtario', 'TTJV_PersonaCanton', 'TTJV_PersonaProvincia', 'id_usuario'];
    public $timestamps = false;
}
