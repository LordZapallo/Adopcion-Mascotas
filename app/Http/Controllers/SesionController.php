<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SesionController extends Controller
{
    public function recuperar(){
        $usuario = Auth::user()->nombre . " " . Auth::user()->apellido;
        $email = Auth::user()->email;
        $rol = DB::select("SELECT * FROM rol WHERE id_rol = " . Auth::user()->id_rol);
        return [
            'nombre' => $usuario,
            'roles' => $rol,
            'email' => $email
        ];
    }
    public function roles(){
        $rol = DB::select("SELECT * FROM rol WHERE id_rol = " . Auth::user()->id_rol);
        return $rol;
    }
}
