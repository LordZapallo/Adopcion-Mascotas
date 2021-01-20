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

            border: 1px solid #999;
            padding: 3px;
        }

        .cent {
            text-align: center;
            width: 100%;
        }
        .bord{
            border: 1px double #999;
        }
    </style>
</head>

<body class="bord">
    <div class="cent">
    @foreach($turnot as $turnot)
            <h1> Turno Generado</h1>
            <h2>No. {{$turnot->TTJV_codigo}} </h2>
            <h2>Paciente: {{$turnot->TTJV_PersonaNombres}} {{$turnot->TTJV_PersonaApePaterno}} {{$turnot->TTJV_PersonaApeMaterno}}</h2>
            <h2>Fecha de Inicio: {{$turnot->TTJV_fecha}}</h2>
            <h3>Tiempo Estimado: {{$turnot->Color}} </h3>
            @endforeach
        </div>
</body>

</html>