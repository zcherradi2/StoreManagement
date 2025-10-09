<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TicketLine
 * 
 * @property int $id
 * @property int $ticket_id
 * @property int $product_id
 * @property float $price
 * @property float $quantity
 * @property string $label
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class TicketLine extends Model
{
	protected $table = 'ticket_lines';

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
		'label'
	];
}
