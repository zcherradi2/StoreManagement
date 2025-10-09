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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->nullable()->unique();
            $table->string('name', 50)->nullable();
            $table->decimal('purchase_price', 10, 2)->nullable();
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->foreignId('tax_id')->nullable()->constrained('taxes');
            $table->foreignId('category_id')->nullable()->constrained('categories');
            $table->integer('font_color')->nullable();
            $table->integer('background_color')->nullable();
            $table->binary('photo')->nullable();
            $table->char('discount_type', 1)->nullable();
            $table->decimal('discount_rate', 10, 2)->nullable();
            $table->decimal('discount_amount', 10, 2)->nullable();
            $table->decimal('net_sale_price', 10, 2)->nullable();
            $table->string('supplier_reference', 50)->nullable();
            $table->foreignId('size_id')->nullable();
            $table->foreignId('size_category_id')->nullable()->constrained('size_categories');
            $table->string('color', 50)->nullable();
            $table->decimal('min_stock', 10, 2)->default(0);
            $table->decimal('max_stock', 10, 2)->default(0);
            $table->char('inventory_date', 8)->nullable();
            $table->integer('threshold')->nullable();
            $table->timestamps();
            
            $table->index('inventory_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
