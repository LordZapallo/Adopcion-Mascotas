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
                <th>Acción Realizada</th>
                <th>Fecha</th>
                <th>Módulo</th>
                <th>IP Origen</th>
                <th>Nombre Usuario</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            @foreach($audit as $auditoria)
            <tr>
                <td>{{$auditoria->TTJV_id_auditoria}}</td>
                <td>{{$auditoria->TTJV_accion}}</td>
                <td>{{$auditoria->TTJV_fecha}}</td>
                <td>{{$auditoria->TTJV_modulo}}</td>
                <td>{{$auditoria->TTJV_origen}}</td>
                <td>{{$auditoria->nombre}} {{$auditoria->apellido}}</td>
                <td>{{$auditoria->email}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>