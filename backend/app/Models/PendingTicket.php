<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PendingTicket
 * 
 * @property int $id
 * @property int|null $number
 * @property string|null $date
 * @property string|null $time
 * @property int|null $customer_id
 * @property int|null $user_id
 * @property float $total
 * @property float $discount
 * @property float $net_total
 * @property float $paid
 * @property float $balance
 * @property int $status
 * @property int $closure
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property ThirdParty|null $third_party
 * @property User|null $user
 *
 * @package App\Models
 */
class PendingTicket extends Model
{
	protected $table = 'pending_tickets';

	protected $casts = [
		'number' => 'int',
		'customer_id' => 'int',
		'user_id' => 'int',
		'total' => 'float',
		'discount' => 'float',
		'net_total' => 'float',
		'paid' => 'float',
		'balance' => 'float',
		'status' => 'int',
		'closure' => 'int'
	];

	protected $fillable = [
		'number',
		'date',
		'time',
		'customer_id',
		'user_id',
		'total',
		'discount',
		'net_total',
		'paid',
		'balance',
		'status',
		'closure'
	];

	public function third_party()
	{
		return $this->belongsTo(ThirdParty::class, 'customer_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
