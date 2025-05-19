<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $primaryKey = 'dept_no';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'dept_no',
        'dept_name'
    ];
}
