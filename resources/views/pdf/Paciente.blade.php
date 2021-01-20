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
                <th>Identificacion</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Nombres</th>
                <th>Sexo</th>

            </tr>
        </thead>
        <tbody>
            @foreach($pacient as $pacient)
            <tr>
                <td>{{$pacient->TTJV_id_persona}}</td>
                <td>{{$pacient->TTJV_PersonaIdentificacion}}</td>
                <td>{{$pacient->TTJV_PersonaApePaterno}}</td>
                <td>{{$pacient->TTJV_PersonaApeMaterno}}</td>
                <td>{{$pacient->TTJV_PersonaNombres}}</td>
                <td>{{$pacient->TTJV_PersonaSexo}}</td>

            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>