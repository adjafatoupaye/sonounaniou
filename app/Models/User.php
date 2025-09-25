<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Support\Str;
use App\Notifications\NewUserNotification;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'must_change_password',
        'password_changed_at',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'must_change_password' => 'boolean',
        'password_changed_at' => 'datetime',
    ];

    protected static function booted()
    {
        static::creating(function ($user) {
            // Si pas de mot de passe fourni, générer un mot de passe aléatoire
            if (!$user->password) {
                $plainPassword = Str::random(10);
                $user->password = bcrypt($plainPassword);
                $user->plain_password = $plainPassword; // temporaire pour la notif
            }
        });

        static::created(function ($user) {
            // Envoi notification avec le mot de passe en clair
            $password = $user->plain_password ?? 'motdepasseconnu';
            $user->notify(new NewUserNotification($password));

            // Supprimer le plain_password pour sécurité
            unset($user->plain_password);
        });
    }
}
