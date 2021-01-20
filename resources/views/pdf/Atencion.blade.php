<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
        .table {
            border-collapse: collapse;
            width: 100%;
        }

        td,
        th {
            font-size: 10px;
            border: 1px solid #999;
            padding: 3px;
        }
    </style>
</head>

<body>
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Turno</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Paciente</th>
                <th>Usuario Creador</th>
            </tr>
        </thead>
        <tbody>
            @foreach($atent as $atent)
            <tr>
                <td>{{$atent->TTJV_id_atencion}}</td>
                <td>{{$atent->TTJV_codigo}}</td>
                <td>{{$atent->TTJV_fecha}}</td>
                <td>{{$atent->Estado}}</td>
                <td>{{$atent->TTJV_PersonaNombres}} {{$atent->TTJV_PersonaApePaterno}} {{$atent->TTJV_PersonaApeMaterno}}</td>
                <td>{{$atent->Usuario}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>