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
        Schema::create('third_parties', function (Blueprint $table) {
            $table->id();
            $table->char('type', 2)->nullable();
            $table->string('account_number', 12)->nullable();
            $table->string('name', 50)->nullable();
            $table->string('contact', 50)->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('mobile', 50)->nullable();
            $table->string('address', 200)->nullable();
            $table->string('city', 30)->nullable();
            $table->decimal('balance', 14, 2)->nullable();
            $table->timestamps();
            
            $table->unique(['type', 'account_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('third_parties');
    }
};
