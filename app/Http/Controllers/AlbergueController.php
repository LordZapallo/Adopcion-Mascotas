<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Albergue;

class AlbergueController extends Controller
{
    function listar_general(){
        return Albergue::all();
    }
}
