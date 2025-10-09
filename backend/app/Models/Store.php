<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Store
 * 
 * @property int $id
 * @property string $name
 * @property string $address
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|BookStock[] $book_stocks
 * @property Collection|DocumentLine[] $document_lines
 * @property Collection|Document[] $documents
 * @property Collection|Setting[] $settings
 * @property Collection|Stock[] $stocks
 * @property Collection|SystemUser[] $system_users
 *
 * @package App\Models
 */
class Store extends Model
{
	protected $table = 'stores';

	protected $fillable = [
		'name',
		'address'
	];

	public function book_stocks()
	{
		return $this->hasMany(BookStock::class);
	}

	public function document_lines()
	{
		return $this->hasMany(DocumentLine::class);
	}

	public function documents()
	{
		return $this->hasMany(Document::class, 'origin_store_id');
	}

	public function settings()
	{
		return $this->hasMany(Setting::class);
	}

	public function stocks()
	{
		return $this->hasMany(Stock::class);
	}

	public function system_users()
	{
		return $this->hasMany(SystemUser::class);
	}
}
