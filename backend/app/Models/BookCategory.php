<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookCategory
 * 
 * @property int $book_id
 * @property int $category_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Book $book
 * @property BookCategory $book_category
 *
 * @package App\Models
 */
class BookCategory extends Model
{
	protected $table = 'book_category';
	public $incrementing = false;

	protected $casts = [
		'book_id' => 'int',
		'category_id' => 'int'
	];

	public function book()
	{
		return $this->belongsTo(Book::class);
	}

	public function book_category()
	{
		return $this->belongsTo(BookCategory::class, 'category_id');
	}
}
