<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookStock
 * 
 * @property int $book_id
 * @property int $store_id
 * @property int|null $quantity
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Book $book
 * @property Store $store
 *
 * @package App\Models
 */
class BookStock extends Model
{
	protected $table = 'book_stock';
	public $incrementing = false;

	protected $casts = [
		'book_id' => 'int',
		'store_id' => 'int',
		'quantity' => 'int'
	];

	protected $fillable = [
		'quantity'
	];

	public function book()
	{
		return $this->belongsTo(Book::class);
	}

	public function store()
	{
		return $this->belongsTo(Store::class);
	}
}
