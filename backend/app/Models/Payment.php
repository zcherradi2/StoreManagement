<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Payment
 * 
 * @property int $id
 * @property int $document_id
 * @property string $payment_method
 * @property float|null $amount
 * @property string|null $bank
 * @property string|null $branch
 * @property string|null $number
 * @property string|null $date
 * @property string|null $due_date
 * @property int|null $cashed
 * @property string|null $cash_date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Document $document
 *
 * @package App\Models
 */
class Payment extends Model
{
	protected $table = 'payments';

	protected $casts = [
		'document_id' => 'int',
		'amount' => 'float',
		'cashed' => 'int'
	];

	protected $fillable = [
		'document_id',
		'payment_method',
		'amount',
		'bank',
		'branch',
		'number',
		'date',
		'due_date',
		'cashed',
		'cash_date'
	];

	public function document()
	{
		return $this->belongsTo(Document::class);
	}
}
