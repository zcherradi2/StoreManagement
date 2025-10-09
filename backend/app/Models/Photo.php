<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Photo
 * 
 * @property int $id
 * @property int|null $product_id
 * @property string|null $photo
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Product|null $product
 *
 * @package App\Models
 */
class Photo extends Model
{
	protected $table = 'photos';

	protected $casts = [
		'product_id' => 'int'
	];

	protected $fillable = [
		'product_id',
		'photo'
	];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}
}
