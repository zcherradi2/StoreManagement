<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SystemUser
 * 
 * @property int $id
 * @property string|null $code
 * @property string|null $password
 * @property string|null $type
 * @property string|null $photo
 * @property string|null $settings
 * @property int|null $store_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Store|null $store
 *
 * @package App\Models
 */
class SystemUser extends Model
{
	protected $table = 'system_users';

	protected $casts = [
		'store_id' => 'int'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'code',
		'password',
		'type',
		'photo',
		'settings',
		'store_id'
	];

	public function store()
	{
		return $this->belongsTo(Store::class);
	}
}
