<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Tax
 * 
 * @property int $id
 * @property string|null $name
 * @property float|null $rate
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|ProductMemory[] $product_memories
 * @property Collection|Product[] $products
 *
 * @package App\Models
 */
class Tax extends Model
{
	protected $table = 'taxes';

	protected $casts = [
		'rate' => 'float'
	];

	protected $fillable = [
		'name',
		'rate'
	];

	public function product_memories()
	{
		return $this->hasMany(ProductMemory::class);
	}

	public function products()
	{
		return $this->hasMany(Product::class);
	}
}
