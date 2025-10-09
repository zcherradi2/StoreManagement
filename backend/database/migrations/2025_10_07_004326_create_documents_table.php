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
        Schema::create('documents', function (Blueprint $table) {
            $table->id();
            $table->char('type', 2)->nullable()->comment('BL, BR, ES, SS, TR, TK etc...');
            $table->string('number', 20)->nullable();
            $table->string('date', 20)->nullable();
            $table->string('time', 20)->nullable();
            $table->foreignId('third_party_id')->nullable()->constrained('third_parties');
            $table->foreignId('origin_store_id')->nullable()->constrained('stores');
            $table->foreignId('destination_store_id')->nullable()->constrained('stores');
            $table->foreignId('user_id')->nullable()->constrained('users');
            $table->decimal('total_ht', 18, 2)->nullable();
            $table->decimal('total_vat', 18, 2)->nullable();
            $table->decimal('total_ttc', 18, 2)->nullable();
            $table->decimal('discount', 18, 2)->nullable();
            $table->decimal('net_total', 18, 2)->nullable();
            $table->decimal('paid', 18, 2)->nullable();
            $table->decimal('balance', 18, 2)->nullable();
            $table->unsignedTinyInteger('status')->default(0);
            $table->foreignId('closure_id')->nullable()->constrained('closures');
            $table->string('description', 500)->nullable();
            $table->unsignedInteger('invoice_id')->default(0);
            $table->timestamps();
            
            $table->unique(['type', 'number']);
            $table->index(['date', 'time']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};
