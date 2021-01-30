<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Adopcion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
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

    public function guardar(Request $request){
        $dato = new Adopcion();
        $dato->TTJV_presion_arterial = $request->presion; 
        $dato->TTJV_frecuencia_cardiaca = $request->frecuenciac; 
        $dato->TTJV_temperatura_corporal = $request->temperatura; 
        $dato->TTJV_frecuencia_ventilatoria = $request->frecuenciav; 
        $dato->TTJV_respuesta_apertura_ocular = $request->ocular; 
        $dato->TTJV_respuestas_verbal = $request->verbal; 
        $dato->TTJV_mejor_respuestas_motora = $request->motora; 
        $dato->TTJV_observacion = $request->observacion; 
        $dato->TTJV_id_persona = $request->id; 
        $dato->TTJV_id_caso = $request->caso; 
        $dato->TTJV_id_motivo_consulta = $request->motivo; 
        $dato->TTJV_id_politraumatismo = $request->politraumatismo; 
        $dato->TTJV_id_atencion = $request->ida; 
        $dato->TTJV_id_usuario = Auth::user()->id;
        $dato->save();
    }
    function estado(Request $request){
        $adopcion = Adopcion::find($request->id);
        $adopcion->estado = $request->estado;
        $adopcion->save();
    }
}
