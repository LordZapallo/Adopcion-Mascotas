<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Roles extends Model
{
    protected $table='ttjv_roles';
    protected $primaryKey='TTJV_id_roles';
    protected $fillable = ['TTJV_ficha_usuario', 'TTJV_acceso_usuario', 'TTJV_auditoria', 'TTJV_paciente', 'TTJV_turno', 'TTJV_atencion', 'TTJV_triaje', 'TTJV_resultados', 'TTJV_receta', 'TTJV_id_usuario'];
    public $timestamps = false;
}
