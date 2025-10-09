<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Order
 * 
 * @property int $id
 * @property string|null $date
 * @property string|null $number
 * @property int|null $third_party_id
 * @property float|null $total
 * @property float|null $paid
 * @property float|null $balance
 * @property int|null $status
 * @property int|null $supplies
 * @property string|null $comments
 * @property float|null $books_total
 * @property float|null $covers_total
 * @property int|null $delivery
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property ThirdParty|null $third_party
 * @property Collection|OrderLine[] $order_lines
 * @property Collection|OrderPayment[] $order_payments
 *
 * @package App\Models
 */
class Order extends Model
{
	protected $table = 'orders';

	protected $casts = [
		'third_party_id' => 'int',
		'total' => 'float',
		'paid' => 'float',
		'balance' => 'float',
		'status' => 'int',
		'supplies' => 'int',
		'books_total' => 'float',
		'covers_total' => 'float',
		'delivery' => 'int'
	];

	protected $fillable = [
		'date',
		'number',
		'third_party_id',
		'total',
		'paid',
		'balance',
		'status',
		'supplies',
		'comments',
		'books_total',
		'covers_total',
		'delivery'
	];

	public function third_party()
	{
		return $this->belongsTo(ThirdParty::class);
	}

	public function order_lines()
	{
		return $this->hasMany(OrderLine::class);
	}

	public function order_payments()
	{
		return $this->hasMany(OrderPayment::class);
	}
}
