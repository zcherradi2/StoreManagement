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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('number', 20)->nullable();
            $table->char('date', 8)->nullable();
            $table->decimal('total_ht', 12, 0)->nullable();
            $table->decimal('total_vat', 12, 0)->nullable();
            $table->decimal('total_ttc', 12, 0)->nullable();
            $table->decimal('total_paid', 12, 0)->nullable();
            $table->decimal('balance', 12, 0)->nullable();
            $table->tinyInteger('status')->nullable();
            $table->string('reference', 200)->nullable();
            $table->foreignId('third_party_id')->nullable()->constrained('third_parties');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->foreignId('condition_id')->nullable();
            $table->integer('font_color')->nullable();
            $table->integer('background_color')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
