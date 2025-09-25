<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\HasMany;
use Illuminate\Http\Request;
use Laravel\Nova\Resource;

class Question extends Resource
{
    public static $model = \App\Models\Question::class;
    public static $title = 'question';
    public static $search = ['id','question'];

    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Quiz'),
            Text::make('Question')->rules('required'),
            HasMany::make('Reponses')
        ];
    }

    public static function authorizedToViewAny(Request $request)
    {
        return $request->user()->hasRole('Administrateur') || $request->user()->hasRole('Formateur');
    }
}
