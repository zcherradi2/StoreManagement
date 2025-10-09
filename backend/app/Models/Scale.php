<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Scale
 * 
 * @property int $id
 * @property string|null $code
 * @property string|null $description
 * @property int|null $port
 * @property int|null $speed
 * @property int|null $data_bits
 * @property int|null $parity
 * @property int|null $stop_bits
 * @property string|null $model
 * @property string $mode
 * @property string|null $procedure
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Scale extends Model
{
	protected $table = 'scales';

	protected $casts = [
		'port' => 'int',
		'speed' => 'int',
		'data_bits' => 'int',
		'parity' => 'int',
		'stop_bits' => 'int'
	];

	protected $fillable = [
		'code',
		'description',
		'port',
		'speed',
		'data_bits',
		'parity',
		'stop_bits',
		'model',
		'mode',
		'procedure'
	];
}
