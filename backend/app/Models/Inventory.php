<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Inventory
 * 
 * @property int $id
 * @property string|null $date
 * @property int|null $product_id
 * @property float|null $quantity
 * @property float $purchase_price
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Product|null $product
 *
 * @package App\Models
 */
class Inventory extends Model
{
	protected $table = 'inventory';

	protected $casts = [
		'product_id' => 'int',
		'quantity' => 'float',
		'purchase_price' => 'float'
	];

	protected $fillable = [
		'date',
		'product_id',
		'quantity',
		'purchase_price'
	];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}
}
