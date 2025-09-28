@extends('layouts.app')

@section('content')
<div class="container">
    <h2>Modifier le mot de passe</h2>

    @if(session('success'))
        <div style="color:green;">{{ session('success') }}</div>
    @endif

    <form method="POST" action="{{ route('password.update') }}">
        @csrf

        <div>
            <label>Mot de passe actuel</label>
            <input type="password" name="current_password" required>
            @error('current_password')
                <div style="color:red;">{{ $message }}</div>
            @enderror
        </div>

        <div>
            <label>Nouveau mot de passe</label>
            <input type="password" name="password" required>
            @error('password')
                <div style="color:red;">{{ $message }}</div>
            @enderror
        </div>

        <div>
            <label>Confirmer le nouveau mot de passe</label>
            <input type="password" name="password_confirmation" required>
        </div>

        <button type="submit">Mettre à jour</button>
    </form>
</div>
@endsection
