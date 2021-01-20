<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Triaje extends Model 
{
    protected $table='ttjv_triaje';
    protected $primaryKey='TTJV_id_triaje';
    protected $fillable = ['TTJV_presion_arterial', 'TTJV_frecuencia_cardiaca', 'TTJV_temperatura_corporal', 'TTJV_frecuencia_ventilatoria', 'TTJV_respuesta_apertura_ocular', 'TTJV_respuestas_verbal', 'TTJV_mejor_respuestas_motora', 'TTJV_id_persona', 'TTJV_id_caso', 'TTJV_id_motivo_consulta', 'TTJV_id_politraumatismo', 'TTJV_id_usuario'];
    public $timestamps = false;
}
