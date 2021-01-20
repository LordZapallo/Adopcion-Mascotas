<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Provincia extends Model
{
    protected $table='ttjv_provincia';
    protected $primaryKey='TTJV_cod_provincia';
    protected $fillable = ['TTJV_descripcion'];
    public $timestamps = false;
}
