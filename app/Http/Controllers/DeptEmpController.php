<?php

namespace App\Http\Controllers;

use App\Models\DeptEmp;
use Illuminate\Http\Request;

class DeptEmpController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DeptEmp::with(['employee', 'department'])->get();
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
            'dept_no' => 'required|exists:departments,dept_no',
            'from_date' => 'required|date',
            'to_date' => 'required|date|after:from_date'
        ]);

        return DeptEmp::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(DeptEmp $deptEmp)
    {
        return $deptEmp->load(['employee', 'department']);
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
    public function update(Request $request, DeptEmp $deptEmp)
    {
        $request->validate([
            'from_date' => 'required|date',
            'to_date' => 'required|date|after:from_date'
        ]);

        $deptEmp->update($request->all());
        return $deptEmp;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeptEmp $deptEmp)
    {
        $deptEmp->delete();
        return response()->noContent();
    }
}
