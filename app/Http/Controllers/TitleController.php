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
        $titles = Title::with('employee')->get()->map(function ($title) {
            return [
                'emp_no' => $title->emp_no,
                'title' => $title->title,
                'from_date' => $title->from_date,
                'to_date' => $title->to_date,
                'employee' => [
                    'first_name' => $title->employee->first_name ?? null,
                    'last_name' => $title->employee->last_name ?? null,
                ],
            ];
        });

        return response()->json($titles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'emp_no' => 'required|exists:employees,emp_no',
            'title' => 'required|string|max:50',
            'from_date' => 'required|date',
            'to_date' => 'nullable|date|after:from_date'
        ]);

        $title = Title::create($validated);

        return response()->json($title, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($emp_no)
    {
        $titles = Title::where('emp_no', $emp_no)->with('employee')->get()->map(function ($title) {
            return [
                'emp_no' => $title->emp_no,
                'title' => $title->title,
                'from_date' => $title->from_date,
                'to_date' => $title->to_date,
                'employee' => [
                    'first_name' => $title->employee->first_name ?? null,
                    'last_name' => $title->employee->last_name ?? null,
                ],
            ];
        });

        return response()->json($titles);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $emp_no)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:50',
            'from_date' => 'required|date',
            'to_date' => 'nullable|date|after:from_date'
        ]);

        $title = Title::where('emp_no', $emp_no)
            ->where('title', $validated['title'])
            ->where('from_date', $validated['from_date'])
            ->firstOrFail();

        $title->update([
            'to_date' => $validated['to_date']
        ]);

        return response()->json($title);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($emp_no, Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'from_date' => 'required|date'
        ]);

        $title = Title::where('emp_no', $emp_no)
            ->where('title', $request->title)
            ->where('from_date', $request->from_date)
            ->firstOrFail();

        $title->delete();

        return response()->json(['message' => 'Title deleted']);
    }
}
