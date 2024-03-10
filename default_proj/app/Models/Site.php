<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    use HasFactory;

    protected $fillable = [
        'domain',
        'description',
        'hosting',
        'user_id',
        'period'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function db()
    {
        return $this->hasOne(DbConnection::class);
    }

    public function parsed_info()
    {
        return $this->hasMany(ParsedInfo::class);
    }
}
