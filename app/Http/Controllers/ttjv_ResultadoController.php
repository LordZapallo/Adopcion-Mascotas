<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ttjv_Resultado;
use Illuminate\Support\Facades\DB;
use App\Models\ttjv_Auditoria;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ResultadosExport;
use Barryvdh\DomPDF\Facade as PDF ;
class ttjv_ResultadoController extends Controller
{
    public function listar(Request $request)
    {
        $buscar = $request->buscar;
        $res = ttjv_Resultado::select("*")
            ->join("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_resultados.TTJV_id_persona")
            ->join("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_resultados.TTJV_id_turno")
            ->leftjoin("ttjv_triaje", "ttjv_triaje.TTJV_id_triaje", "=", "ttjv_resultados.TTJV_id_triaje")
            ->leftjoin("ttjv_motivo_consulta", "ttjv_motivo_consulta.TTJV_id_motivo_consulta", "=", "ttjv_triaje.TTJV_id_motivo_consulta")->orderBy("ttjv_turnos.TTJV_codigo", "DESC")
            ->where("ttjv_motivo_consulta.TTJV_nombre", "LIKE", "%$buscar%")
            ->orWhere("ttjv_turnos.TTJV_codigo", "LIKE", "%$buscar%")
            ->orWhere("ttjv_persona.TTJV_PersonaIdentificacion", "LIKE", "%$buscar%")
            ->orWhere("ttjv_persona.TTJV_PersonaIdentificacion", "LIKE", "%$buscar%")
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
        $data = ttjv_Resultado::findOrFail($request->id);
        $data->TTJV_tratamiento = $request->tratamiento;
        $data->TTJV_proxima_cita = $request->cita;
        $data->TTJV_plan = $request->plan;
        $data->save();
    }

