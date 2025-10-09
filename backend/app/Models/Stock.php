<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Stock
 * 
 * @property int $product_id
 * @property int $store_id
 * @property float|null $quantity
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Product $product
 * @property Store $store
 *
 * @package App\Models
 */
class Stock extends Model
{
	protected $table = 'stock';
	public $incrementing = false;

	protected $casts = [
		'product_id' => 'int',
		'store_id' => 'int',
		'quantity' => 'float'
	];

	protected $fillable = [
		'quantity'
	];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	public function store()
	{
		return $this->belongsTo(Store::class);
	}
}
