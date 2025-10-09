<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Setting
 * 
 * @property int $id
 * @property string|null $company_name
 * @property int|null $ticket_number
 * @property string|null $quantity_format
 * @property string|null $price_format
 * @property string|null $currency
 * @property string|null $currency_cents
 * @property string|null $code_input_type
 * @property string|null $code_mask
 * @property int $article_code
 * @property int|null $store_id
 * @property string|null $entry_mask
 * @property string|null $exit_mask
 * @property int|null $entry_number
 * @property string|null $delivery_note_mask
 * @property int|null $exit_number
 * @property int|null $number_copies
 * @property int|null $delivery_price
 * @property int|null $ticket_price
 * @property int|null $software_type
 * @property float|null $label_height
 * @property float|null $label_width
 * @property float|null $margin_top
 * @property float|null $margin_left
 * @property float|null $horizontal_spacing
 * @property float|null $vertical_spacing
 * @property int|null $label_count
 * @property int|null $label_size
 * @property int|null $label_visible
 * @property float|null $barcode_height
 * @property float|null $barcode_width
 * @property int|null $delivery_number
 * @property string|null $order_mask
 * @property int $order_number
 * @property string|null $ticket_printer
 * @property string|null $barcode_printer
 * @property string|null $report_printer
 * @property int $pos_photos
 * @property int $invoice_number
 * @property string|null $invoice_mask
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Store|null $store
 *
 * @package App\Models
 */
class Setting extends Model
{
	protected $table = 'settings';

	protected $casts = [
		'ticket_number' => 'int',
		'article_code' => 'int',
		'store_id' => 'int',
		'entry_number' => 'int',
		'exit_number' => 'int',
		'number_copies' => 'int',
		'delivery_price' => 'int',
		'ticket_price' => 'int',
		'software_type' => 'int',
		'label_height' => 'float',
		'label_width' => 'float',
		'margin_top' => 'float',
		'margin_left' => 'float',
		'horizontal_spacing' => 'float',
		'vertical_spacing' => 'float',
		'label_count' => 'int',
		'label_size' => 'int',
		'label_visible' => 'int',
		'barcode_height' => 'float',
		'barcode_width' => 'float',
		'delivery_number' => 'int',
		'order_number' => 'int',
		'pos_photos' => 'int',
		'invoice_number' => 'int'
	];

	protected $fillable = [
		'company_name',
		'ticket_number',
		'quantity_format',
		'price_format',
		'currency',
		'currency_cents',
		'code_input_type',
		'code_mask',
		'article_code',
		'store_id',
		'entry_mask',
		'exit_mask',
		'entry_number',
		'delivery_note_mask',
		'exit_number',
		'number_copies',
		'delivery_price',
		'ticket_price',
		'software_type',
		'label_height',
		'label_width',
		'margin_top',
		'margin_left',
		'horizontal_spacing',
		'vertical_spacing',
		'label_count',
		'label_size',
		'label_visible',
		'barcode_height',
		'barcode_width',
		'delivery_number',
		'order_mask',
		'order_number',
		'ticket_printer',
		'barcode_printer',
		'report_printer',
		'pos_photos',
		'invoice_number',
		'invoice_mask'
	];

	public function store()
	{
		return $this->belongsTo(Store::class);
	}
}
