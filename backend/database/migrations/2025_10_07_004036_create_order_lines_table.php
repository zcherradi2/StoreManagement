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
        Schema::create('order_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->nullable()->constrained('orders');
            $table->foreignId('book_id')->nullable()->constrained('books');
            $table->integer('quantity')->nullable();
            $table->integer('delivered')->nullable();
            $table->integer('remaining')->nullable();
            $table->decimal('unit_price', 10, 2)->nullable();
            $table->tinyInteger('cover')->nullable();
            $table->decimal('cover_price', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_lines');
    }
};
