<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DepartmentController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/departments",
     *     summary="Get list of departments",
     *     tags={"Departments"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     )
     * )
     */
    public function index()
    {
        $departments = Department::all()->map(function ($department) {
            return [
                'dept_no' => $department->dept_no,
                'dept_name' => $department->dept_name,
            ];
        });

        return response()->json($departments);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'dept_name' => 'required|string|max:40|unique:departments',
        ]);

        $validated['dept_no'] = $this->generateUniqueDeptNo();

        $department = Department::create($validated);

        return response()->json($department, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($dept_no)
    {
        $department = Department::with([
            'employees.employee', // Load employees through DeptEmp
            'managers.employee'   // Load managers through DeptManager
        ])->findOrFail($dept_no);

        return response()->json([
            'dept_no' => $department->dept_no,
            'dept_name' => $department->dept_name,
            'employees' => $department->employees->map(function ($deptEmp) {
                return [
                    'emp_no' => $deptEmp->employee->emp_no,
                    'first_name' => $deptEmp->employee->first_name,
                    'last_name' => $deptEmp->employee->last_name,
                    'from_date' => $deptEmp->from_date,
                    'to_date' => $deptEmp->to_date,
                ];
            }),
            'managers' => $department->managers->map(function ($deptManager) {
                return [
                    'emp_no' => $deptManager->employee->emp_no,
                    'first_name' => $deptManager->employee->first_name,
                    'last_name' => $deptManager->employee->last_name,
                    'from_date' => $deptManager->from_date,
                    'to_date' => $deptManager->to_date,
                ];
            }),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $dept_no)
    {
        $department = Department::findOrFail($dept_no);

        $validated = $request->validate([
            'dept_name' => 'required|string|max:40|unique:departments,dept_name,' . $department->dept_no . ',dept_no',
        ]);

        $department->update($validated);

        return response()->json($department);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($dept_no)
    {
        $department = Department::findOrFail($dept_no);
        $department->delete();

        return response()->json(['message' => 'Department deleted']);
    }

    /**
     * Generate a unique 4-character department number.
     */
    private function generateUniqueDeptNo(): string
    {
        do {
            $deptNo = strtoupper(Str::random(4));
        } while (Department::where('dept_no', $deptNo)->exists());

        return $deptNo;
    }
}
