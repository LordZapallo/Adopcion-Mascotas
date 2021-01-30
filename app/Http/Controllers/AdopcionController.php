<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Adopcion;

class AdopcionController extends Controller
{
    function listar_general(){
        return Adopcion::all();
    }
    public function listar(Request $request)
    {
        $buscar = $request->buscar;
        $res = Adopcion::select("adopcion.*", "mascota.nombre as nombre_mascota", "albergue.nombre as nombre_albergue")
        ->join('mascota','mascota.id_mascota','=','adopcion.id_mascota')
        ->join('albergue','albergue.id_albergue','=','adopcion.id_albergue')
            ->where(function ($q) use ($buscar) {
                $q->where("adopcion.id_adopcion", "like", "%" . $buscar . "%")
                    ->orWhere("adopcion.fecha_emision", "like", "%" . $buscar . "%")
                    ->orWhere("adopcion.fecha_finalizacion", "like", "%" . $buscar . "%")
                    ->orWhere("adopcion.estado", "like", "%" . $buscar . "%");
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
}
