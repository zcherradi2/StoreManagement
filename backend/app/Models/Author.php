<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Author
 * 
 * @property int $id
 * @property int|null $book_id
 * @property string|null $name
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Book|null $book
 *
 * @package App\Models
 */
class Author extends Model
{
	protected $table = 'authors';

	protected $casts = [
		'book_id' => 'int'
	];

	protected $fillable = [
		'book_id',
		'name'
	];

	public function book()
	{
		return $this->belongsTo(Book::class);
	}
}
