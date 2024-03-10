<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParsedInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'password',
        'site_id'
    ];

    public function site()
    {
        return $this->belongsTo(Site::class);
    }
}
