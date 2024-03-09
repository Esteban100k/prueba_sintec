<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Estado;

class EstadosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Estado::insert([
            ['nombre_estado' => 'Por hacer'],
            ['nombre_estado' => 'En progreso'],
            ['nombre_estado' => 'Terminada'],
            ['nombre_estado' => 'Aplazada'],
        ]);
    }
}
