<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class OrderLine
 * 
 * @property int $id
 * @property int|null $order_id
 * @property int|null $book_id
 * @property int|null $quantity
 * @property int|null $delivered
 * @property int|null $remaining
 * @property float|null $unit_price
 * @property int|null $cover
 * @property float|null $cover_price
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Book|null $book
 * @property Order|null $order
 *
 * @package App\Models
 */
class OrderLine extends Model
{
	protected $table = 'order_lines';

	protected $casts = [
		'order_id' => 'int',
		'book_id' => 'int',
		'quantity' => 'int',
		'delivered' => 'int',
		'remaining' => 'int',
		'unit_price' => 'float',
		'cover' => 'int',
		'cover_price' => 'float'
	];

	protected $fillable = [
		'order_id',
		'book_id',
		'quantity',
		'delivered',
		'remaining',
		'unit_price',
		'cover',
		'cover_price'
	];

	public function book()
	{
		return $this->belongsTo(Book::class);
	}

	public function order()
	{
		return $this->belongsTo(Order::class);
	}
}
