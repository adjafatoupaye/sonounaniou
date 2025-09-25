<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\HasMany;
use Illuminate\Http\Request;
use Laravel\Nova\Resource;

class Cours extends Resource
{
    public static $model = \App\Models\Cours::class;
    public static $title = 'titre';
    public static $search = ['id','titre'];

    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Jour'),
            Text::make('Titre')->rules('required','max:255'),
            Textarea::make('Description')->rules('nullable'),
            HasMany::make('Lecons')
        ];
    }

    // Permissions
    public static function authorizedToViewAny(Request $request)
    {
        return $request->user()->hasRole('Administrateur');
    }
}
