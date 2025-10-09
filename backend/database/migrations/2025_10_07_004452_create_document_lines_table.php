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
        Schema::create('document_lines', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->nullable()->constrained('products');
            $table->foreignId('document_id')->nullable()->constrained('documents');
            $table->string('label', 50)->nullable();
            $table->float('quantity')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->tinyInteger('discount_type')->nullable();
            $table->decimal('discount', 10, 2)->nullable();
            $table->float('net_price')->nullable();
            $table->foreignId('store_id')->nullable()->constrained('stores');
            $table->char('movement_type', 1)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_lines');
    }
};
