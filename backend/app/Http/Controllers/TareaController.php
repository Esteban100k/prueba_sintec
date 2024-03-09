<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarea;

class TareaController extends Controller
{
    public function index()
    {
        return Tarea::all();
    }

    public function store(Request $request)
    {
        return Tarea::create($request->all());
    }

    public function show(Tarea $tarea)
    {
        return $tarea;
    }

    public function update(Request $request, Tarea $tarea)
    {
        $tarea->update($request->all());
        return $tarea;
    }

    public function destroy(Tarea $tarea)
    {
        $tarea->delete();
        return response()->json([], 204);
    }
}
