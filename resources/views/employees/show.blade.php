@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Employee Details</h1>

        <div class="card">
            <div class="card-body">
                <h5 class="card-title">{{ $employee->first_name }} {{ $employee->last_name }}</h5>
                <p class="card-text">
                    <strong>Employee #:</strong> {{ $employee->emp_no }}<br>
                    <strong>Gender:</strong> {{ $employee->gender }}<br>
                    <strong>Birth Date:</strong> {{ $employee->birth_date->format('Y-m-d') }}<br>
                    <strong>Hire Date:</strong> {{ $employee->hire_date->format('Y-m-d') }}
                </p>
                <a href="{{ route('employees.edit', $employee) }}" class="btn btn-warning">Edit</a>
                <a href="{{ route('employees.index') }}" class="btn btn-secondary">Back</a>
            </div>
        </div>
    </div>
@endsection
