<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Invoice
 * 
 * @property int $id
 * @property string|null $number
 * @property string|null $date
 * @property float|null $total_ht
 * @property float|null $total_vat
 * @property float|null $total_ttc
 * @property float|null $total_paid
 * @property float|null $balance
 * @property int|null $status
 * @property string|null $reference
 * @property int|null $third_party_id
 * @property int|null $user_id
 * @property int|null $condition_id
 * @property int|null $font_color
 * @property int|null $background_color
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property ThirdParty|null $third_party
 * @property User|null $user
 *
 * @package App\Models
 */
class Invoice extends Model
{
	protected $table = 'invoices';

	protected $casts = [
		'total_ht' => 'float',
		'total_vat' => 'float',
		'total_ttc' => 'float',
		'total_paid' => 'float',
		'balance' => 'float',
		'status' => 'int',
		'third_party_id' => 'int',
		'user_id' => 'int',
		'condition_id' => 'int',
		'font_color' => 'int',
		'background_color' => 'int'
	];

	protected $fillable = [
		'number',
		'date',
		'total_ht',
		'total_vat',
		'total_ttc',
		'total_paid',
		'balance',
		'status',
		'reference',
		'third_party_id',
		'user_id',
		'condition_id',
		'font_color',
		'background_color'
	];

	public function third_party()
	{
		return $this->belongsTo(ThirdParty::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
