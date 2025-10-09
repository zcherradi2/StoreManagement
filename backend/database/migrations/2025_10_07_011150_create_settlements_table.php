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
        Schema::create('settlements', function (Blueprint $table) {
            $table->id();
            $table->char('date', 8)->nullable();
            $table->decimal('amount', 12, 2)->nullable();
            $table->string('description', 200)->nullable();
            $table->foreignId('payment_method_id')->nullable()->constrained('payment_methods');
            $table->foreignId('third_party_id')->nullable()->constrained('third_parties');
            $table->char('type', 2)->nullable();
            $table->decimal('balance', 12, 2)->nullable();
            $table->char('due_date', 8)->nullable();
            $table->tinyInteger('status')->nullable();
            $table->timestamps();
            
            $table->index('third_party_id');
            $table->index('type');
            $table->index('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settlements');
    }
};
