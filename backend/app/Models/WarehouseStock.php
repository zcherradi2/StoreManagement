<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class WarehouseStock
 * 
 * @property int|null $product_id
 * @property int $store_id
 * @property float|null $qty
 *
 * @package App\Models
 */
class WarehouseStock extends Model
{
	protected $table = 'warehouse_stock';
	public $incrementing = false;
	public $timestamps = false;

	protected $casts = [
		'product_id' => 'int',
		'store_id' => 'int',
		'qty' => 'float'
	];

	protected $fillable = [
		'product_id',
		'store_id',
		'qty'
	];
}
