<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Etnia extends Model
{
    protected $table='ttjv_etnia';
    protected $primaryKey='TTJV_codetnia';
    protected $fillable = ['TTJV_descripcion'];
    public $timestamps = false;
}
