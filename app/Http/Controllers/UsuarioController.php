<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UsuarioExport;
use Barryvdh\DomPDF\Facade as PDF ;
use Illuminate\Support\Facades\Auth;
use App\Models\ttjv_Auditoria;

class UsuarioController extends Controller
{
    public function listar(Request $request){
        $buscar = $request->buscar;
        $res = Usuario::select("*")
                ->where("nombre", "like", "%".$buscar."%")
                ->orWhere("apellido", "like", "%".$buscar."%")
                ->orWhere(DB::raw("CONCAT(nombre, ' ', apellido) like '%$buscar%'"))
                ->orWhere("email", "like", "%".$buscar."%")
                ->orWhere("direccion", "like", "%".$buscar."%")
                ->orWhere("celular", "like", "%".$buscar."%")
                ->orWhere("telefono", "like", "%".$buscar."%")->paginate(20);
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
        $dato = new Usuario();
        $dato->nombre = $request->nombre;
        $dato->apellido = $request->apellido;
        $dato->cedula = $request->cedula;
        $dato->direccion = $request->direccion;
        $dato->telefono = $request->telefono;
        $dato->celular = $request->celular;
        $dato->estado = $request->estado;
        $dato->email = $request->email;
        $dato->password = Hash::make($request->password);
        $dato->save();

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Agregar usuario: " . $request->nombre . " " . $request->apellido . " Cédula: " . $request->cedula;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Usuario";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function editar(Request $request){
        $dato = Usuario::findOrFail($request->id);
        $dato->nombre = $request->nombre;
        $dato->apellido = $request->apellido;
        $dato->cedula = $request->cedula;
        $dato->direccion = $request->direccion;
        $dato->telefono = $request->telefono;
        $dato->celular = $request->celular;
        $dato->estado = $request->estado;
        $dato->email = $request->email;
        if($request->password){
            $dato->password = Hash::make($request->password);
        }
        $dato->save();

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Editar usuario: " . $request->nombre . " " . $request->apellido . " Cédula: " . $request->cedula;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Usuario";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function eliminar($id){
        Usuario::destroy($id);
    }
    public function excel()
    {
        return Excel::download(new UsuarioExport, 'Usuarios.xlsx');      
     }
     public function pdf()
     {
        $users = Usuario::get();
        $pdf = PDF::loadView('pdf.Usuario', compact('users'));
        return $pdf->download('Usuario.pdf');      
      }
}
