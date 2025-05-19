@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>{{ isset($employee) ? 'Edit' : 'Create' }} Employee</h1>

        <form method="POST" action="{{ isset($employee) ? route('employees.update', $employee) : route('employees.store') }}">
            @csrf
            @if(isset($employee)) @method('PUT') @endif

            <!-- Emp No (only in create form) -->
            @if(!isset($employee))
                <div class="form-group">
                    <label>Employee Number</label>
                    <input type="number" name="emp_no" class="form-control" required>
                </div>
            @endif

            <div class="form-group">
                <label>First Name</label>
                <input type="text" name="first_name" class="form-control" value="{{ old('first_name', $employee->first_name ?? '') }}" required>
            </div>

            <div class="form-group">
                <label>Last Name</label>
                <input type="text" name="last_name" class="form-control" value="{{ old('last_name', $employee->last_name ?? '') }}" required>
            </div>

            <div class="form-group">
                <label>Gender</label>
                <select name="gender" class="form-control" required>
                    <option value="M" {{ (old('gender', $employee->gender ?? '') == 'M') ? 'selected' : '' }}>Male</option>
                    <option value="F" {{ (old('gender', $employee->gender ?? '') == 'F') ? 'selected' : '' }}>Female</option>
                </select>
            </div>

            <div class="form-group">
                <label>Birth Date</label>
                <input type="date" name="birth_date" class="form-control" value="{{ old('birth_date', $employee->birth_date ?? '') }}" required>
            </div>

            <div class="form-group">
                <label>Hire Date</label>
                <input type="date" name="hire_date" class="form-control" value="{{ old('hire_date', $employee->hire_date ?? '') }}" required>
            </div>

            <button type="submit" class="btn btn-primary">Save</button>
        </form>
    </div>
@endsection
