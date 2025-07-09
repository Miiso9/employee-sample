<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $table = 'departments';
    protected $primaryKey = 'dept_no';
    public $incrementing = false;
    public $timestamps = false;

    protected $fillable = [
        'dept_no',
        'dept_name',
    ];

    // Relationship to get employees in this department
    public function employees()
    {
        return $this->hasMany(DeptEmp::class, 'dept_no');
    }

    // Relationship to get managers of this department
    public function managers()
    {
        return $this->hasMany(DeptManager::class, 'dept_no');
    }
}
