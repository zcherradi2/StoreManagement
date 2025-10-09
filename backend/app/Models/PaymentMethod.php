<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PaymentMethod
 * 
 * @property int $id
 * @property string|null $type
 * @property string|null $method
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|OrderPayment[] $order_payments
 * @property Collection|Settlement[] $settlements
 *
 * @package App\Models
 */
class PaymentMethod extends Model
{
	protected $table = 'payment_methods';

	protected $fillable = [
		'type',
		'method'
	];

	public function order_payments()
	{
		return $this->hasMany(OrderPayment::class);
	}

	public function settlements()
	{
		return $this->hasMany(Settlement::class);
	}
}
