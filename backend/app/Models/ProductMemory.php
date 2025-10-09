<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProductMemory
 * 
 * @property int $id
 * @property string|null $code
 * @property string|null $name
 * @property float|null $purchase_price
 * @property float|null $sale_price
 * @property int|null $tax_id
 * @property int|null $category_id
 * @property int|null $font_color
 * @property int|null $background_color
 * @property string|null $discount_type
 * @property float|null $discount_rate
 * @property float|null $discount_amount
 * @property float|null $net_sale_price
 * @property string|null $supplier_reference
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Category|null $category
 * @property Tax|null $tax
 *
 * @package App\Models
 */
class ProductMemory extends Model
{
	protected $table = 'product_memory';

	protected $casts = [
		'purchase_price' => 'float',
		'sale_price' => 'float',
		'tax_id' => 'int',
		'category_id' => 'int',
		'font_color' => 'int',
		'background_color' => 'int',
		'discount_rate' => 'float',
		'discount_amount' => 'float',
		'net_sale_price' => 'float'
	];

	protected $fillable = [
		'code',
		'name',
		'purchase_price',
		'sale_price',
		'tax_id',
		'category_id',
		'font_color',
		'background_color',
		'discount_type',
		'discount_rate',
		'discount_amount',
		'net_sale_price',
		'supplier_reference'
	];

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function tax()
	{
		return $this->belongsTo(Tax::class);
	}
}
