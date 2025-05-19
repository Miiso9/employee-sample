<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Department::all();
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
            'dept_no' => 'required|string|size:4|unique:departments',
            'dept_name' => 'required|string|max:40|unique:departments'
        ]);

        return Department::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        return $department;
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
    public function update(Request $request, Department $department)
    {
        $request->validate([
            'dept_name' => 'required|string|max:40|unique:departments,dept_name,'.$department->dept_no.',dept_no'
        ]);

        $department->update($request->all());
        return $department;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $department->delete();
        return response()->noContent();
    }
}
