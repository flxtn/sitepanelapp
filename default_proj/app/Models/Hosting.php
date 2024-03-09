<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hosting extends Model
{
    use HasFactory;

    protected $fillable = [
        'tariff',
        'login',
        'password',
        'name',
        'linked_sites',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
