<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Book
 * 
 * @property int $id
 * @property string|null $isbn
 * @property string|null $isbn13
 * @property string|null $title
 * @property string|null $publisher
 * @property string|null $language
 * @property string|null $publication_date
 * @property string|null $format
 * @property string|null $pages
 * @property float|null $purchase_price
 * @property float|null $sale_price
 * @property string|null $comments
 * @property float|null $net_purchase_price
 * @property float|null $discount
 * @property int|null $category_id
 * @property int|null $third_party_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property BookCategory|null $book_category
 * @property ThirdParty|null $third_party
 * @property Collection|Author[] $authors
 * @property Collection|BookCategory[] $book_categories
 * @property Collection|BookStock[] $book_stocks
 * @property Collection|OrderLine[] $order_lines
 *
 * @package App\Models
 */
class Book extends Model
{
	protected $table = 'books';

	protected $casts = [
		'purchase_price' => 'float',
		'sale_price' => 'float',
		'net_purchase_price' => 'float',
		'discount' => 'float',
		'category_id' => 'int',
		'third_party_id' => 'int'
	];

	protected $fillable = [
		'isbn',
		'isbn13',
		'title',
		'publisher',
		'language',
		'publication_date',
		'format',
		'pages',
		'purchase_price',
		'sale_price',
		'comments',
		'net_purchase_price',
		'discount',
		'category_id',
		'third_party_id'
	];

	public function book_category()
	{
		return $this->belongsTo(BookCategory::class, 'category_id');
	}

	public function third_party()
	{
		return $this->belongsTo(ThirdParty::class);
	}

	public function authors()
	{
		return $this->hasMany(Author::class);
	}

	public function book_categories()
	{
		return $this->hasMany(BookCategory::class);
	}

	public function book_stocks()
	{
		return $this->hasMany(BookStock::class);
	}

	public function order_lines()
	{
		return $this->hasMany(OrderLine::class);
	}
}
