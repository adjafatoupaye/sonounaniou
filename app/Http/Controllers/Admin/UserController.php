<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'role' => 'nullable|string',
        ]);

        // Crée l'utilisateur avec un mot de passe random (non communiqué)
        $temp = Str::random(12);
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $data['role'] ?? null,
            'password' => Hash::make($temp),
            'must_change_password' => true,
        ]);

        // Envoie le lien de reset de mot de passe (utilise le broker par défaut)
        $status = Password::sendResetLink(['email' => $user->email]);

        if ($status === Password::RESET_LINK_SENT) {
            return redirect()->route('admin.users.index')->with('success', 'Utilisateur créé et lien de création envoyé par e-mail.');
        }

        return redirect()->back()->with('error', 'Erreur lors de l’envoi du mail : ' . $status);
    }
}
