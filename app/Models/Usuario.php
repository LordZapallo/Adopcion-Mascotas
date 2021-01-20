<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table='users';
    protected $primaryKey='id';
    protected $fillable = ['nombre', 'apellido', 'cedula', 'direccion', 'telefono', 'celular', 'estado', 'email', 'email_verified_at', 'password', 'remember_token', 'created_at', 'apdated_at', 'crea'];
    protected $hidden =["password"];
}
