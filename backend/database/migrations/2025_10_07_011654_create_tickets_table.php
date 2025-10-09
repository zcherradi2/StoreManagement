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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->integer('number')->nullable();
            $table->char('date', 8)->nullable();
            $table->char('time', 8)->nullable();
            $table->foreignId('customer_id')->nullable()->constrained('third_parties');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->decimal('total', 12, 2)->default(0);
            $table->decimal('discount', 12, 2)->default(0);
            $table->decimal('net_total', 12, 2)->default(0);
            $table->decimal('paid', 12, 2)->default(0);
            $table->decimal('balance', 12, 2)->default(0);
            $table->tinyInteger('status')->default(0);
            $table->tinyInteger('closure')->default(0);
            $table->timestamps();
            
            $table->index('customer_id');
            $table->index('user_id');
            $table->index('closure');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
