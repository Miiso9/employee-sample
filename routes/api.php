<?php

use App\Http\Controllers\Auth\AuthenticationController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\TitleController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('register', [AuthenticationController::class, 'register']);
Route::post('login', [AuthenticationController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [AuthenticationController::class, 'userInfo']);
    Route::post('logout', [AuthenticationController::class, 'logOut']);
});

Route::middleware('auth:sanctum')->post('/refresh-token', [AuthenticationController::class, 'refreshToken']);
use App\Http\Controllers\EmployeeController;

Route::middleware('auth:sanctum')->get('/employees', [EmployeeController::class, 'index']);

Route::get('employees', [EmployeeController::class, 'index'])->middleware('auth:sanctum');
Route::post('employees', [EmployeeController::class, 'store'])->middleware('auth:sanctum');
Route::get('employees/{employee}', [EmployeeController::class, 'show'])->middleware('auth:sanctum');
Route::put('employees/{employee}', [EmployeeController::class, 'update'])->middleware('auth:sanctum');
Route::delete('employees/{employee}', [EmployeeController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('departments', [DepartmentController::class, 'index'])->middleware('auth:sanctum');
Route::post('departments', [DepartmentController::class, 'store'])->middleware('auth:sanctum');
Route::get('departments/{dept_no}', [DepartmentController::class, 'show'])->middleware('auth:sanctum');
Route::put('departments/{dept_no}', [DepartmentController::class, 'update'])->middleware('auth:sanctum');
Route::delete('departments/{dept_no}', [DepartmentController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/salaries', [SalaryController::class, 'index']);
Route::post('/salaries', [SalaryController::class, 'store']);
Route::get('/salaries/{emp_no}/{from_date}', [SalaryController::class, 'show']);
Route::put('/salaries/{emp_no}/{from_date}', [SalaryController::class, 'update']);
Route::delete('/salaries/{emp_no}/{from_date}', [SalaryController::class, 'destroy']);


Route::get('/titles', [TitleController::class, 'index']);
Route::post('/titles', [TitleController::class, 'store']);
Route::get('/titles/{emp_no}', [TitleController::class, 'show']);
Route::put('/titles/{emp_no}', [TitleController::class, 'update']);
 Route::delete('/titles/{emp_no}', [TitleController::class, 'destroy']);


use App\Http\Controllers\DeptEmpController;
use App\Http\Controllers\DeptManagerController;

Route::apiResource('departments', DepartmentController::class);
Route::apiResource('dept_emp', DeptEmpController::class);
Route::apiResource('dept_manager', DeptManagerController::class);
