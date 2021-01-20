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
                <th>Identificación</th>
                <th>Paciente</th>
                <th>Sexo</th>
            </tr>
        </thead>
        <tbody>
            @foreach($act as $act)
            <tr>
                <td>{{$act->TTJV_id_persona}}</td>
                <td>{{$act->TTJV_codigo}}</td>
                <td>{{$act->TTJV_PersonaIdentificacion}}</td>
                <td>{{$act->TTJV_PersonaNombres}} {{$act->TTJV_PersonaApePaterno}} {{$act->TTJV_PersonaApeMaterno}}</td>
                <td>{{$act->TTJV_PersonaSexo}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>