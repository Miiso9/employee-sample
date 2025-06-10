<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class   Salary extends Model
{
    use HasFactory;

    protected $primaryKey = ['emp_no', 'from_date'];
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'emp_no',
        'salary',
        'from_date',
        'to_date'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_no');
    }
}
