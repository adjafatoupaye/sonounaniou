<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lecon extends Model
{
    protected $fillable = ['cours_id','titre','description','type_contenu','fichier'];

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }

    public function quiz()
    {
        return $this->hasOne(Quiz::class);
    }

    public function progression()
    {
        return $this->hasMany(ProgressionUtilisateur::class);
    }
}

