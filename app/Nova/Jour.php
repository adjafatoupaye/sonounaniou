<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Fields\HasMany;
use Illuminate\Http\Request;
use Laravel\Nova\Resource;

class Jour extends Resource
{
    public static $model = \App\Models\Jour::class;
    public static $title = 'titre';
    public static $search = ['id','titre'];

    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),
            Text::make('Titre')->sortable()->rules('required','max:255'),
            Textarea::make('Description')->rules('nullable'),
            HasMany::make('Cours','Cours', \App\Nova\Cours::class)
        ];
    }

    // Permissions
    public static function authorizedToViewAny(Request $request)
    {
        return $request->user()->hasRole('Administrateur');
    }

    public static function authorizedToCreate(Request $request)
    {
        return $request->user()->hasRole('Administrateur');
    }
}
