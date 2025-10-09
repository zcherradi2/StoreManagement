<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Closure
 * 
 * @property int $id
 * @property string|null $start_date
 * @property string|null $start_time
 * @property string|null $end_date
 * @property string|null $end_time
 * @property float|null $start_amount
 * @property float|null $sale_amount
 * @property float|null $deposit_withdrawal
 * @property float|null $final_amount
 * @property int|null $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Document[] $documents
 *
 * @package App\Models
 */
class Closure extends Model
{
	protected $table = 'closures';

	protected $casts = [
		'start_amount' => 'float',
		'sale_amount' => 'float',
		'deposit_withdrawal' => 'float',
		'final_amount' => 'float',
		'status' => 'int'
	];

	protected $fillable = [
		'start_date',
		'start_time',
		'end_date',
		'end_time',
		'start_amount',
		'sale_amount',
		'deposit_withdrawal',
		'final_amount',
		'status'
	];

	public function documents()
	{
		return $this->hasMany(Document::class);
	}
}
