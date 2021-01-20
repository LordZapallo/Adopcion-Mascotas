<?php

namespace App\Exports;

use App\Models\ttjv_Resultado;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\shouldAutoSize;

class ResultadosExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return ttjv_Resultado::select(
            "ttjv_resultados.TTJV_id_resultado",
            "ttjv_turnos.TTJV_codigo",
            "ttjv_persona.TTJV_PersonaNombres",
            "ttjv_persona.TTJV_PersonaApePaterno",
            "ttjv_persona.TTJV_PersonaApeMaterno",
            "ttjv_motivo_consulta.TTJV_nombre",
            DB::raw("if(ttjv_resultados.TTJV_color=1, 'Rojo', if(ttjv_resultados.TTJV_color=2, 'Naranja', if(ttjv_resultados.TTJV_color=3, 'Amarillo', if(ttjv_resultados.TTJV_color=4, 'Verde', 'Azul')))) AS Color"),
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
    }
    public function headings(): array
    {
        return [
            'No.',
            'Turno',
            'Paciente Nombres',
            'Paciente Apellido Paterno',
            'Paciente Apellido Materno',
            'Motivo Consulta ',
            'Color',
            'Tratamiento',
            'Proxima cita',
            'Plan',

        ];
    }
}
