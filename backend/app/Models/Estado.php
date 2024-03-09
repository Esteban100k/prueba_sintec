<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Estado extends Model
{
    use HasFactory;

    protected $fillable = ['nombre_estado'];

    public function tareas()
    {
        return $this->hasMany(Tarea::class, 'id_estado');
    }
}
