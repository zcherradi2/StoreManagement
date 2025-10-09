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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('company_name', 100)->nullable();
            $table->integer('ticket_number')->nullable();
            $table->string('quantity_format', 20)->nullable();
            $table->string('price_format', 20)->nullable();
            $table->string('currency', 20)->nullable();
            $table->string('currency_cents', 20)->nullable();
            $table->char('code_input_type', 1)->nullable();
            $table->string('code_mask', 20)->nullable();
            $table->integer('article_code')->default(1);
            $table->foreignId('store_id')->nullable()->constrained('stores');
            $table->string('entry_mask', 20)->nullable();
            $table->string('exit_mask', 20)->nullable();
            $table->integer('entry_number')->nullable();
            $table->string('delivery_note_mask', 20)->nullable();
            $table->integer('exit_number')->nullable();
            $table->tinyInteger('number_copies')->nullable();
            $table->tinyInteger('delivery_price')->nullable();
            $table->tinyInteger('ticket_price')->nullable();
            $table->tinyInteger('software_type')->nullable()->comment('1 RETAIL / 2 BOOKSTORE');
            $table->float('label_height')->nullable();
            $table->float('label_width')->nullable();
            $table->float('margin_top')->nullable();
            $table->float('margin_left')->nullable();
            $table->float('horizontal_spacing')->nullable();
            $table->float('vertical_spacing')->nullable();
            $table->smallInteger('label_count')->nullable();
            $table->tinyInteger('label_size')->nullable();
            $table->tinyInteger('label_visible')->nullable();
            $table->float('barcode_height')->nullable();
            $table->float('barcode_width')->nullable();
            $table->integer('delivery_number')->nullable();
            $table->string('order_mask', 50)->nullable();
            $table->integer('order_number')->default(0);
            $table->string('ticket_printer', 200)->nullable();
            $table->string('barcode_printer', 200)->nullable();
            $table->string('report_printer', 200)->nullable();
            $table->tinyInteger('pos_photos')->default(1);
            $table->tinyInteger('invoice_number')->default(1);
            $table->string('invoice_mask', 50)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
