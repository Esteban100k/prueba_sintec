<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    use HasFactory;

    protected $fillable = ['titulo', 'descripcion', 'id_estado', 'fecha_creacion'];

    public function estado()
    {
        return $this->belongsTo(Estado::class, 'id_estado');
    }
}
