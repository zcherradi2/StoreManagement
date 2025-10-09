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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->char('date', 8)->nullable();
            $table->string('number', 30)->nullable();
            $table->foreignId('third_party_id')->nullable()->constrained('third_parties');
            $table->decimal('total', 10, 2)->nullable();
            $table->decimal('paid', 10, 2)->nullable();
            $table->decimal('balance', 10, 2)->nullable();
            $table->tinyInteger('status')->nullable();
            $table->tinyInteger('supplies')->nullable();
            $table->string('comments', 500)->nullable();
            $table->decimal('books_total', 10, 2)->nullable();
            $table->decimal('covers_total', 10, 2)->nullable();
            $table->tinyInteger('delivery')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
