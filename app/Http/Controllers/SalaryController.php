<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/salaries",
     *     summary="Get list of salaries",
     *     tags={"Salaries"},
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     )
     * )
     */
    public function index()
    {
        $salaries = Salary::with('employee')->get()->map(function ($salary) {
            return [
                'emp_no' => $salary->emp_no,
                'salary' => $salary->salary,
                'from_date' => $salary->from_date,
                'to_date' => $salary->to_date,
                'employee' => [
                    'first_name' => $salary->employee->first_name ?? null,
                    'last_name' => $salary->employee->last_name ?? null,
                ],
            ];
        });

        return response()->json($salaries);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'emp_no' => 'required|exists:employees,emp_no',
            'salary' => 'required|integer',
            'from_date' => 'required|date',
            'to_date' => 'required|date|after:from_date',
        ]);

        $salary = Salary::create($validated);

        return response()->json($salary, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($emp_no, $from_date)
    {
        $salary = Salary::where('emp_no', $emp_no)
            ->where('from_date', $from_date)
            ->with('employee')
            ->firstOrFail();

        return response()->json([
            'emp_no' => $salary->emp_no,
            'salary' => $salary->salary,
            'from_date' => $salary->from_date,
            'to_date' => $salary->to_date,
            'employee' => [
                'first_name' => $salary->employee->first_name ?? null,
                'last_name' => $salary->employee->last_name ?? null,
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $emp_no, $from_date)
    {
        $salary = Salary::where('emp_no', $emp_no)
            ->where('from_date', $from_date)
            ->firstOrFail();

        $validated = $request->validate([
            'salary' => 'required|integer',
            'to_date' => 'required|date|after:from_date',
        ]);

        $salary->update($validated);

        return response()->json($salary);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Salary $salary)
    {
        $salary->delete();

        return response()->json(['message' => 'Salary record deleted']);
    }

}
