<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\HasMany;
use Illuminate\Http\Request;
use Laravel\Nova\Resource;

class Quiz extends Resource
{
    public static $model = \App\Models\Quiz::class;
    public static $title = 'titre';
    public static $search = ['id','titre'];

    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Lecon'),
            Text::make('Titre')->rules('required'),
            HasMany::make('Questions')
        ];
    }

    public static function authorizedToViewAny(Request $request)
    {
        return $request->user()->hasRole('Administrateur') || $request->user()->hasRole('Formateur');
    }
}
