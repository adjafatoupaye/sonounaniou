<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Bienvenue sur AL AMINE</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #f7f7f7;
            color: #333;
            line-height: 1.6;
        }
        .container {
            width: 90%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #fff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .logo img {
            max-width: 150px;
        }
        .content p {
            font-size: 16px;
        }
        .credentials {
            background-color: #e8f0fe;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .credentials strong {
            display: inline-block;
            width: 90px;
        }
        .btn {
            display: inline-block;
            background-color: #0c3a6a;
            color: #fff !important;
            text-decoration: none;
            padding: 12px 25px;
            border-radius: 5px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="logo">
        <img src="{{ $logoUrl }}" alt="Al Amine Groupe">
    </div>
    <div class="content">
        <p>Bonjour {{ $notifiable->name }},</p>
        <p>Un compte a été créé pour vous sur notre plateforme AL AMINE HUMAN CAPITAL.</p>
        <div class="credentials">
            <p><strong>Email :</strong> {{ $notifiable->email }}</p>
            <p><strong>Mot de passe :</strong> {{ $password }}</p>
        </div>
        <p>Nous vous conseillons de modifier votre mot de passe après votre première connexion.</p>
        <a href="{{ url('/login') }}" class="btn">Se connecter</a>
        <p>Merci et bienvenue parmi nous !</p>
    </div>
</div>
</body>
</html>
