<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ttjv_Triaje;
use App\Models\ttjv_Resultado;
use App\Models\ttjv_Turnos;
use App\Models\ttjv_Auditoria;
use App\Models\ttjv_Receta;
use App\Models\ttjv_Atencion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ttjv_TriajeController extends Controller
{
    public function listar(Request $request){ 
        $buscar = $request->buscar;
        $res = DB::select("SELECT ta.TTJV_id_atencion, ta.TTJV_id_turnos, tp.*, CONCAT(tp.TTJV_PersonaNombres,' ',tp.TTJV_PersonaApePaterno,' ',tp.TTJV_PersonaApeMaterno) AS nombrescompletos  FROM ttjv_atencion ta INNER JOIN ttjv_persona tp ON ta.TTJV_id_persona=tp.TTJV_id_persona WHERE (CONCAT(tp.TTJV_PersonaNombres,' ',tp.TTJV_PersonaApePaterno,' ',tp.TTJV_PersonaApeMaterno) LIKE '%$buscar%' OR tp.TTJV_PersonaIdentificacion LIKE '%$buscar%') AND ta.TTJV_modo!=1 AND ta.TTJV_estado=1");
        return $res;
    }
    public function guardar(Request $request){
        $dato = new ttjv_Triaje();
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

        $id = $dato->TTJV_id_triaje;

        $data = new ttjv_Resultado();
        $data->TTJV_color = $request->color;
        $data->TTJV_id_persona = $request->id; 
        $data->TTJV_id_turno = $request->idt;
        $data->TTJV_fecha = Carbon::now();
        $data->TTJV_id_triaje = $id;
        $data->save();

        $idr = $data->TTJV_id_resultado;

        $data = new ttjv_Receta();
        $data->TTJV_id_resultados = $idr;
        $data->save();

        $data = ttjv_Atencion::findOrFail($request->ida);
        $data->TTJV_modo = 1;
        $data->save();


        $per = DB::select("SELECT * FROM ttjv_triaje tr INNER JOIN ttjv_persona tp ON tr.TTJV_id_persona=tp.TTJV_id_persona INNER JOIN ttjv_atencion ta ON ta.TTJV_id_atencion=tr.TTJV_id_atencion INNER JOIN ttjv_turnos ttu ON ttu.TTJV_id_turnos = ta.TTJV_id_turnos WHERE tr.TTJV_id_triaje = $id;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Creacion triaje Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function listarcasos(){
        $res = DB::select("SELECT * FROM ttjv_caso");
        return $res;
    }
    public function listarmotivos($id){
        $res = DB::select("SELECT * FROM ttjv_motivo_consulta WHERE TTJV_id_caso = " . $id);
        return $res;
    }  
    public function listarpolitraumatismos(){
        $res = DB::select("SELECT * FROM ttjv_politraumatismo");
        return $res;
    }
}