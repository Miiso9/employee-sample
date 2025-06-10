<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
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
        $department = Department::findOrFail($dept_no);

        return response()->json([
            'dept_no' => $department->dept_no,
            'dept_name' => $department->dept_name,
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
