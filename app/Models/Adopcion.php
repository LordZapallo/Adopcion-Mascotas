<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Adopcion extends Model
{
    protected $table = 'adopcion';
    protected $primaryKey = 'id_adopcion';
    protected $fillable = [
        'fecha_emision',
        'fecha_finalizacion',
        'estado',
        'referencia_personal_nombre',
        'referencia_personal_parentesco',
        'referencia_personal_telefono',
        'familiares_numero',
        'familiares_enfermedad',
        'domicilio_tipo',
        'domicilio_estatus',
        'domicilio_metros',
        'anterior_mascota_nombre1',
        'anterior_mascota_sexo1',
        'anterior_mascota_esterilizacion1',
        'anterior_mascota_estado1',
        'anterior_mascota_nombre2',
        'anterior_mascota_sexo2',
        'anterior_mascota_esterilizacion2',
        'anterior_mascota_estado2',
        'porque_adoptar',
        'cambio_domicilio',
        'tiempo_mascota',
        'donde_pasara_mascota',
        'donde_dormira_mascota',
        'donde_necesidades_mascota',
        'tipo_comida_mascota',
        'si_mascota_enferma',
        'responsable_gastos_mascota',
        'gasto_estimado_mensual',
        'visita_periodica',
        'esterilizacion',
        'informacion_adicional',
        'adopcion_compartida',
        'estado_familia',
        'observaciones',
        'created_at',
        'updated_at',
        'id_solicitante',
        'id_supervisor',
        'id_mascota',
        'id_albergue'
    ];
}
