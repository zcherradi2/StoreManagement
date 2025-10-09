<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 * 
 * @property int $id
 * @property string|null $label
 * @property int|null $font_color
 * @property int|null $background_color
 * @property string|null $photo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|ProductMemory[] $product_memories
 * @property Collection|Product[] $products
 *
 * @package App\Models
 */
class Category extends Model
{
	protected $table = 'categories';

	protected $casts = [
		'font_color' => 'int',
		'background_color' => 'int'
	];

	protected $fillable = [
		'label',
		'font_color',
		'background_color',
		'photo'
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
