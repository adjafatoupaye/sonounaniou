<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lecons', function (Blueprint $table) {
    $table->id();
    $table->foreignId('cours_id')->constrained('cours')->onDelete('cascade');
    $table->string('titre');          // Titre de la leçon
    $table->text('contenu')->nullable(); // Texte explicatif
    $table->string('video_url')->nullable();  // Lien vidéo
    $table->timestamps();
});

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('lecons');
    }
};
