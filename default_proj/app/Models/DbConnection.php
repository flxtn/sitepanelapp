<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DbConnection extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip',
        'login',
        'password',
        'name',
        'port',
        'table_name',
        'site_id'
    ];

}
