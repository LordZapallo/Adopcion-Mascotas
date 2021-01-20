<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ttjv_Turnos;
use App\Models\ttjv_Persona;
use App\Models\ttjv_Atencion;
use App\Models\ttjv_Auditoria;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\TurnosExport;
use Barryvdh\DomPDF\Facade as PDF ;

class ttjv_TurnosController extends Controller
{
    public function listar(Request $request)
    {
        $buscar = $request->buscar;
        $res = ttjv_Turnos::select("ttjv_turnos.*", "users.nombre", "users.apellido", "ttjv_persona.TTJV_PersonaNombres", "ttjv_persona.TTJV_PersonaApeMaterno", "ttjv_persona.TTJV_PersonaApePaterno")
            ->join("users", "users.id", "=", "ttjv_turnos.TTJV_id_usuario")
            ->join("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_turnos.TTJV_id_persona")
            ->where("ttjv_turnos.TTJV_codigo", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_turnos.TTJV_fecha", "like", "%" . $buscar . "%")
            ->orWhere("users.nombre", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaApePaterno", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaApeMaterno", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaIdentificacion", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaNombres", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaDireccion", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaTelefono", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaEmail", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaCelular", "like", "%" . $buscar . "%")->orderBy("TTJV_id_persona", "DESC")->paginate(20);
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
    public function ingreso(Request $request)
    {
        $now = Carbon::now();

        $data = ttjv_Turnos::findOrFail($request->TTJV_id_turnos);
        $data->TTJV_estado = 2;
        $data->save();

        $id = $data->TTJV_id_turnos;

        $dato = new ttjv_Atencion();
        $dato->TTJV_servicio = $request->servicio;
        $dato->TTJV_fecha = $now;
        $dato->TTJV_estado = 1;
        $dato->TTJV_id_persona = $request->TTJV_id_persona;
        $dato->TTJV_id_usuario = Auth::user()->id;
        $dato->TTJV_id_turnos = $id;
        $dato->save();

        $per = DB::select("SELECT * FROM ttjv_persona WHERE TTJV_id_persona = $request->TTJV_id_persona;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Ingresado Turno: " . $data->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function ausente(Request $request)
    {
        $data = ttjv_Turnos::findOrFail($request->TTJV_id_turnos);
        $data->TTJV_estado = 3;
        $data->save();

        $per = DB::select("SELECT * FROM ttjv_persona WHERE TTJV_id_persona = $data->TTJV_id_persona;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Ausente Turno: " . $data->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function reactivar(Request $request)
    {
        $sel = DB::select("SELECT TTJV_codigo as valor FROM ttjv_turnos WHERE `TTJV_codigo` LIKE '%B%' ORDER BY TTJV_id_turnos DESC LIMIT 1");
        if (isset($sel[0]->valor)) {
            $valor = str_replace("B-", "", $sel[0]->valor);
            $pad = str_pad($valor + 1, 5, "0", STR_PAD_LEFT);
            $dato = "B-" . $pad;
        } else {
            $dato = "B-00001";
        }
        $data = ttjv_Turnos::findOrFail($request->TTJV_id_turnos);
        $data->TTJV_codigo = $dato;
        $data->TTJV_estado = 1;
        $data->save();

        $per = DB::select("SELECT * FROM ttjv_persona WHERE TTJV_id_persona = $data->TTJV_id_persona;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Reactivar Turno: " . $data->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function volver(Request $request)
    {
        $data = ttjv_Turnos::findOrFail($request->TTJV_id_turnos);
        $data->TTJV_estado = 1;
        $data->save();

        $per = DB::select("SELECT * FROM ttjv_persona WHERE TTJV_id_persona = $data->TTJV_id_persona;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Regresar espera Turno: " . $data->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function eliminar($id)
    {
        
        $per = ttjv_Turnos::select("ttjv_turnos.*", "ttjv_persona.*")
        ->join("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_turnos.TTJV_id_persona")
        ->where('ttjv_turnos.TTJV_id_turnos', "=", $id)->get();

        ttjv_Turnos::destroy($id);
       

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Eliminar Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function excel()
    {
        return Excel::download(new TurnosExport, 'Turnos.xlsx');      
     }
     public function pdf()
     {
        $turno = ttjv_Turnos::select(
            "ttjv_turnos.TTJV_id_turnos",
            "ttjv_turnos.TTJV_codigo",
            "ttjv_turnos.TTJV_fecha",
            DB::raw("if(ttjv_turnos.TTJV_estado = 1, 'En Espera', 'Ingresado') AS TTJV_estado"),
            "ttjv_persona.TTJV_PersonaNombres",
            "ttjv_persona.TTJV_PersonaApePaterno",
            "ttjv_persona.TTJV_PersonaApeMaterno",
            "users.nombre",
            "users.apellido"
            
     
        )
        ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_turnos.TTJV_id_persona")
        ->leftJoin("users", "users.id", "=", "ttjv_turnos.TTJV_id_turnos")
            ->get();
        $pdf = PDF::loadView('pdf.Turnos', compact('turno'));
        return $pdf->download('Turnos.pdf');      
      }
      public function pdft($idt)
      {

         $turnot = ttjv_Turnos::select(
             "ttjv_turnos.TTJV_id_turnos",
             "ttjv_turnos.TTJV_codigo",
             "ttjv_turnos.TTJV_fecha",
             DB::raw("if(ttjv_turnos.TTJV_estado = 1, 'En Espera', 'Ingresado') AS TTJV_estado"),
             "ttjv_persona.TTJV_PersonaNombres",
             "ttjv_persona.TTJV_PersonaApePaterno",
             "ttjv_persona.TTJV_PersonaApeMaterno",

             DB::raw("if(ttjv_resultados.TTJV_color=1, 'Inmediato', if(ttjv_resultados.TTJV_color=2, '10 Minutos', if(ttjv_resultados.TTJV_color=3, '60 Minutos', if(ttjv_resultados.TTJV_color=4, '120 Minutos', 'Derivacion Consulta Externa')))) AS Color")
         )
         ->Join("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_turnos.TTJV_id_persona")
         ->leftJoin("ttjv_resultados", "ttjv_resultados.TTJV_id_turno", "=", "ttjv_turnos.TTJV_id_turnos")
         ->where("ttjv_turnos.TTJV_id_turnos","=",$idt)
             ->get();
            
             return   PDF::loadView('pdf.Turnot', compact('turnot'))
             ->setPaper('a6', 'landscape')
            ->stream('Turno.pdf');    

       }
}
