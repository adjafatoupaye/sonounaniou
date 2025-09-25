<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    protected $fillable = ['jour_id', 'titre', 'description'];

    public function jour()
    {
        return $this->belongsTo(Jour::class);
    }

    public function lecons()
    {
        return $this->hasMany(Lecon::class);
    }
}
