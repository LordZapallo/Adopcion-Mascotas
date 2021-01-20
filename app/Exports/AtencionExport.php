<?php

namespace App\Exports;

use App\Models\ttjv_Atencion;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\shouldAutoSize;

class AtencionExport implements FromCollection, WithHeadings, ShouldAutoSize
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {

        return ttjv_Atencion::select(
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
    }
    public function headings(): array
    {
        return [
            'No.',
            'Turno',
            'Servicio',
            'Fecha',
            'Estado',
            'Paciente Nombres ',
            'Paciente Apellido Paterno',
            'Paciente Apellido Materno',
            'Usuario Creador',
            
        ];
    }
}
