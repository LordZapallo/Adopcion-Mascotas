<?php

namespace App\Exports;

use App\Models\ttjv_Receta;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite \ Excel \ Concerns \ shouldAutoSize; 

class RecetaExport implements FromCollection, WithHeadings, ShouldAutoSize 
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return ttjv_Receta::select(
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
    }
    public function headings(): array
    {
        return [
            'No.',
            'Turno',
            'Paciente Nombre',
            'Paciente Apellido Paterno',
            'Paciente Apellido Materno',
            'Medicamento',
            'Presentacion',
            'Dosis',
            'Duración',
            'Cantidad',
        ];
    }
}
