<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Size
 * 
 * @property int $id
 * @property int|null $category_id
 * @property string|null $label
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property SizeCategory|null $size_category
 *
 * @package App\Models
 */
class Size extends Model
{
	protected $table = 'sizes';

	protected $casts = [
		'category_id' => 'int'
	];

	protected $fillable = [
		'category_id',
		'label'
	];

	public function size_category()
	{
		return $this->belongsTo(SizeCategory::class, 'category_id');
	}
}
