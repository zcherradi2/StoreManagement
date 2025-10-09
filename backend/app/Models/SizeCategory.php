<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SizeCategory
 * 
 * @property int $id
 * @property string|null $label
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Product[] $products
 * @property Collection|Size[] $sizes
 *
 * @package App\Models
 */
class SizeCategory extends Model
{
	protected $table = 'size_categories';

	protected $fillable = [
		'label'
	];

	public function products()
	{
		return $this->hasMany(Product::class);
	}

	public function sizes()
	{
		return $this->hasMany(Size::class, 'category_id');
	}
}
