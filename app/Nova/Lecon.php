<?php

namespace App\Nova;

use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Textarea;
use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Fields\File;
use Laravel\Nova\Fields\HasOne;
use Illuminate\Http\Request;
use Laravel\Nova\Resource;

class Lecon extends Resource
{
    public static $model = \App\Models\Lecon::class;
    public static $title = 'titre';
    public static $search = ['id','titre'];

    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),
            BelongsTo::make('Cours','Cours', \app\Nova\Cours::class),
            Text::make('Titre')->rules('required','max:255'),
            Textarea::make('Description')->rules('nullable'),
            Select::make('Type de contenu')->options([
                'texte'=>'Texte',
                'video'=>'Vidéo',
                'pdf'=>'PDF'
            ])->rules('required'),
            File::make('Fichier')->disk('public'),
            HasOne::make('Quiz','Quiz', \App\Nova\Quiz::class)
        ];
    }

    // Permissions
    public static function authorizedToViewAny(Request $request)
    {
        // Admin voit tout, Formateurs/Apprenants voient uniquement leurs leçons assignées
        return $request->user()->hasRole('Administrateur') || $request->user()->hasRole('Formateur') || $request->user()->hasRole('Apprenant');
    }
}
