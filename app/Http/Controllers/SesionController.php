<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class SesionController extends Controller
{
    public function recuperar(){
        $datauser = DB::select("SELECT * FROM users WHERE id = " . Auth::user()->id);
        $usuario = Auth::user()->nombres . " " . Auth::user()->apellidos;
        $email = Auth::user()->email;
        $rol = DB::select("SELECT * FROM rol WHERE id_rol = " . Auth::user()->id_rol);
        return [
            'datauser' => $datauser,
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
