<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ttjv_Atencion;
use App\Models\ttjv_Auditoria;
use App\Models\ttjv_Turnos;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AtencionExport;
use Barryvdh\DomPDF\Facade as PDF ;

class ttjv_AtencionController extends Controller
{
    public function listar(Request $request){
        $buscar = $request->buscar;
        $res = ttjv_Atencion::select("ttjv_atencion.*", "users.nombre", "users.apellido", "ttjv_persona.TTJV_PersonaNombres", "ttjv_persona.TTJV_PersonaApeMaterno", "ttjv_persona.TTJV_PersonaApePaterno", "ttjv_turnos.TTJV_codigo")
            ->join("users", "users.id", "=", "ttjv_atencion.TTJV_id_usuario")
            ->join("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_atencion.TTJV_id_turnos")
            ->join("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_atencion.TTJV_id_persona")
            ->where("ttjv_atencion.TTJV_servicio", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_atencion.TTJV_fecha", "like", "%" . $buscar . "%")
            ->orWhere("users.nombre", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaApePaterno", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaApeMaterno", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaIdentificacion", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaNombres", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaDireccion", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaTelefono", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaEmail", "like", "%" . $buscar . "%")
            ->orWhere("ttjv_persona.TTJV_PersonaCelular", "like", "%" . $buscar . "%")->paginate(20);
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
        $now = Carbon::now();

        $sel = DB::select("SELECT TTJV_codigo as valor FROM ttjv_turnos WHERE `TTJV_codigo` LIKE '%B%' ORDER BY TTJV_id_turnos DESC LIMIT 1");
        if(isset($sel[0]->valor)){
            $valor = str_replace("B-", "", $sel[0]->valor);
            $pad = str_pad($valor + 1, 5, "0", STR_PAD_LEFT);
            $dato = "B-" . $pad;
        }else{
            $dato = "B-00001";
        }
        
        $turno = new ttjv_Turnos();
        $turno->TTJV_codigo = $dato;
        $turno->TTJV_fecha = $now;
        $turno->TTJV_estado = 2;
        $turno->TTJV_id_persona = $request->TTJV_id_persona;
        $turno->TTJV_id_usuario = Auth::user()->id;
        $turno->save();

        $id = $turno->TTJV_id_turnos;

        $dato = new ttjv_atencion();
        $dato->TTJV_servicio = $request->TTJV_servicio;
        $dato->TTJV_fecha = $request->TTJV_fecha;
        $dato->TTJV_estado = $request->TTJV_estado;
        $dato->TTJV_id_persona = $request->TTJV_id_persona;
        $dato->TTJV_id_usuario = Auth::user()->id;
        $dato->TTJV_id_turnos = $id;
        $dato->save();

        $per = DB::select("SELECT * FROM ttjv_persona WHERE TTJV_id_persona = $request->TTJV_id_persona;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Agregar Atención Turno: " . $dato . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function editar(Request $request){
        $dato = ttjv_atencion::findOrFail($request->id);
        $dato->TTJV_servicio = $request->TTJV_servicio;
        $dato->TTJV_fecha = $request->TTJV_fecha;
        $dato->TTJV_estado = $request->TTJV_estado;
        $dato->TTJV_id_persona = $request->TTJV_id_persona;
        $dato->save();

        $per = DB::select("SELECT * FROM ttjv_atencion ate INNER JOIN ttjv_persona tp ON ate.TTJV_id_persona=tp.TTJV_id_persona INNER JOIN ttjv_turnos tt ON tt.TTJV_id_turnos = ate.TTJV_id_turnos WHERE ate.TTJV_id_atencion = $request->id;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Editar Atención Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function activar($id){
        $dato = ttjv_atencion::findOrFail($id);
        $dato->TTJV_estado = 1;
        $dato->save();

        $per = DB::select("SELECT * FROM ttjv_atencion ate INNER JOIN ttjv_persona tp ON ate.TTJV_id_persona=tp.TTJV_id_persona INNER JOIN ttjv_turnos tt ON tt.TTJV_id_turnos = ate.TTJV_id_turnos WHERE ate.TTJV_id_atencion = $id;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Activar Atención Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function desactivar($id){
        $dato = ttjv_atencion::findOrFail($id);
        $dato->TTJV_estado = 0;
        $dato->save();

        $per = DB::select("SELECT * FROM ttjv_atencion ate INNER JOIN ttjv_persona tp ON ate.TTJV_id_persona=tp.TTJV_id_persona INNER JOIN ttjv_turnos tt ON tt.TTJV_id_turnos = ate.TTJV_id_turnos WHERE ate.TTJV_id_atencion = $id;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Desactivar Atención Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function eliminar($id){
        $per = DB::select("SELECT * FROM ttjv_atencion ate INNER JOIN ttjv_persona tp ON ate.TTJV_id_persona=tp.TTJV_id_persona INNER JOIN ttjv_turnos tt ON tt.TTJV_id_turnos = ate.TTJV_id_turnos WHERE ate.TTJV_id_atencion = $id;");

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Eliminar Atención Turno: " . $per[0]->TTJV_codigo . " Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Turno";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
        ttjv_Atencion::destroy($id);
    }
    public function excel()
    {
        return Excel::download(new AtencionExport, 'Atencion.xlsx');      
     }
     public function pdf()
    {
       $atent = ttjv_Atencion::select(
        "ttjv_atencion.TTJV_id_atencion",
        "ttjv_turnos.TTJV_codigo",
        "ttjv_atencion.TTJV_servicio",
        "ttjv_atencion.TTJV_fecha",
        DB::raw("if(ttjv_atencion.TTJV_estado = 1, 'Activo', 'Inactivo') AS Estado"),
        "ttjv_persona.TTJV_PersonaNombres",
        "ttjv_persona.TTJV_PersonaApePaterno",
        "ttjv_persona.TTJV_PersonaApeMaterno",
        DB::raw("CONCAT(users.nombre, ' ', users.apellido) AS Usuario"))
        ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_atencion.TTJV_id_persona")
        ->leftJoin("ttjv_turnos", "ttjv_turnos.TTJV_id_turnos", "=", "ttjv_atencion.TTJV_id_turnos")
        ->leftJoin("users", "users.id", "=", "ttjv_atencion.TTJV_id_usuario")
        ->get();
       $pdf = PDF::loadView('pdf.Atencion', compact('atent'));
       return $pdf->download('Atención.pdf');      
     }
}
