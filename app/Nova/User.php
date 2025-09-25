<?php

namespace App\Nova;

use App\Models\User as UserModel;
use Illuminate\Http\Request;
use Laravel\Nova\Fields\Gravatar;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Password;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Select;
use Laravel\Nova\Resource;
use Spatie\Permission\Models\Role;
use App\Notifications\NewUserNotification;


class User extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var class-string<\App\Models\User>
     */
    public static $model = UserModel::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'name';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id', 'name', 'email',
    ];

    /**
     * Get the fields displayed by the resource.
     */
    public function fields(Request $request)
    {
        return [
            ID::make()->sortable(),

            Gravatar::make()->maxWidth(50),

            Text::make('Name')
                ->sortable()
                ->rules('required', 'max:255'),

            Text::make('Email')
                ->sortable()
                ->rules('required', 'email', 'max:254')
                ->creationRules('unique:users,email')
                ->updateRules('unique:users,email,{{resourceId}}'),

            Password::make('Password')
                ->onlyOnForms()
                ->creationRules('required', 'string', 'min:8')
                ->updateRules('nullable', 'string', 'min:8'),

            // Dropdown pour choisir le rôle
            Select::make('Role', 'role')
                ->options([
                    'Administrateur' => 'Administrateur',
                    'Formateur' => 'Formateur',
                    'Apprenant' => 'Apprenant',

                ])
                ->displayUsingLabels()
                ->onlyOnForms()
                ->fillUsing(function ($request, $model, $attribute, $requestAttribute) {
                    $model->syncRoles([$request->get($requestAttribute)]);
                }),
        ];
    }

    public static function relatableRoles(NovaRequest $request, $query)
    {
        return $query->whereIn('name', ['Administrateur', 'Formateur', 'Apprenant']);
    }

    public function cards(Request $request)
    {
        return [];
    }

    public function filters(Request $request)
    {
        return [];
    }

    public function lenses(Request $request)
    {
        return [];
    }

    public function actions(Request $request)
    {
        return [];
    }

    public static function authorizedToViewAny(Request $request)
{
    return $request->user()->hasRole('Administrateur');
}

public static function authorizedToCreate(Request $request)
{
    return $request->user()->hasRole('Administrateur');
}



}
