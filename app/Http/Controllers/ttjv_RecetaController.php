<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ttjv_Receta;
use App\Models\ttjv_Resultado;
use App\Models\ttjv_Turnos;
use Illuminate\Support\Facades\DB;
use App\Models\ttjv_Auditoria;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\RecetaExport;
use Barryvdh\DomPDF\Facade as PDF ;
class ttjv_RecetaController extends Controller
{
    public function listar(Request $request){
        $buscar = $request->buscar;
        $res = ttjv_Receta::select("*")
            ->join("ttjv_resultados", "ttjv_resultados.TTJV_id_resultado", "=", "ttjv_receta.TTJV_id_resultados")
            ->join("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_resultados.TTJV_id_persona")
            ->join("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_resultados.TTJV_id_turno")
            ->where("ttjv_persona.TTJV_PersonaIdentificacion", "LIKE", '%' . $buscar . '%')
            ->orWhere("ttjv_persona.TTJV_PersonaApePaterno", "LIKE", '%' . $buscar . '%')
            ->orWhere("ttjv_persona.TTJV_PersonaApeMaterno", "LIKE", '%' . $buscar . '%')
            ->orWhere("ttjv_persona.TTJV_PersonaNombres", "LIKE", '%' . $buscar . '%')
            ->orWhere("ttjv_turnos.TTJV_codigo", "LIKE", '%' . $buscar . '%')
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
    public function guardar(Request $request)
    {  
        $data = new ttjv_Receta();
        $data->TTJV_medicamento = $request->TTJV_medicamento;
        $data->TTJV_presentacion = $request->TTJV_presentacion;
        $data->TTJV_dosis = $request->TTJV_dosis;
        $data->TTJV_duracion = $request->TTJV_duracion;
        $data->TTJV_cantidad = $request->TTJV_cantidad;
        $data->TTJV_id_resultados = $request->TTJV_id_resultado;
        $data->save();
    }
    public function editar(Request $request)
    {  
        $data = ttjv_Receta::findOrFail($request->id);
        $data->TTJV_medicamento = $request->TTJV_medicamento;
        $data->TTJV_presentacion = $request->TTJV_presentacion;
        $data->TTJV_dosis = $request->TTJV_dosis;
        $data->TTJV_duracion = $request->TTJV_duracion;
        $data->TTJV_cantidad = $request->TTJV_cantidad;
        $data->TTJV_id_resultados = $request->TTJV_id_resultado;
        $data->save();
    }
    public function eliminar($id)
    {  
        $per = DB::select("SELECT * FROM ttjv_receta tr INNER JOIN ttjv_resultados re ON tr.TTJV_id_resultados=re.TTJV_id_resultado INNER JOIN ttjv_turnos ttu ON ttu.TTJV_id_turnos = re.TTJV_id_turno INNER JOIN ttjv_persona per ON per.TTJV_id_persona= re.TTJV_id_persona WHERE tr.TTJV_id_receta = $id;");
        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "'Eliminar Resultado' Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
        
        ttjv_Receta::destroy($id);
    }
    public function listarturno(){
        $res = ttjv_Turnos::select()
                ->join("ttjv_resultados", "ttjv_resultados.TTJV_id_turno", "=", "ttjv_turnos.TTJV_id_turnos")
                ->join("ttjv_persona", "ttjv_resultados.TTJV_id_persona", "=", "ttjv_persona.TTJV_id_persona")->get();
        return $res;
    }
    public function excel()
    {
        return Excel::download(new RecetaExport, 'Recetas.xlsx');
    }
    public function pdf()
    {
       $receta = ttjv_Receta::select(
        "ttjv_receta.TTJV_id_receta",
        "ttjv_turnos.TTJV_codigo",
        "ttjv_persona.TTJV_PersonaNombres",
        "ttjv_persona.TTJV_PersonaApePaterno",
        "ttjv_persona.TTJV_PersonaApeMaterno",
        "ttjv_receta.TTJV_medicamento",
        "ttjv_receta.TTJV_presentacion",
        "ttjv_receta.TTJV_dosis",
        "ttjv_receta.TTJV_duracion",
        "ttjv_receta.TTJV_cantidad",       
    )
    ->leftJoin("ttjv_resultados", "ttjv_resultados.TTJV_id_resultado", "=", "ttjv_receta.TTJV_id_resultados")
    ->leftJoin("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_resultados.TTJV_id_turno")
    ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_resultados.TTJV_id_persona")
        ->get();
       $pdf = PDF::loadView('pdf.Receta', compact('receta'));
       return $pdf->download('Recetas.pdf');      
     }
}
