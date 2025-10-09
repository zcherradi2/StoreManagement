<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('scales', function (Blueprint $table) {
            $table->id();
            $table->text('code')->nullable();
            $table->text('description')->nullable();
            $table->integer('port')->nullable();
            $table->integer('speed')->nullable();
            $table->integer('data_bits')->nullable();
            $table->integer('parity')->nullable();
            $table->integer('stop_bits')->nullable();
            $table->char('model', 1)->nullable();
            $table->char('mode', 1)->default('S')->comment('S - Stream, M - Manual');
            $table->string('procedure', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scales');
    }
};
