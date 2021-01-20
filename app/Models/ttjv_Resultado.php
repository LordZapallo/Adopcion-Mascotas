<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Resultado extends Model
{
    protected $table='ttjv_resultados';
    protected $primaryKey='TTJV_id_resultado';
    protected $fillable = ['TTJV_color', 'TTJV_tratamiento', 'TTJV_proxima_cita', 'TTJV_plan', 'TTJV_id_persona', 'TTJV_id_turno', 'TTJV_id_triaje'];
    public $timestamps = false;
}
