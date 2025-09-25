<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Fields\BelongsTo;
use Illuminate\Http\Request;
use Laravel\Nova\Resource;

class Reponse extends Resource
{
    public static $model = \App\Models\Reponse::class;
    public static $title = 'reponse';
    public static $search = ['id','reponse'];

    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Question'),
            Text::make('Réponse')->rules('required'),
            Boolean::make('Correcte')
        ];
    }

    public static function authorizedToViewAny(Request $request)
    {
        return $request->user()->hasRole('Administrateur') || $request->user()->hasRole('Formateur');
    }
}
