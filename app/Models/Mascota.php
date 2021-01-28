<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mascota extends Model
{
    protected $table = 'mascota';
    protected $primaryKey = 'id_mascota';
    protected $fillable = [
        'nombre',
        'imagen',
        'especie',
        'raza',
        'edad',
        'sexo',
        'peso',
        'talla',
        'color',
        'esterilizacion',
        'personalidad',
        'salud_cuidados',
        'informacion_adicional',
        'estado',
        'created_at',
        'updated_at',
        'id_albergue'
    ];
}
