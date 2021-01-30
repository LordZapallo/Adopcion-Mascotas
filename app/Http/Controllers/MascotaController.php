<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Models\Mascota;
use App\Models\Albergue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;



class MascotaController extends Controller
{
    public function listar(Request $request)
    {
        $buscar = $request->buscar;
        $res = Mascota::select("*")
            ->where(function ($q) use ($buscar) {
                $q->where("nombre", "like", "%" . $buscar . "%")
                    ->orWhere("especie", "like", "%" . $buscar . "%")
                    ->orWhere("raza", "like", "%" . $buscar . "%")
                    ->orWhere("sexo", "like", "%" . $buscar . "%");
            })
            //->where("estado", "=", "disponible")
            ->paginate(20);
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
    public function listarficha(Request $request)
    {
        $mascota = Mascota::select("*")->where("id_mascota", "=", $request->id_mascota)->get();
        $albergue =  Albergue::select("*")->where("id_albergue", "=", $mascota[0]->id_albergue)->get();
        return [
            'mascota' => $mascota[0],
            "albergue" => $albergue[0]
        ];
    }
    public function guardar(Request $request)
    { }
    public function editar(Request $request)
    { }
    public function eliminar($id)
    {
        Mascota::destroy($id);
    }
}
