<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ThirdParty
 * 
 * @property int $id
 * @property string|null $type
 * @property string|null $account_number
 * @property string|null $name
 * @property string|null $contact
 * @property string|null $phone
 * @property string|null $mobile
 * @property string|null $address
 * @property string|null $city
 * @property float|null $balance
 * @property float $total_purchased
 * @property float $total_paid
 * @property int|null $price_code
 * @property string|null $tax_id_number
 * @property string|null $ice_number
 * @property float|null $credit_limit
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Book[] $books
 * @property Collection|Document[] $documents
 * @property Collection|Invoice[] $invoices
 * @property Collection|Order[] $orders
 * @property Collection|PendingTicket[] $pending_tickets
 * @property Collection|Settlement[] $settlements
 * @property Collection|Ticket[] $tickets
 *
 * @package App\Models
 */
class ThirdParty extends Model
{
	protected $table = 'third_parties';

	protected $casts = [
		'balance' => 'float',
		'total_purchased' => 'float',
		'total_paid' => 'float',
		'price_code' => 'int',
		'credit_limit' => 'float'
	];

	protected $fillable = [
		'type',
		'account_number',
		'name',
		'contact',
		'phone',
		'mobile',
		'address',
		'city',
		'balance',
		'total_purchased',
		'total_paid',
		'price_code',
		'tax_id_number',
		'ice_number',
		'credit_limit'
	];

	public function books()
	{
		return $this->hasMany(Book::class);
	}

	public function documents()
	{
		return $this->hasMany(Document::class);
	}

	public function invoices()
	{
		return $this->hasMany(Invoice::class);
	}

	public function orders()
	{
		return $this->hasMany(Order::class);
	}

	public function pending_tickets()
	{
		return $this->hasMany(PendingTicket::class, 'customer_id');
	}

	public function settlements()
	{
		return $this->hasMany(Settlement::class);
	}

	public function tickets()
	{
		return $this->hasMany(Ticket::class, 'customer_id');
	}
}
