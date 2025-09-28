<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewUserNotification extends Notification implements ShouldQueue
{
    use Queueable;

    protected $password;

    public function __construct($password)
    {
        $this->password = $password;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
{
    $logoUrl = asset('images/al.png');

    return (new MailMessage)
        ->subject('Bienvenue sur AL AMINE HUMAN CAPITAL')
        ->view('emails.new_user', [
            'notifiable' => $notifiable,
            'password' => $this->password,
            'logoUrl' => $logoUrl,
        ]);
}

}
