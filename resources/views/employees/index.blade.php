@extends('layouts.app')

@section('content')
    <div class="container">
        <h1>Employees</h1>
        <a href="{{ route('employees.create') }}" class="btn btn-primary mb-3">New Employee</a>

        <table class="table">
            <thead>
            <tr>
                <th>Employee #</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Hire Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            @foreach($employees as $employee)
                <tr>
                    <td>{{ $employee->emp_no }}</td>
                    <td>{{ $employee->first_name }} {{ $employee->last_name }}</td>
                    <td>{{ $employee->gender }}</td>
                    <td>{{ $employee->hire_date->format('Y-m-d') }}</td>
                    <td>
                        <a href="{{ route('employees.show', $employee) }}" class="btn btn-info">View</a>
                        <a href="{{ route('employees.edit', $employee) }}" class="btn btn-warning">Edit</a>
                        <form action="{{ route('employees.destroy', $employee) }}" method="POST" style="display:inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-danger">Delete</button>
                        </form>
                    </td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
@endsection
