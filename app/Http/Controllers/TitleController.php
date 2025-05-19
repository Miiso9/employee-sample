<?php

namespace App\Http\Controllers;

use App\Models\Title;
use Illuminate\Http\Request;

class TitleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Title::with('employee')->get();
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
            'title' => 'required|string|max:50',
            'from_date' => 'required|date',
            'to_date' => 'nullable|date|after:from_date'
        ]);

        return Title::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Title $title)
    {
        return $title->load('employee');
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
    public function update(Request $request, Title $title)
    {
        $request->validate([
            'to_date' => 'nullable|date|after:from_date'
        ]);

        $title->update($request->all());
        return $title;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Title $title)
    {
        $title->delete();
        return response()->noContent();
    }
}
