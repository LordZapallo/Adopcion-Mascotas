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
                <th>Paciente</th>
                <th>Motivo Consulta</th>
                <th>Color</th>
                <th>Tratamiento</th>
                <th>Proxima cita</th>
                <th>Plan</th>
            </tr>
        </thead>
        <tbody>
            @foreach($result as $result)
            <tr>
                <td>{{$result->TTJV_id_resultado}}</td>
                <td>{{$result->TTJV_codigo}}</td>
                <td>{{$result->TTJV_PersonaNombres}} {{$result->TTJV_PersonaApePaterno}} {{$result->TTJV_PersonaApeMaterno}}</td>
                <td style="font-size: 10px;" >{{$result->TTJV_nombre}}</td>
                <td style="font-size: 12px;" >{{$result->TTJV_color}}</td>
                <td>{{$result->TTJV_tratamiento}}</td>
                <td>{{$result->TTJV_proxima_cita}}</td>
                <td>{{$result->TTJV_plan}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>