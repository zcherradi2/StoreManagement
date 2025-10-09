<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PendingLine
 * 
 * @property int $id
 * @property int $ticket_id
 * @property int $product_id
 * @property float $price
 * @property float $quantity
 * @property string $label
 * @property string|null $movement_type
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class PendingLine extends Model
{
	protected $table = 'pending_lines';

	protected $casts = [
		'ticket_id' => 'int',
		'product_id' => 'int',
		'price' => 'float',
		'quantity' => 'float'
	];

	protected $fillable = [
		'ticket_id',
		'product_id',
		'price',
		'quantity',
		'label',
		'movement_type'
	];
}
