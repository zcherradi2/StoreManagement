<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Document
 * 
 * @property int $id
 * @property string|null $type
 * @property string|null $number
 * @property string|null $date
 * @property string|null $time
 * @property int|null $third_party_id
 * @property int|null $origin_store_id
 * @property int|null $destination_store_id
 * @property int|null $user_id
 * @property float|null $total_ht
 * @property float|null $total_vat
 * @property float|null $total_ttc
 * @property float|null $discount
 * @property float|null $net_total
 * @property float|null $paid
 * @property float|null $balance
 * @property int $status
 * @property int|null $closure_id
 * @property string|null $description
 * @property int $invoice_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Closure|null $closure
 * @property Store|null $store
 * @property ThirdParty|null $third_party
 * @property User|null $user
 * @property Collection|DocumentLine[] $document_lines
 * @property Collection|Payment[] $payments
 *
 * @package App\Models
 */
class Document extends Model
{
	protected $table = 'documents';

	protected $casts = [
		'third_party_id' => 'int',
		'origin_store_id' => 'int',
		'destination_store_id' => 'int',
		'user_id' => 'int',
		'total_ht' => 'float',
		'total_vat' => 'float',
		'total_ttc' => 'float',
		'discount' => 'float',
		'net_total' => 'float',
		'paid' => 'float',
		'balance' => 'float',
		'status' => 'int',
		'closure_id' => 'int',
		'invoice_id' => 'int'
	];

	protected $fillable = [
		'type',
		'number',
		'date',
		'time',
		'third_party_id',
		'origin_store_id',
		'destination_store_id',
		'user_id',
		'total_ht',
		'total_vat',
		'total_ttc',
		'discount',
		'net_total',
		'paid',
		'balance',
		'status',
		'closure_id',
		'description',
		'invoice_id'
	];

	public function closure()
	{
		return $this->belongsTo(Closure::class);
	}

	public function store()
	{
		return $this->belongsTo(Store::class, 'origin_store_id');
	}

	public function third_party()
	{
		return $this->belongsTo(ThirdParty::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function document_lines()
	{
		return $this->hasMany(DocumentLine::class);
	}

	public function payments()
	{
		return $this->hasMany(Payment::class);
	}
}
