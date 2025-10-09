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
        Schema::create('book_stock', function (Blueprint $table) {
            $table->foreignId('book_id')->constrained('books');
            $table->foreignId('store_id')->constrained('stores');
            $table->integer('quantity')->nullable();
            $table->timestamps();
            
            $table->primary(['book_id', 'store_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_stock');
    }
};
