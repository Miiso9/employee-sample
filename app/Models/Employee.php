<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Employee extends Model
{
    use HasFactory;

    protected $primaryKey = 'emp_no';
    public $incrementing = false;
    protected $keyType = 'int';

    protected $fillable = [
        'emp_no',
        'birth_date',
        'first_name',
        'last_name',
        'gender',
        'hire_date'
    ];

    public function currentTitle(): HasOne
    {
        return $this->hasOne(Title::class, 'emp_no')
            ->where('to_date', '9999-01-01')
            ->latest('from_date');
    }

    public function currentSalary(): HasOne
    {
        return $this->hasOne(Salary::class, 'emp_no')
            ->where('to_date', '9999-01-01')
            ->latest('from_date');
    }

    public function currentDepartment(): HasOne
    {
        return $this->hasOne(DeptEmp::class, 'emp_no')
            ->where('to_date', '9999-01-01')
            ->with('department')
            ->latest('from_date');
    }
}
