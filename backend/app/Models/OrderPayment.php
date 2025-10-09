<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class OrderPayment
 * 
 * @property int $id
 * @property string|null $date
 * @property float|null $amount
 * @property int|null $order_id
 * @property int|null $payment_method_id
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Order|null $order
 * @property PaymentMethod|null $payment_method
 *
 * @package App\Models
 */
class OrderPayment extends Model
{
	protected $table = 'order_payments';

	protected $casts = [
		'amount' => 'float',
		'order_id' => 'int',
		'payment_method_id' => 'int'
	];

	protected $fillable = [
		'date',
		'amount',
		'order_id',
		'payment_method_id',
		'description'
	];

	public function order()
	{
		return $this->belongsTo(Order::class);
	}

	public function payment_method()
	{
		return $this->belongsTo(PaymentMethod::class);
	}
}
