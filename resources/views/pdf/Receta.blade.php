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
                <th>Turno</th>
                <th>Paciente</th>
                <th>Medicamento</th>
                <th>Presentación</th>
                <th>Dosis</th>
                <th>Duración</th>
                <th>Cantidad</th>
            </tr>
        </thead>
        <tbody>
            @foreach($receta as $receta)
            <tr>
                <td>{{$receta->TTJV_codigo}}</td>
                <td>{{$receta->TTJV_PersonaNombres}} {{$receta->TTJV_PersonaApePaterno}} {{$receta->TTJV_PersonaApeMaterno}}</td>
                <td>{{$receta->TTJV_medicamento}}</td>
                <td style="text-align:center;">{{$receta->TTJV_presentacion}}</td>
                <td style="text-align:center;">{{$receta->TTJV_dosis}}</td>
                <td style="text-align:center;">{{$receta->TTJV_duracion}}</td>
                <td style="text-align:center;">{{$receta->TTJV_cantidad}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>