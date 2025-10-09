<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class StockByCategory
 * 
 * @property int|null $product_id
 * @property int $document_line_id
 * @property float|null $qty
 *
 * @package App\Models
 */
class StockByCategory extends Model
{
	protected $table = 'stock_by_category';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'product_id' => 'int',
		'document_line_id' => 'int',
		'qty' => 'float'
	];

	protected $fillable = [
		'product_id',
		'document_line_id',
		'qty'
	];
}
