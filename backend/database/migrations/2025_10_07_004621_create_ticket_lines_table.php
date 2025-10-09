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
        Schema::create('ticket_lines', function (Blueprint $table) {
            $table->id();
            $table->integer('ticket_id')->default(0);
            $table->integer('product_id')->default(0);
            $table->decimal('price', 14, 2)->default(0);
            $table->decimal('quantity', 14, 4)->default(0);
            $table->string('label', 200)->default('0');
            $table->timestamps();
            
            $table->index('ticket_id');
            $table->index('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ticket_lines');
    }
};
