<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use App\Models\ttjv_Auditoria;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AuditoriaExport;
use Barryvdh\DomPDF\Facade as PDF ;

class ttjv_AuditoriaController extends Controller
{
    public function listar(Request $request){
        $buscar = $request->buscar;
        $res = ttjv_Auditoria::addSelect(['usuario' => Usuario::select(DB::raw("CONCAT(nombre, ' ', apellido)"))
                ->whereColumn('id', 'ttjv_auditoria.TTJV_id_usuario')
            ])
            ->where("TTJV_accion", "like", "%" . $buscar . "%")
            ->orWhere("TTJV_fecha", "like", "%" . $buscar . "%")
            ->orWhere("TTJV_modulo", "like", "%" . $buscar . "%")
            ->orWhere("TTJV_origen", "like", "%" . $buscar . "%")->orderBy("TTJV_id_auditoria", "DESC")->paginate(20);
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
    public function excel()
    {
        return Excel::download(new AuditoriaExport, 'Auditoria.xlsx');      
     }
     public function pdf()
     {
        $audit = ttjv_Auditoria::select(
            "ttjv_auditoria.TTJV_id_auditoria",
            "ttjv_auditoria.TTJV_accion",
            "ttjv_auditoria.TTJV_fecha",
            "ttjv_auditoria.TTJV_modulo",
            "ttjv_auditoria.TTJV_origen",
            "users.nombre",
            "users.apellido",
            "users.email"
        )
        ->leftJoin("users", "users.id", "=", "ttjv_auditoria.TTJV_id_usuario")
            ->get();
        $pdf = PDF::loadView('pdf.Auditoria', compact('audit'));
        return $pdf->download('Auditoria.pdf');      
      }
}
