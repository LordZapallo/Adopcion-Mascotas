<?php

namespace App\Exports;

use App\Models\ttjv_Turnos;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite \ Excel \ Concerns \ shouldAutoSize; 

class TurnosExport implements FromCollection, WithHeadings, ShouldAutoSize 
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return ttjv_Turnos::select(
            "ttjv_turnos.TTJV_id_turnos",
            "ttjv_turnos.TTJV_codigo",
            "ttjv_turnos.TTJV_fecha",
            "ttjv_turnos.TTJV_estado",
            "ttjv_persona.TTJV_PersonaNombres",
            "ttjv_persona.TTJV_PersonaApePaterno",
            "ttjv_persona.TTJV_PersonaApeMaterno",
     
        )
        ->leftJoin("ttjv_persona", "ttjv_persona.TTJV_id_persona", "=", "ttjv_turnos.TTJV_id_persona")
            ->get();
    }
    public function headings(): array
    {
        return [
            'No.',
            'Código de Turno',
            'Fecha',
            'Estado',
            'Paciente Nombres',
            'Apellido Paterno',
            'Apellido Materno',
        ];
    }
}
