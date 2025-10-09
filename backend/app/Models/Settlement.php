<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Settlement
 * 
 * @property int $id
 * @property string|null $date
 * @property float|null $amount
 * @property string|null $description
 * @property int|null $payment_method_id
 * @property int|null $third_party_id
 * @property string|null $type
 * @property float|null $balance
 * @property string|null $due_date
 * @property int|null $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property PaymentMethod|null $payment_method
 * @property ThirdParty|null $third_party
 *
 * @package App\Models
 */
class Settlement extends Model
{
	protected $table = 'settlements';

	protected $casts = [
		'amount' => 'float',
		'payment_method_id' => 'int',
		'third_party_id' => 'int',
		'balance' => 'float',
		'status' => 'int'
	];

	protected $fillable = [
		'date',
		'amount',
		'description',
		'payment_method_id',
		'third_party_id',
		'type',
		'balance',
		'due_date',
		'status'
	];

	public function payment_method()
	{
		return $this->belongsTo(PaymentMethod::class);
	}

	public function third_party()
	{
		return $this->belongsTo(ThirdParty::class);
	}
}
