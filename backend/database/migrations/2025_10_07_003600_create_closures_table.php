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
        Schema::create('closures', function (Blueprint $table) {
            $table->id();
            $table->char('start_date', 8)->nullable();
            $table->char('start_time', 8)->nullable();
            $table->char('end_date', 8)->nullable();
            $table->char('end_time', 8)->nullable();
            $table->decimal('start_amount', 14, 2)->nullable();
            $table->decimal('sale_amount', 14, 2)->nullable();
            $table->decimal('deposit_withdrawal', 14, 2)->nullable();
            $table->decimal('final_amount', 14, 2)->nullable();
            $table->tinyInteger('status')->nullable();
            $table->timestamps();
            
            $table->unique(['start_date', 'start_time']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('closures');
    }
};
