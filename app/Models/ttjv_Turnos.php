<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Turnos extends Model
{
    protected $table='ttjv_turnos';
    protected $primaryKey='TTJV_id_turnos';
    protected $fillable = ['TTJV_codigo', 'TTJV_fecha', 'TTJV_estado', 'TTJV_id_persona', 'TTJV_id_usuario'];
    public $timestamps = false;
}
