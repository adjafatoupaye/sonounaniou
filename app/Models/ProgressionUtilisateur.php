<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressionUtilisateur extends Model
{
    protected $table = 'progression_utilisateur';
    protected $fillable = ['user_id','lecon_id','termine','points'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function lecon()
    {
        return $this->belongsTo(Lecon::class);
    }
}

