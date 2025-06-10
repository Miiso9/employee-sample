<?php

use App\Http\Controllers\Auth\Socialite\ProviderCallbackController;
use App\Http\Controllers\Auth\Socialite\ProviderRedirectController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\DeptEmpController;
use App\Http\Controllers\DeptManagerController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\SalaryController;
use App\Http\Controllers\TitleController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/auth/{provider}/redirect', ProviderRedirectController::class)->name('auth.redirect');
Route::get('/auth/{provider}/callback', ProviderCallbackController::class)->name('auth.callback');

Route::resource('employees', EmployeeController::class);
Route::apiResource('departments', DepartmentController::class);
Route::apiResource('dept-emps', DeptEmpController::class);
Route::apiResource('titles', TitleController::class);
Route::apiResource('salaries', SalaryController::class);
Route::apiResource('dept-managers', DeptManagerController::class, );
