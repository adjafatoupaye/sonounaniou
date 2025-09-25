@extends('nova::auth.layout')

@section('content')

@include('nova::auth.partials.header')

<style>
    body {
        background-color: #F3FAF7;
    }

    .btn-primary {
        background-color: #0c3a6a;
        border-color: #0c3a6a;
        color: white;
    }

    .btn-primary:hover {
        background-color: #0c3a6a;
    }

    .text-primary {
        color: #0c3a6a;
    }

    .form-control:focus {
        border-color: #0c3a6a;
        box-shadow: 0 0 0 0.2rem rgba(65, 123, 159, 0.25);
    }

    .text-danger {
        color: #C0392B;
    }

    .form-input-bordered {
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        padding: 0.75rem;
    }
</style>

<form class="bg-white shadow rounded-lg p-8 max-w-login mx-auto" method="POST" action="{{ route('nova.login') }}">
    {{ csrf_field() }}

    @component('nova::auth.partials.heading')
        {{ __('Bienvenue sur Al Amine Human Capital') }}
    @endcomponent

    @if ($errors->any())
        <p class="text-center font-semibold text-danger my-3">
            {{ $errors->first() }}
        </p>
    @endif

    <div class="mb-6">
        <label class="block font-bold mb-2" for="email">{{ __('Adresse Email') }}</label>
        <input class="form-control form-input form-input-bordered w-full" id="email" type="email" name="email" value="{{ old('email') }}" required autofocus>
    </div>

    <div class="mb-6">
        <label class="block font-bold mb-2" for="password">{{ __('Mot de passe') }}</label>
        <input class="form-control form-input form-input-bordered w-full" id="password" type="password" name="password" required>
    </div>

    <div class="flex mb-6">
        <label class="flex items-center text-xl font-bold">
            <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
            <span class="text-base ml-2">{{ __('Se souvenir de moi') }}</span>
        </label>

        @if (\Laravel\Nova\Nova::resetsPasswords())
        <div class="ml-auto">
            <a class="text-primary dim font-bold no-underline" href="{{ route('nova.password.request') }}">
                {{ __('Mot de passe oublié ?') }}
            </a>
        </div>
        @endif
    </div>

    <button class="w-full btn btn-default btn-primary hover:bg-primary-dark" type="submit">
        {{ __('Connexion') }}
    </button>
</form>

@endsection
