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
        Schema::create('document_payments', function (Blueprint $table) {
            $table->foreignId('document_id');
            $table->foreignId('payment_id');
            $table->decimal('amount', 12, 2)->nullable();
            $table->timestamps();
            
            $table->primary(['document_id', 'payment_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('document_payments');
    }
};
