<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style>
        .table {
            border-collapse: collapse;
        }

        td,
        th {
            width: 100%;
            border: 1px solid #999;
            padding: 5px;
            font-size: 10px;
        }

        #globalWrapper {
            width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>

<body>
    <div class= "globalWrapper">
        <table class="table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Cédula</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Celular</th>
                    <th>Email</th>

                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                <tr>
                    <td>{{$user->id}}</td>
                    <td>{{$user->nombre}}</td>
                    <td>{{$user->apellido}}</td>
                    <td>{{$user->cedula}}</td>
                    <td>{{$user->direccion}}</td>
                    <td>{{$user->telefono}}</td>
                    <td>{{$user->celular}}</td>
                    <td>{{$user->email}}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>