<?php

namespace App\Exports;

use App\Models\Usuario;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite \ Excel \ Concerns \ shouldAutoSize; 

class UsuarioExport implements FromCollection, WithHeadings, ShouldAutoSize 
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return Usuario::select(
            "users.id",
            "users.nombre",
            "users.apellido",
            "users.cedula",
            "users.direccion",
            "users.telefono",
            "users.celular",
            "users.estado",
            "users.email",
            "users.created_at",
            "users.updated_at",
        )
            ->get();
    }
    public function headings(): array
    {
        return [
            'No.',
            'Nombre',
            'Apellido',
            'Cédula',
            'Dirección',
            'Teléfono',
            'Celular',
            'Estado',
            'Email',
            'Fecha de Creación',
            'Fecha de Edición',

        ];
    }
}
