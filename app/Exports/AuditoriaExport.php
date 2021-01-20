<?php

namespace App\Exports;

use App\Models\ttjv_Auditoria;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite \ Excel \ Concerns \ shouldAutoSize; 

class AuditoriaExport implements FromCollection, WithHeadings, ShouldAutoSize 
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return ttjv_Auditoria::select(
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
    }
    public function headings(): array
    {
        return [
            'No.',
            'Acción Realizada',
            'Fecha',
            'Módulo',
            'IP Origen',
            'Nombre de Usuario ',
            'Apellido de Usuario',
            'Email de Usuario',
        ];
    }
}
