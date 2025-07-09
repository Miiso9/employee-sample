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
            ->where('to_date', '>=', now())
            ->latest('from_date');
    }

    public function currentSalary(): HasOne
    {
        return $this->hasOne(Salary::class, 'emp_no')
            ->whereDate('to_date', '>=', now()) // Active salaries
            ->latest('from_date'); // Get most recent
    }

    public function currentDepartment(): HasOne
    {
        return $this->hasOne(DeptEmp::class, 'emp_no')
            ->where('to_date', '>=', now())
            ->with('department')
            ->latest('from_date');
    }
}
