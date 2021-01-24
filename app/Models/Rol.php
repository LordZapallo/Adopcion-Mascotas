<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'id_rol';
    protected $primaryKey = 'rol';
    protected $fillable = [
        'nombre'
    ];
}
