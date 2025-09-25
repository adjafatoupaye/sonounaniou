<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['lecon_id','titre'];

    public function lecon()
    {
        return $this->belongsTo(Lecon::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}

