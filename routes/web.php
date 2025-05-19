<?php

use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DeptEmpController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TitleController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::resource('employees', EmployeeController::class);
Route::apiResource('departments', DepartmentController::class);
Route::apiResource('dept-emps', DeptEmpController::class);
Route::apiResource('titles', TitleController::class);
