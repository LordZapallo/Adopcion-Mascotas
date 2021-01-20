<?php

namespace App\Http\Controllers;

use App\Models\ttjv_Auditoria;
use Illuminate\Http\Request;
use App\Models\ttjv_Persona;
use App\Models\ttjv_Etnia;
use App\Models\ttjv_Grupoetario;
use App\Models\ttjv_Provincia;
use App\Models\ttjv_Canton;
use App\Models\ttjv_Turnos;
use App\Models\ttjv_Atencion;
use App\Models\ttjv_Resultado;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\PacienteExport;
use Maatwebsite\LaravelNovaExcel\Actions\DownloadExcel;
use Maatwebsite\Excel\Concerns\FromCollection;
use Barryvdh\DomPDF\Facade as PDF ;



class ttjv_PersonaController extends Controller
{
    public function listar(Request $request)
    {
        $buscar = $request->buscar;
        $res = ttjv_Persona::select('ttjv_Persona.*')
            ->where(function($q) use ($buscar){
                $q->Where("TTJV_id_persona", "like", "%" . $buscar . "%")
                ->orwhere("TTJV_PersonaNombres", "like", "%" . $buscar . "%")
                ->orWhere("TTJV_PersonaIdentificacion", "like", "%" . $buscar . "%")
                ->orWhere("TTJV_PersonaApePaterno", "like", "%" . $buscar . "%")
                ->orWhere("TTJV_PersonaApeMaterno", "like", "%" . $buscar . "%")
                ->orWhere("TTJV_PersonaSexo", "like", "%" . $buscar . "%")
                ->orWhere("TTJV_PersonaResponsable", "like", "%" . $buscar . "%");
            })
            ->where("TTJV_PersonaIdentificacion", "!=", "9999999999")
            ->orderBy("TTJV_id_persona","DESC")->paginate(20);
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
    public function getetnia()
    {
        $etnia = ttjv_Etnia::all();
        return $etnia;
    }
    public function getgrupetario()
    {
        $grup = ttjv_Grupoetario::all();
        return $grup;
    }
    public function getprov()
    {
        $prov = ttjv_Provincia::all();
        return $prov;
    }
    public function getcanton($cod)
    {
        $canton = ttjv_Canton::select("*")->where('TTJV_cod_provincia', '=', $cod)->get();
        return $canton;
    }
    public function todos()
    {
        $data = ttjv_Persona::all();
        return $data;
    }
    public function store(Request $request)
    {
        $persona = new ttjv_Persona();
        $persona->TTJV_PersonaFhr  = Carbon::now();
        $persona->TTJV_PersonaTipoIden  = $request->TTJV_PersonaTipoIden;
        $persona->TTJV_PersonaIdentificacion  = $request->TTJV_PersonaIdentificacion;
        $persona->TTJV_PersonaApePaterno  = $request->TTJV_PersonaApePaterno;
        $persona->TTJV_PersonaApeMaterno  = $request->TTJV_PersonaApeMaterno;
        $persona->TTJV_PersonaNombres  = $request->TTJV_PersonaNombres;
        $persona->TTJV_PersonaFchNacimiento  = $request->TTJV_PersonaFchNacimiento;
        $persona->TTJV_PersonaSexo  = $request->TTJV_PersonaSexo;
        $persona->TTJV_PersonaOrientacionSexual  = $request->TTJV_PersonaOrientacionSexual;
        $persona->TTJV_PersonaEstadoCivil  = $request->TTJV_PersonaEstadoCivil;
        $persona->TTJV_PersonaNacionalidad  = $request->TTJV_PersonaNacionalidad;
        $persona->TTJV_PersonaDiscapacidad  = $request->TTJV_PersonaDiscapacidad;
        $persona->TTJV_PersonaAlergia  = $request->TTJV_PersonaAlergia;
        $persona->TTJV_PersonaInterquirugicas  = $request->TTJV_PersonaInterquirugicas;
        $persona->TTJV_PersonaVacuCompletas  = $request->TTJV_PersonaVacuCompletas;
        $persona->TTJV_PersonaTipoSangre  = $request->TTJV_PersonaTipoSangre;
        $persona->TTJV_PersonaOcupacion  = $request->TTJV_PersonaOcupacion;
        $persona->TTJV_PersonaReligion  = $request->TTJV_PersonaReligion;
        $persona->TTJV_PersonaDireccion  = $request->TTJV_PersonaDireccion;
        $persona->TTJV_PersonaTelefono  = $request->TTJV_PersonaTelefono;
        $persona->TTJV_PersonaTelefonoTrabajo  = $request->TTJV_PersonaTelefonoTrabajo;
        $persona->TTJV_PersonaCelular  = $request->TTJV_PersonaCelular;
        $persona->TTJV_PersonaEmail  = $request->TTJV_PersonaEmail;
        $persona->TTJV_PersonaNombreFamiliar  = $request->TTJV_PersonaNombreFamiliar;
        $persona->TTJV_PersonaApellidoFamiliar  = $request->TTJV_PersonaApellidoFamiliar;
        $persona->TTJV_PersonaDireccionFamiliar  = $request->TTJV_PersonaDireccionFamiliar;
        $persona->TTJV_PersonaCelularFamiliar  = $request->TTJV_PersonaCelularFamiliar;
        $persona->TTJV_PersonaEstado  = $request->TTJV_PersonaEstado;
        $persona->TTJV_PersonaEtnia  = $request->TTJV_PersonaEtnia;
        $persona->TTJV_PersonaGrupoEtario  = $request->TTJV_PersonaGrupoEtario;
        $persona->TTJV_PersonaProvincia  = $request->TTJV_PersonaProvincia;
        $persona->TTJV_PersonaCanton  = $request->TTJV_PersonaCanton;
        $persona->TTJV_id_usuario = Auth::user()->id;
        $persona->save();
        $idp = $persona->TTJV_id_persona;

        $sel = DB::select("SELECT TTJV_codigo as valor FROM ttjv_turnos WHERE `TTJV_codigo` LIKE '%B%' ORDER BY TTJV_id_turnos DESC LIMIT 1;");

        if (isset($sel[0]->valor)) {
            $valor = str_replace("B-", "", $sel[0]->valor);
            $pad = str_pad($valor + 1, 5, "0", STR_PAD_LEFT);
            $dato = "B-" . $pad;
        } else {
            $dato = "B-00001";
        }
        $turno = new ttjv_Turnos();
        $turno->TTJV_codigo  = $dato;
        $turno->TTJV_fecha = Carbon::now();
        $turno->TTJV_id_persona = $idp;
        $turno->TTJV_estado = 1;
        $turno->TTJV_id_usuario = Auth::user()->id;
        $turno->save();

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Agregar Paciente: " . $request->TTJV_PersonaNombres . " " . $request->TTJV_PersonaApePaterno . " " . $request->TTJV_PersonaApeMaterno . " Turno: " . $dato;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Paciente";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function edit(Request $request)
    {
        $persona = ttjv_Persona::findOrFail($request->TTJV_id_persona);
        $persona->TTJV_PersonaFhr  = $request->TTJV_PersonaFhr;
        $persona->TTJV_PersonaTipoIden  = $request->TTJV_PersonaTipoIden;
        $persona->TTJV_PersonaIdentificacion  = $request->TTJV_PersonaIdentificacion;
        $persona->TTJV_PersonaApePaterno  = $request->TTJV_PersonaApePaterno;
        $persona->TTJV_PersonaApeMaterno  = $request->TTJV_PersonaApeMaterno;
        $persona->TTJV_PersonaNombres  = $request->TTJV_PersonaNombres;
        $persona->TTJV_PersonaFchNacimiento  = $request->TTJV_PersonaFchNacimiento;
        $persona->TTJV_PersonaSexo  = $request->TTJV_PersonaSexo;
        $persona->TTJV_PersonaOrientacionSexual  = $request->TTJV_PersonaOrientacionSexual;
        $persona->TTJV_PersonaEstadoCivil  = $request->TTJV_PersonaEstadoCivil;
        $persona->TTJV_PersonaNacionalidad  = $request->TTJV_PersonaNacionalidad;
        $persona->TTJV_PersonaDiscapacidad  = $request->TTJV_PersonaDiscapacidad;
        $persona->TTJV_PersonaAlergia  = $request->TTJV_PersonaAlergia;
        $persona->TTJV_PersonaInterquirugicas  = $request->TTJV_PersonaInterquirugicas;
        $persona->TTJV_PersonaVacuCompletas  = $request->TTJV_PersonaVacuCompletas;
        $persona->TTJV_PersonaTipoSangre  = $request->TTJV_PersonaTipoSangre;
        $persona->TTJV_PersonaOcupacion  = $request->TTJV_PersonaOcupacion;
        $persona->TTJV_PersonaReligion  = $request->TTJV_PersonaReligion;
        $persona->TTJV_PersonaDireccion  = $request->TTJV_PersonaDireccion;
        $persona->TTJV_PersonaTelefono  = $request->TTJV_PersonaTelefono;
        $persona->TTJV_PersonaTelefonoTrabajo  = $request->TTJV_PersonaTelefonoTrabajo;
        $persona->TTJV_PersonaCelular  = $request->TTJV_PersonaCelular;
        $persona->TTJV_PersonaEmail  = $request->TTJV_PersonaEmail;
        $persona->TTJV_PersonaNombreFamiliar  = $request->TTJV_PersonaNombreFamiliar;
        $persona->TTJV_PersonaApellidoFamiliar  = $request->TTJV_PersonaApellidoFamiliar;
        $persona->TTJV_PersonaDireccionFamiliar  = $request->TTJV_PersonaDireccionFamiliar;
        $persona->TTJV_PersonaCelularFamiliar  = $request->TTJV_PersonaCelularFamiliar;
        $persona->TTJV_PersonaEstado  = $request->TTJV_PersonaEstado;
        $persona->TTJV_PersonaEtnia  = $request->TTJV_PersonaEtnia;
        $persona->TTJV_PersonaGrupoEtario  = $request->TTJV_PersonaGrupoEtario;
        $persona->TTJV_PersonaProvincia  = $request->TTJV_PersonaProvincia;
        $persona->TTJV_PersonaCanton  = $request->TTJV_PersonaCanton;
        $persona->TTJV_id_usuario = Auth::user()->id;
        $persona->save();

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Editar Paciente: " . $request->TTJV_PersonaNombres . " " . $request->TTJV_PersonaApePaterno . " " . $request->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Paciente";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function storeemergency(Request $request)
    {
        $persona = new ttjv_Persona();
        $persona->TTJV_PersonaFhr  = $request->TTJV_PersonaFhr;
        $persona->TTJV_PersonaTipoIden  = $request->TTJV_PersonaTipoIden;
        $persona->TTJV_PersonaIdentificacion  = $request->TTJV_PersonaIdentificacion;
        $persona->TTJV_PersonaApePaterno  = $request->TTJV_PersonaApePaterno;
        $persona->TTJV_PersonaApeMaterno  = $request->TTJV_PersonaApeMaterno;
        $persona->TTJV_PersonaNombres  = $request->TTJV_PersonaNombres;
        $persona->TTJV_PersonaFchNacimiento  = $request->TTJV_PersonaFchNacimiento;
        $persona->TTJV_PersonaSexo  = $request->TTJV_PersonaSexo;
        $persona->TTJV_PersonaOrientacionSexual  = $request->TTJV_PersonaOrientacionSexual;
        $persona->TTJV_PersonaEstadoCivil  = $request->TTJV_PersonaEstadoCivil;
        $persona->TTJV_PersonaNacionalidad  = $request->TTJV_PersonaNacionalidad;
        $persona->TTJV_PersonaDiscapacidad  = $request->TTJV_PersonaDiscapacidad;
        $persona->TTJV_PersonaAlergia  = $request->TTJV_PersonaAlergia;
        $persona->TTJV_PersonaInterquirugicas  = $request->TTJV_PersonaInterquirugicas;
        $persona->TTJV_PersonaVacuCompletas  = $request->TTJV_PersonaVacuCompletas;
        $persona->TTJV_PersonaTipoSangre  = $request->TTJV_PersonaTipoSangre;
        $persona->TTJV_PersonaOcupacion  = $request->TTJV_PersonaOcupacion;
        $persona->TTJV_PersonaReligion  = $request->TTJV_PersonaReligion;
        $persona->TTJV_PersonaDireccion  = $request->TTJV_PersonaDireccion;
        $persona->TTJV_PersonaTelefono  = $request->TTJV_PersonaTelefono;
        $persona->TTJV_PersonaTelefonoTrabajo  = $request->TTJV_PersonaTelefonoTrabajo;
        $persona->TTJV_PersonaCelular  = $request->TTJV_PersonaCelular;
        $persona->TTJV_PersonaEmail  = $request->TTJV_PersonaEmail;
        $persona->TTJV_PersonaNombreFamiliar  = $request->TTJV_PersonaNombreFamiliar;
        $persona->TTJV_PersonaApellidoFamiliar  = $request->TTJV_PersonaApellidoFamiliar;
        $persona->TTJV_PersonaDireccionFamiliar  = $request->TTJV_PersonaDireccionFamiliar;
        $persona->TTJV_PersonaCelularFamiliar  = $request->TTJV_PersonaCelularFamiliar;
        $persona->TTJV_PersonaEstado  = $request->TTJV_PersonaEstado;
        $persona->TTJV_PersonaEtnia  = $request->TTJV_PersonaEtnia;
        $persona->TTJV_PersonaGrupoEtario  = $request->TTJV_PersonaGrupoEtario;
        $persona->TTJV_PersonaProvincia  = $request->TTJV_PersonaProvincia;
        $persona->TTJV_PersonaCanton  = $request->TTJV_PersonaCanton;
        $persona->TTJV_id_usuario = Auth::user()->id;
        $persona->save();
        $idp = $persona->TTJV_id_persona;

        $sel = DB::select("SELECT TTJV_codigo as valor FROM ttjv_turnos WHERE `TTJV_codigo` LIKE '%A%' ORDER BY TTJV_id_turnos DESC LIMIT 1;");

        if (isset($sel[0]->valor)) {
            $valor = str_replace("A-", "", $sel[0]->valor);
            $pad = str_pad($valor + 1, 5, "0", STR_PAD_LEFT);
            $dato = "A-" . $pad;
        } else {
            $dato = "A-00001";
        }
        $turno = new ttjv_turnos();
        $turno->TTJV_codigo  = $dato;
        $turno->TTJV_fecha = Carbon::now();
        $turno->TTJV_id_persona = $idp;
        $turno->TTJV_estado = 2;
        $turno->TTJV_id_usuario = Auth::user()->id;
        $turno->save();
        $idt = $turno->TTJV_id_turnos;

        $person = ttjv_Persona::findOrFail($idp);
        $person->TTJV_PersonaApePaterno  = $turno->TTJV_codigo;
        $person->save();


        $aten = new ttjv_Atencion();
        $aten->TTJV_fecha = $request->TTJV_PersonaFhr;
        $aten->TTJV_estado = 1;
        $aten->TTJV_id_persona = $idp;
        $aten->TTJV_id_usuario = Auth::user()->id;
        $aten->TTJV_id_turnos = $idt;
        $aten->save();

        $rest = new ttjv_Resultado();
        $rest->TTJV_color = 1;
        $rest->TTJV_id_persona = $idp;
        $rest->TTJV_id_turno = $idt;
        $rest->save();

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Agregar Paciente de Emergencia con Turno: " . $dato;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Paciente";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function delete($id)
    {

        $per = DB::select("SELECT * FROM ttjv_persona WHERE TTJV_id_persona = $id;");

        ttjv_Persona::destroy($id);

        $audit = new ttjv_Auditoria();
        $audit->TTJV_accion = "Eliminar Paciente: " . $per[0]->TTJV_PersonaNombres . " " . $per[0]->TTJV_PersonaApePaterno . " " . $per[0]->TTJV_PersonaApeMaterno;
        $audit->TTJV_fecha = Carbon::now();
        $audit->TTJV_modulo = "Paciente";
        $audit->TTJV_origen =  \Request::ip();
        $audit->TTJV_id_usuario = Auth::user()->id;
        $audit->save();
    }
    public function excel()
    {
        return Excel::download(new PacienteExport, 'Pacientes.xlsx');      
    }
    public function pdf()
    {
       $pacient = ttjv_Persona::select(
        "ttjv_persona.TTJV_id_persona",
        "ttjv_persona.TTJV_PersonaFhr",
        "ttjv_persona.TTJV_PersonaTipoIden",
        "ttjv_persona.TTJV_PersonaIdentificacion",
        "ttjv_persona.TTJV_PersonaApePaterno",
        "ttjv_persona.TTJV_PersonaApeMaterno",
        "ttjv_persona.TTJV_PersonaNombres",
        "ttjv_persona.TTJV_PersonaFchNacimiento",
        "ttjv_persona.TTJV_PersonaSexo",
        "ttjv_persona.TTJV_PersonaOrientacionSexual",
        "ttjv_persona.TTJV_PersonaEstadoCivil",
        "ttjv_persona.TTJV_PersonaNacionalidad",
        "ttjv_persona.TTJV_PersonaDiscapacidad",
        "ttjv_persona.TTJV_PersonaAlergia",
        "ttjv_persona.TTJV_PersonaInterquirugicas",
        "ttjv_persona.TTJV_PersonaVacuCompletas",
        "ttjv_persona.TTJV_PersonaTipoSangre",
        "ttjv_persona.TTJV_PersonaOcupacion",
        "ttjv_persona.TTJV_PersonaReligion",
        "ttjv_persona.TTJV_PersonaDireccion",
        "ttjv_persona.TTJV_PersonaTelefono",
        "ttjv_persona.TTJV_PersonaTelefonoTrabajo",
        "ttjv_persona.TTJV_PersonaCelular",
        "ttjv_persona.TTJV_PersonaEmail",
        "ttjv_persona.TTJV_PersonaNombreFamiliar",
        "ttjv_persona.TTJV_PersonaApellidoFamiliar",
        "ttjv_persona.TTJV_PersonaDireccionFamiliar",
        "ttjv_persona.TTJV_PersonaCelularFamiliar",
        "ttjv_persona.TTJV_PersonaEstado",  
        "ttjv_etnia.TTJV_descripcion as Etnia",
        "ttjv_grupoetario.TTJV_descricion as Etario",
        "ttjv_provincia.TTJV_descripcion as Provincia",
        "ttjv_canton.TTJV_descripcion as  Canton"
    )
    ->leftJoin("ttjv_etnia", "ttjv_etnia.TTJV_codetnia", "=", "ttjv_persona.TTJV_PersonaEtnia")
    ->leftJoin("ttjv_grupoetario", "ttjv_grupoetario.TTJV_id_grupoetario", "=", "ttjv_persona.TTJV_PersonaGrupoEtario")
    ->leftJoin("ttjv_provincia", "ttjv_provincia.TTJV_cod_provincia", "=", "ttjv_persona.TTJV_PersonaProvincia")      
    ->leftJoin("ttjv_canton", "ttjv_canton.TTJV_cod_canton", "=", "ttjv_persona.TTJV_PersonaCanton")
    ->get();
       $pdf = PDF::loadView('pdf.Paciente', compact('pacient'));
       return $pdf->download('Pacientes.pdf');      
     }
}
