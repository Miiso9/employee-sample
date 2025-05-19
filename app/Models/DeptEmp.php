<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeptEmp extends Model
{
    use HasFactory;

    protected $table = 'dept_emp';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'emp_no',
        'dept_no',
        'from_date',
        'to_date'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class, 'emp_no');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'dept_no');
    }
}
