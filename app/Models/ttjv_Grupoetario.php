<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Grupoetario extends Model
{
    protected $table='ttjv_grupoetario';
    protected $primaryKey='TTJV_id_grupoetario';
    protected $fillable = ['TTJV_descricion'];
    public $timestamps = false;
}
