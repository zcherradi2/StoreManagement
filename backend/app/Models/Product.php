<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Product
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
 * @property string|null $photo
 * @property string|null $discount_type
 * @property float|null $discount_rate
 * @property float|null $discount_amount
 * @property float|null $net_sale_price
 * @property string|null $supplier_reference
 * @property int|null $size_id
 * @property int|null $size_category_id
 * @property string|null $color
 * @property float $min_stock
 * @property float $max_stock
 * @property string|null $inventory_date
 * @property int|null $threshold
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Category|null $category
 * @property SizeCategory|null $size_category
 * @property Tax|null $tax
 * @property Collection|DocumentLine[] $document_lines
 * @property Collection|Inventory[] $inventories
 * @property Collection|Stock[] $stocks
 *
 * @package App\Models
 */
class Product extends Model
{
	protected $table = 'products';

	protected $casts = [
		'purchase_price' => 'float',
		'sale_price' => 'float',
		'tax_id' => 'int',
		'category_id' => 'int',
		'font_color' => 'int',
		'background_color' => 'int',
		'discount_rate' => 'float',
		'discount_amount' => 'float',
		'net_sale_price' => 'float',
		'size_id' => 'int',
		'size_category_id' => 'int',
		'min_stock' => 'float',
		'max_stock' => 'float',
		'threshold' => 'int'
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
		'photo',
		'discount_type',
		'discount_rate',
		'discount_amount',
		'net_sale_price',
		'supplier_reference',
		'size_id',
		'size_category_id',
		'color',
		'min_stock',
		'max_stock',
		'inventory_date',
		'threshold'
	];

	public function category()
	{
		return $this->belongsTo(Category::class);
	}

	public function size_category()
	{
		return $this->belongsTo(SizeCategory::class);
	}

	public function tax()
	{
		return $this->belongsTo(Tax::class);
	}

	public function document_lines()
	{
		return $this->hasMany(DocumentLine::class);
	}

	public function inventories()
	{
		return $this->hasMany(Inventory::class);
	}

	public function photo()
	{
		return $this->hasOne(Photo::class);
	}

	public function stocks()
	{
		return $this->hasMany(Stock::class);
	}
}
