<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Atencion extends Model
{
    protected $table='ttjv_atencion';
    protected $primaryKey='TTJV_id_atencion';
    protected $fillable = ['TTJV_servicio', 'TTJV_fecha', 'TTJV_id_persona', 'TTJV_id_usuario'];
    public $timestamps = false;
}
