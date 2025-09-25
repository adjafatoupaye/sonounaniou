<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'fatoupaye9@gmail.com'],
            [
                'name' => 'Adja Fatou',
                'password' => Hash::make('afpaye19'),
            ]
        );

        // Assigner le rôle Administrateur
        $user->assignRole('Administrateur');

        // Debug : affichage console
        echo "Admin créé : " . $user->name . " - " . $user->email . "\n";
    }
}
