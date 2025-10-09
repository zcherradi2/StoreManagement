<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('product_memory', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->nullable()->unique();
            $table->string('name', 50)->nullable();
            $table->decimal('purchase_price', 10, 2)->nullable();
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->foreignId('tax_id')->nullable()->constrained('taxes');
            $table->foreignId('category_id')->nullable()->constrained('categories');
            $table->integer('font_color')->nullable();
            $table->integer('background_color')->nullable();
            $table->char('discount_type', 1)->nullable();
            $table->decimal('discount_rate', 10, 2)->nullable();
            $table->decimal('discount_amount', 10, 2)->nullable();
            $table->decimal('net_sale_price', 10, 2)->nullable();
            $table->string('supplier_reference', 20)->nullable();
            $table->timestamps();
        });

        // // Only apply MEMORY engine if using MySQL
        // if (DB::getDriverName() === 'mysql') {
        //     DB::statement('ALTER TABLE product_memory ENGINE = MEMORY');
        // }
    }

    public function down()
    {
        Schema::dropIfExists('product_memory');
    }
};
