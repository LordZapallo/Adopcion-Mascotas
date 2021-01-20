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
<!--<h1> Turnos</h1>-->
    <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Código de Turno</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Paciente</th>
                <th>Usuario Creador</th>


            </tr>
        </thead>
        <tbody>
            @foreach($turno as $turno)
            <tr>
                <td>{{$turno->TTJV_id_turnos}}</td>
                <td>{{$turno->TTJV_codigo}}</td>
                <td>{{$turno->TTJV_fecha}}</td>
                <td>{{$turno->TTJV_estado}}</td>
                <td>{{$turno->TTJV_PersonaNombres}} {{$turno->TTJV_PersonaApePaterno}} {{$turno->TTJV_PersonaApeMaterno}}</td>
                <td>{{$turno->nombre}} {{$turno->apellido}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>