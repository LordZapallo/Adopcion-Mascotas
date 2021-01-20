<?php

namespace App\Exports;

use App\Models\ttjv_Persona;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite \ Excel \ Concerns \ shouldAutoSize; 

class PacienteExport implements FromCollection, WithHeadings, ShouldAutoSize 
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return ttjv_Persona::select(
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

    }
    public function headings(): array
    {
        return [
            'No.',
            'Fecha de Creación',
            'Tipo de Identificación',
            'No. Identificación',
            'Apellido Paterno',
            'Apellido Materno',
            'Nombres',
            'Fecha Nacimiento',
            'Sexo',
            'Orientacion Sexual',
            'Estado Civil',
            'Nacionalidad',
            'Discapacidad',
            'Alergias',
            'Interveciones Quirúrgicas',
            'Vacunas Completas',
            'Tipo de Sangre',
            'Ocupación',
            'Religión',
            'Dirección',
            'Télefono',
            'Télefono Trabajo',
            'Télefono Celular',
            'Email',
            'Nombre de Familiar',
            'Apellido de Familiar',
            'Dirección de Familiar',
            'Celular de Familiar',
            'Estado',
            'Etnia',
            'Grupo Etario',
            'Provincia',
            'Cantón',

        ];
    }
}
