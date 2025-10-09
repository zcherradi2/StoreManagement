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
        DB::statement('DROP VIEW IF EXISTS stock_by_category');
        DB::statement("
            CREATE VIEW stock_by_category AS
            SELECT 
                p.id AS product_id,
                dl.id AS document_line_id,
                SUM(
                    IF(d.type IN ('FR', 'ES'), 
                        dl.quantity, 
                        -(dl.quantity)
                    )
                ) AS qty
            FROM document_lines dl
            LEFT JOIN documents d ON dl.id = d.id
            LEFT JOIN products p ON dl.id = p.id
            WHERE d.date >= p.inventory_date
            GROUP BY p.id, dl.id
        ");
    }

    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS stock_by_category");
    }
};
