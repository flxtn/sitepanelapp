<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('domains', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('registrator')->nullable();
            $table->string('login')->nullable();
            $table->string('password')->nullable();
            $table->string('name')->nullable();
            $table->string('date')->nullable();
            $table->boolean('is_linked')->default(false);
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('domains');
    }
};
