<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DocumentLine
 * 
 * @property int $id
 * @property int|null $product_id
 * @property int|null $document_id
 * @property string|null $label
 * @property float|null $quantity
 * @property float|null $price
 * @property int|null $discount_type
 * @property float|null $discount
 * @property float|null $net_price
 * @property int|null $store_id
 * @property string|null $movement_type
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Document|null $document
 * @property Product|null $product
 * @property Store|null $store
 *
 * @package App\Models
 */
class DocumentLine extends Model
{
	protected $table = 'document_lines';

	protected $casts = [
		'product_id' => 'int',
		'document_id' => 'int',
		'quantity' => 'float',
		'price' => 'float',
		'discount_type' => 'int',
		'discount' => 'float',
		'net_price' => 'float',
		'store_id' => 'int'
	];

	protected $fillable = [
		'product_id',
		'document_id',
		'label',
		'quantity',
		'price',
		'discount_type',
		'discount',
		'net_price',
		'store_id',
		'movement_type'
	];

	public function document()
	{
		return $this->belongsTo(Document::class);
	}

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	public function store()
	{
		return $this->belongsTo(Store::class);
	}
}
