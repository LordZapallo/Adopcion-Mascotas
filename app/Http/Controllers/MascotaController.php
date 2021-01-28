<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Models\Mascota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;



class MascotaController extends Controller
{
    public function listar(Request $request){
        $buscar = $request->buscar;
        $res = Mascota::select("*")
                ->where("nombre", "like", "%".$buscar."%")
                ->orWhere("especie", "like", "%".$buscar."%")
                ->orWhere("raza", "like", "%".$buscar."%")
                ->orWhere("sexo", "like", "%".$buscar."%")->paginate(20);
        return [
            'paginacion' => [
                'total'        => $res->total(),
                'current_page' => $res->currentPage(),
                'per_page'     => $res->perPage(),
                'last_page'    => $res->lastPage(),
                'from'         => $res->firstItem(),
                'to'           => $res->lastItem(),
            ],
            'datos' => $res
        ];
    }
    public function guardar(Request $request){

    }
    public function editar(Request $request){

    }
    public function eliminar($id){
        Mascota::destroy($id);
    }

}
