<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/employees",
     *     summary="Get list of employees",
     *     tags={"Employees"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     )
     * )
     */
    public function index()
    {
        $employees = Employee::all()->map(function ($employee) {
            return [
                'emp_no' => $employee->emp_no,
                'first_name' => $employee->first_name,
                'last_name' => $employee->last_name,
                'birth_date' => $employee->birth_date,
                'hire_date' => $employee->hire_date,
                'gender' => $employee->gender,
                'title' => $employee->currentTitle->title ?? null,
                'salary' => $employee->currentSalary->salary ?? null,
                'department' => $employee->currentDepartment->department->dept_name ?? null,
                'email' => null,
            ];
        });

        return response()->json($employees);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('employees.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'birth_date' => 'required|date',
            'first_name' => 'required|max:14',
            'last_name' => 'required|max:16',
            'gender' => 'required|in:M,F',
            'hire_date' => 'required|date',
        ]);

        $lastEmpNo = Employee::max('emp_no') ?? 0;
        $validated['emp_no'] = $lastEmpNo + 1;

        $employee = Employee::create($validated);
        return response()->json($employee, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($emp_no)
    {
        $employee = Employee::with([
            'currentTitle',
            'currentSalary',
            'currentDepartment.department'
        ])->findOrFail($emp_no);

        return response()->json([
            'emp_no' => $employee->emp_no,
            'first_name' => $employee->first_name,
            'last_name' => $employee->last_name,
            'birth_date' => $employee->birth_date,
            'hire_date' => $employee->hire_date,
            'gender' => $employee->gender,
            'title' => $employee->currentTitle->title ?? null,
            'salary' => $employee->currentSalary->salary ?? null,
            'department' => $employee->currentDepartment->department->dept_name ?? null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Employee $employee)
    {
        return view('employees.edit', compact('employee'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'birth_date' => 'required|date',
            'first_name' => 'required|max:14',
            'last_name' => 'required|max:16',
            'gender' => 'required|in:M,F',
            'hire_date' => 'required|date',
        ]);

        $employee->update($validated);
        return response()->json($employee);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();
        return response()->json(['message' => 'Employees deleted']);
    }
}
