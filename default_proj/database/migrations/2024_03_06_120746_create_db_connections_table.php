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
        Schema::create('db_connections', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('ip');
            $table->string('port');
            $table->string('name');
            $table->string('login');
            $table->string('password');
            $table->string('table_name');
            $table->foreignId('site_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('db_connections');
    }
};
