<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ttjv_Receta extends Model
{
    protected $table='ttjv_receta';
    protected $primaryKey='TTJV_id_receta';
    protected $fillable = ['TTJV_medicamento', 'TTJV_presentacion', 'TTJV_dosis', 'TTJV_duracion', 'TTJV_cantidad', 'TTJV_id_resultados'];
    public $timestamps = false;
}