    public function up($id)
    {
        $data = ttjv_Resultado::findOrFail($id);
        $data->TTJV_color = $data->TTJV_color + 1;
        $data->TTJV_fecha = Carbon::now();
        $data->save();

        $per = DB::select("SELECT * FROM ttjv_resultados tr INNER JOIN ttjv_persona tp ON tr.TTJV_id_persona=tp.TTJV_id_persona INNER JOIN ttjv_turnos ttu ON ttu.TTJV_id_turnos = tr.TTJV_id_turno WHERE tr.TTJV_id_resultado = $id;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "'Bajar color Resultado' Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function down($id)
    {
        $data = ttjv_Resultado::findOrFail($id);
        $data->TTJV_color = $data->TTJV_color - 1;
        $data->TTJV_fecha = Carbon::now();
        $data->save();

        $per = DB::select("SELECT * FROM ttjv_resultados tr INNER JOIN ttjv_persona tp ON tr.TTJV_id_persona=tp.TTJV_id_persona INNER JOIN ttjv_turnos ttu ON ttu.TTJV_id_turnos = tr.TTJV_id_turno WHERE tr.TTJV_id_resultado = $id;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "'Subir color Resultado' Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function eliminar($id)
    {
        $per = DB::select("SELECT * FROM ttjv_resultados tr INNER JOIN ttjv_persona tp ON tr.TTJV_id_persona=tp.TTJV_id_persona INNER JOIN ttjv_turnos ttu ON ttu.TTJV_id_turnos = tr.TTJV_id_turno WHERE tr.TTJV_id_resultado = $id;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "'Eliminar Resultado' Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();

        ttjv_Resultado::destroy($id);
    }
    public function excel()
    {
        return Excel::download(new ResultadosExport, 'Resultados.xlsx');
    }
    public function vercolores(Request $request){
        if($request->inicio){
            $inicio = $request->inicio;
        }else{
            $inicio = "0001-12-31";
        }
        if($request->fin){
            $fin = $request->fin;
        }else{
            $fin = "9999-12-31";
        }

        $rojo = ttjv_Resultado::where("TTJV_color", "=", "1")->where("TTJV_fecha", ">=", $inicio)->where("TTJV_fecha", "<=", $fin)->count();
        $naranja = ttjv_Resultado::where("TTJV_color", "=", "2")->where("TTJV_fecha", ">=", $inicio)->where("TTJV_fecha", "<=", $fin)->count();
        $amarillo = ttjv_Resultado::where("TTJV_color", "=", "3")->where("TTJV_fecha", ">=", $inicio)->where("TTJV_fecha", "<=", $fin)->count();
        $verde = ttjv_Resultado::where("TTJV_color", "=", "4")->where("TTJV_fecha", ">=", $inicio)->where("TTJV_fecha", "<=", $fin)->count();
        $azul = ttjv_Resultado::where("TTJV_color", "=", "5")->where("TTJV_fecha", ">=", $inicio)->where("TTJV_fecha", "<=", $fin)->count();
        $total = $rojo + $naranja + $amarillo + $verde + $azul;
        return [
            "rojo" => $rojo,
            "naranja" => $naranja,
            "amarillo" => $amarillo,
            "verde" => $verde,
            "azul" => $azul,
            "total" => $total
        ];
    }
    public function pdf()
    {
       $result = ttjv_Resultado::select(
        "ttjv_resultados.TTJV_id_resultado",
        "ttjv_turnos.TTJV_codigo",
        "ttjv_persona.TTJV_PersonaNombres",
        "ttjv_persona.TTJV_PersonaApePaterno",
        "ttjv_persona.TTJV_PersonaApeMaterno",
        "ttjv_motivo_consulta.TTJV_nombre",
        DB::raw("if(ttjv_resultados.TTJV_color=1, 'Rojo', if(ttjv_resultados.TTJV_color=2, 'Naranja', if(ttjv_resultados.TTJV_color=3, 'Amarillo', if(ttjv_resultados.TTJV_color=4, 'Verde', 'Azul')))) AS TTJV_color"),
       //"ttjv_resultados.TTJV_color",
        "ttjv_resultados.TTJV_tratamiento",
        "ttjv_resultados.TTJV_proxima_cita",
        "ttjv_resultados.TTJV_plan",
    )
        ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_resultados.TTJV_id_persona")
        ->leftJoin("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_resultados.TTJV_id_turno")
        ->leftJoin("ttjv_triaje", "ttjv_triaje.TTJV_id_triaje", "=", "ttjv_resultados.TTJV_id_triaje")
        ->leftJoin("ttjv_motivo_consulta", "ttjv_triaje.TTJV_id_motivo_consulta", "=", "ttjv_motivo_consulta.TTJV_id_motivo_consulta")
        ->get();
       $pdf = PDF::loadView('pdf.Resultados', compact('result'));
       return $pdf->download('Resultados.pdf');      
     }
     public function pdf1()
     {
        $result = ttjv_Resultado::select(
         "ttjv_resultados.TTJV_id_resultado",
         "ttjv_turnos.TTJV_codigo",
         "ttjv_persona.TTJV_PersonaNombres",
         "ttjv_persona.TTJV_PersonaApePaterno",
         "ttjv_persona.TTJV_PersonaApeMaterno",
         "ttjv_motivo_consulta.TTJV_nombre",
         "ttjv_resultados.TTJV_tratamiento",
         "ttjv_resultados.TTJV_proxima_cita",
         "ttjv_resultados.TTJV_plan",
     )
         ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_resultados.TTJV_id_persona")
         ->leftJoin("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_resultados.TTJV_id_turno")
         ->leftJoin("ttjv_triaje", "ttjv_triaje.TTJV_id_triaje", "=", "ttjv_resultados.TTJV_id_triaje")
         ->leftJoin("ttjv_motivo_consulta", "ttjv_triaje.TTJV_id_motivo_consulta", "=", "ttjv_motivo_consulta.TTJV_id_motivo_consulta")
         ->where("ttjv_resultados.TTJV_color", "=", 1)
         ->get();
        $pdf = PDF::loadView('pdf.Resultadosall', compact('result'));
        return $pdf->download('Resultados Rojo.pdf');      
      }
      public function pdf2()
      {
         $result = ttjv_Resultado::select(
          "ttjv_resultados.TTJV_id_resultado",
          "ttjv_turnos.TTJV_codigo",
          "ttjv_persona.TTJV_PersonaNombres",
          "ttjv_persona.TTJV_PersonaApePaterno",
          "ttjv_persona.TTJV_PersonaApeMaterno",
          "ttjv_motivo_consulta.TTJV_nombre",
          "ttjv_resultados.TTJV_tratamiento",
          "ttjv_resultados.TTJV_proxima_cita",
          "ttjv_resultados.TTJV_plan",
      )
          ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_resultados.TTJV_id_persona")
          ->leftJoin("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_resultados.TTJV_id_turno")
          ->leftJoin("ttjv_triaje", "ttjv_triaje.TTJV_id_triaje", "=", "ttjv_resultados.TTJV_id_triaje")
          ->leftJoin("ttjv_motivo_consulta", "ttjv_triaje.TTJV_id_motivo_consulta", "=", "ttjv_motivo_consulta.TTJV_id_motivo_consulta")
          ->where("ttjv_resultados.TTJV_color", "=", 2)
          ->get();
         $pdf = PDF::loadView('pdf.Resultadosall', compact('result'));
         return $pdf->download('Resultados Naranja.pdf');      
       }
       public function pdf3()
       {
          $result = ttjv_Resultado::select(
           "ttjv_resultados.TTJV_id_resultado",
           "ttjv_turnos.TTJV_codigo",
           "ttjv_persona.TTJV_PersonaNombres",
           "ttjv_persona.TTJV_PersonaApePaterno",
           "ttjv_persona.TTJV_PersonaApeMaterno",
           "ttjv_motivo_consulta.TTJV_nombre",
           "ttjv_resultados.TTJV_tratamiento",
           "ttjv_resultados.TTJV_proxima_cita",
           "ttjv_resultados.TTJV_plan",
       )
           ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_resultados.TTJV_id_persona")
           ->leftJoin("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_resultados.TTJV_id_turno")
           ->leftJoin("ttjv_triaje", "ttjv_triaje.TTJV_id_triaje", "=", "ttjv_resultados.TTJV_id_triaje")
           ->leftJoin("ttjv_motivo_consulta", "ttjv_triaje.TTJV_id_motivo_consulta", "=", "ttjv_motivo_consulta.TTJV_id_motivo_consulta")
           ->where("ttjv_resultados.TTJV_color", "=", 3)
           ->get();
          $pdf = PDF::loadView('pdf.Resultadosall', compact('result'));
          return $pdf->download('Resultados Amarillo.pdf');      
        }
        public function pdf4()
        {
           $result = ttjv_Resultado::select(
            "ttjv_resultados.TTJV_id_resultado",
            "ttjv_turnos.TTJV_codigo",
            "ttjv_persona.TTJV_PersonaNombres",
            "ttjv_persona.TTJV_PersonaApePaterno",
            "ttjv_persona.TTJV_PersonaApeMaterno",
            "ttjv_motivo_consulta.TTJV_nombre",
            "ttjv_resultados.TTJV_tratamiento",
            "ttjv_resultados.TTJV_proxima_cita",
            "ttjv_resultados.TTJV_plan",
        )
            ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_resultados.TTJV_id_persona")
            ->leftJoin("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_resultados.TTJV_id_turno")
            ->leftJoin("ttjv_triaje", "ttjv_triaje.TTJV_id_triaje", "=", "ttjv_resultados.TTJV_id_triaje")
            ->leftJoin("ttjv_motivo_consulta", "ttjv_triaje.TTJV_id_motivo_consulta", "=", "ttjv_motivo_consulta.TTJV_id_motivo_consulta")
            ->where("ttjv_resultados.TTJV_color", "=", 4)
            ->get();
           $pdf = PDF::loadView('pdf.Resultadosall', compact('result'));
           return $pdf->download('Resultados Verde.pdf');      
         }
         public function pdf5()
         {
            $result = ttjv_Resultado::select(
             "ttjv_resultados.TTJV_id_resultado",
             "ttjv_turnos.TTJV_codigo",
             "ttjv_persona.TTJV_PersonaNombres",
             "ttjv_persona.TTJV_PersonaApePaterno",
             "ttjv_persona.TTJV_PersonaApeMaterno",
             "ttjv_motivo_consulta.TTJV_nombre",
             "ttjv_resultados.TTJV_tratamiento",
             "ttjv_resultados.TTJV_proxima_cita",
             "ttjv_resultados.TTJV_plan",
         )
             ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_resultados.TTJV_id_persona")
             ->leftJoin("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_resultados.TTJV_id_turno")
             ->leftJoin("ttjv_triaje", "ttjv_triaje.TTJV_id_triaje", "=", "ttjv_resultados.TTJV_id_triaje")
             ->leftJoin("ttjv_motivo_consulta", "ttjv_triaje.TTJV_id_motivo_consulta", "=", "ttjv_motivo_consulta.TTJV_id_motivo_consulta")
             ->where("ttjv_resultados.TTJV_color", "=", 5)
             ->get();
            $pdf = PDF::loadView('pdf.Resultadosall', compact('result'));
            return $pdf->download('Resultados Azul.pdf');      
          }
}
