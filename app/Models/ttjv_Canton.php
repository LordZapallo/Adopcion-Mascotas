<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Canton extends Model
{
    protected $table='ttjv_canton';
    protected $primaryKey='TTJV_cod_canton';
    protected $fillable = ['TTJV_descripcion', 'TTJV_cod_provincia'];
    public $timestamps = false;
}
