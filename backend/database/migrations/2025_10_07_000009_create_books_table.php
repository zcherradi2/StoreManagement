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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('isbn', 20)->nullable()->unique();
            $table->string('isbn13', 13)->nullable();
            $table->string('title', 200)->nullable();
            $table->string('publisher', 200)->nullable();
            $table->string('language', 100)->nullable();
            $table->string('publication_date', 50)->nullable();
            $table->string('format', 50)->nullable();
            $table->string('pages', 50)->nullable();
            $table->decimal('purchase_price', 10, 2)->nullable();
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->string('comments', 1000)->nullable();
            $table->decimal('net_purchase_price', 10, 2)->nullable();
            $table->decimal('discount', 6, 2)->nullable();
            $table->foreignId('category_id')->nullable()->constrained('book_categories');
            $table->foreignId('third_party_id')->nullable()->constrained('third_parties');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
