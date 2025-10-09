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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('document_id')->constrained('documents');
            $table->char('payment_method', 10);
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('bank', 50)->nullable();
            $table->string('branch', 50)->nullable();
            $table->string('number', 20)->nullable();
            $table->char('date', 8)->nullable();
            $table->char('due_date', 8)->nullable();
            $table->tinyInteger('cashed')->nullable();
            $table->char('cash_date', 8)->nullable();
            $table->timestamps();
            
            $table->index(['document_id', 'payment_method']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
