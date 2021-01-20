<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Auditoria extends Model
{
    protected $table='ttjv_auditoria';
    protected $primaryKey='TTJV_id_auditoria';
    protected $fillable = ['TTJV_accion', 'TTJV_fecha', 'TTJV_modulo', 'TTJV_origen', 'TTJV_id_usuario'];
    public $timestamps = false;
}
