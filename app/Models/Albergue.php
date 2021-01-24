<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Albergue extends Model
{
    protected $table = 'albergue';
    protected $primaryKey = 'id_albergue';
    protected $fillable = [
        'nombre',
        'ubicacion',
        'identificacion',
        'telefono',
        'celular',
        'perfil',
        'mision',
        'informacion_adicional',
        'created_at',
        'updated_at'
    ];
}
