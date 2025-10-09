<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DocumentPayment
 * 
 * @property int $document_id
 * @property int $payment_id
 * @property float|null $amount
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class DocumentPayment extends Model
{
	protected $table = 'document_payments';
	public $incrementing = false;

	protected $casts = [
		'document_id' => 'int',
		'payment_id' => 'int',
		'amount' => 'float'
	];

	protected $fillable = [
		'amount'
	];
}
