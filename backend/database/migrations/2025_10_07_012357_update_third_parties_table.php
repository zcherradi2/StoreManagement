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
        Schema::table('third_parties', function (Blueprint $table) {
            $table->decimal('total_purchased', 14, 2)->default(0)->after('balance');
            $table->decimal('total_paid', 14, 2)->default(0)->after('total_purchased');
            $table->tinyInteger('price_code')->nullable()->after('total_paid');
            $table->string('tax_id_number', 20)->nullable()->after('price_code');
            $table->string('ice_number', 20)->nullable()->after('tax_id_number');
            $table->decimal('credit_limit', 18, 2)->nullable()->after('ice_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('third_parties', function (Blueprint $table) {
            $table->dropColumn([
                'total_purchased',
                'total_paid',
                'price_code',
                'tax_id_number',
                'ice_number',
                'credit_limit'
            ]);
        });
    }
};
