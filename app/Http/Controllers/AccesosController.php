<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\ttjv_Roles;
use Illuminate\Support\Facades\DB;

class AccesosController extends Controller
{
    public function listar(){
        $data = Usuario::all();
        return $data;
    }
    public function guardar(Request $request,$id){
        $valor = str_replace("true","1",$request->valor); 
        $valor1 = str_replace("false","0",$valor);

        DB::delete("DELETE FROM ttjv_roles WHERE TTJV_id_usuario = " . $id);

        $data = new ttjv_Roles();
        $data->TTJV_ficha_usuario = substr($valor1,0,1);
        $data->TTJV_acceso_usuario = substr($valor1,2,1);
        $data->TTJV_auditoria = substr($valor1,4,1);
        $data->TTJV_paciente = substr($valor1,6,1);
        $data->TTJV_turno = substr($valor1,8,1);
        $data->TTJV_atencion = substr($valor1,10,1);
        $data->TTJV_triaje = substr($valor1,12,1);
        $data->TTJV_resultados = substr($valor1,14,1); 
        $data->TTJV_receta = substr($valor1,16,1);
        $data->TTJV_actualizar = substr($valor1,18,1);
        $data->TTJV_id_usuario = $id;
        $data->save();
    }
}
