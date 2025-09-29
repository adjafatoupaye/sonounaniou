<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

    // CSRF cookie + login
Route::middleware('web')->group(function () {
    Route::get('/sanctum/csrf-cookie', function() {
        return response()->json(['csrf' => csrf_token()]);
    });
});

Route::post('/login', function(Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
    }

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'success' => true,
        'user' => $user,
        'access_token' => $token,
        'token_type' => 'Bearer'
    ]);
});

Route::middleware('auth:sanctum')->get('/me', function(Request $request) {
    return $request->user();
});

    Route::middleware('auth:sanctum')->post('/change-password', function(Request $request) {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|string|min:8|confirmed', // password_confirmation
        ]);

    $user = $request->user();

    if (!Hash::check($request->current_password, $user->password)) {
        return response()->json(['message' => 'Mot de passe actuel incorrect.'], 422);
    }

    $user->password = Hash::make($request->password);
    $user->save();

    return response()->json(['message' => 'Mot de passe mis à jour avec succès !']);
});


Route::middleware(['auth'])->group(function () {
    Route::get('/profile/password', [ProfileController::class, 'editPassword'])->name('password.edit');
    Route::post('/profile/password', [ProfileController::class, 'updatePassword'])->name('password.update');
});


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});
