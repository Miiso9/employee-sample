<?php

namespace App\Http\Controllers;

use App\Models\Salary;
use Illuminate\Http\Request;

class SalaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Salary::with('employee')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'emp_no' => 'required|exists:employees,emp_no',
            'salary' => 'required|integer',
            'from_date' => 'required|date',
            'to_date' => 'required|date|after:from_date'
        ]);

        return Salary::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show($emp_no, $from_date)
    {
        return Salary::where('emp_no', $emp_no)
            ->where('from_date', $from_date)
            ->firstOrFail()
            ->load('employee');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $emp_no, $from_date)
    {
        $salary = Salary::where('emp_no', $emp_no)
            ->where('from_date', $from_date)
            ->firstOrFail();

        $request->validate([
            'salary' => 'required|integer',
            'to_date' => 'required|date|after:from_date'
        ]);

        $salary->update($request->all());
        return $salary;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($emp_no, $from_date)
    {
        $salary = Salary::where('emp_no', $emp_no)
            ->where('from_date', $from_date)
            ->firstOrFail();
        $salary->delete();
        return response()->noContent();
    }
}
