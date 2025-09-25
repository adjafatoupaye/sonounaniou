<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jour extends Model
{
    protected $fillable = ['titre', 'description', 'date'];

    public function cours()
    {
        return $this->hasMany(Cours::class);
    }
}

