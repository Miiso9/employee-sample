<?php

namespace App\Http\Controllers;

use App\Models\DeptManager;
use Illuminate\Http\Request;

class DeptManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DeptManager::with(['employee', 'department'])->get();
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

        return DeptManager::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show($emp_no, $dept_no)
    {
        return DeptManager::where('emp_no', $emp_no)
            ->where('dept_no', $dept_no)
            ->firstOrFail()
            ->load(['employee', 'department']);
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
    public function update(Request $request, $emp_no, $dept_no)
    {
        $deptManager = DeptManager::where('emp_no', $emp_no)
            ->where('dept_no', $dept_no)
            ->firstOrFail();

        $request->validate([
            'from_date' => 'required|date',
            'to_date' => 'required|date|after:from_date'
        ]);

        $deptManager->update($request->all());
        return $deptManager;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($emp_no, $dept_no)
    {
        $deptManager = DeptManager::where('emp_no', $emp_no)
            ->where('dept_no', $dept_no)
            ->firstOrFail();
        $deptManager->delete();
        return response()->noContent();
    }
}
