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
        $dato->fecha_emision = $request->adopcion["fecha_emision"];
        $dato->fecha_finalizacion = $request->adopcion["fecha_finalizacion"];
        $dato->estado = null;
        $dato->referencia_personal_nombre = $request->adopcion["referencia_personal_nombre"];
        $dato->referencia_personal_parentesco = $request->adopcion["referencia_personal_parentesco"];
        $dato->referencia_personal_telefono = $request->adopcion["referencia_personal_telefono"];
        $dato->familiares_numero = $request->adopcion["familiares_numero"];
        $dato->familiares_enfermedad = $request->adopcion["familiares_enfermedad"];
        $dato->domicilio_tipo = $request->adopcion["domicilio_tipo"];
        $dato->domicilio_estatus = $request->adopcion["domicilio_estatus"];
        $dato->domicilio_metros = $request->adopcion["domicilio_metros"];
        $dato->porque_adoptar = $request->adopcion["porque_adoptar"];
        $dato->tipo_comida_mascota = $request->adopcion["tipo_comida_mascota"];
        $dato->responsable_gastos_mascota = $request->adopcion["responsable_gastos_mascota"];
        $dato->gasto_estimado_mensual = $request->adopcion["gasto_estimado_mensual"];
        $dato->visita_periodica = $request->adopcion["visita_periodica"];
        $dato->esterilizacion = $request->adopcion["esterilizacion"];
        $dato->adopcion_compartida = $request->adopcion["adopcion_compartida"];
        $dato->observaciones = $request->adopcion["observaciones"];
        $dato->id_solicitante = Auth::User()->id;
        $dato->id_supervisor = null;
        $dato->id_mascota = $request->mascota["id_mascota"];
        $dato->id_albergue = $request->albergue["id_albergue"];
        $dato->save();

        $mascota = Mascota::find($request->mascota["id_mascota"]);
        $mascota->estado = "Solicitud Pendiente";
        $mascota->save();
    }
    function estado(Request $request){
        $adopcion = Adopcion::find($request->id);
        $adopcion->estado = $request->estado;
        $adopcion->save();
    }
}
