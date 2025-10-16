<?php

namespace App\Http\Controllers;


use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {


        // Log or inspect the additional parameters for debugging
        $queryParams = $request->query();
        if (!empty($queryParams['type'])) {
            $type = $queryParams['type'];
        } else {
            $type = '';
        }
        // Example: Use additional parameters to filter the query
        $query = Document::with(['third_party', 'store', 'user']);

        if ($type!="") {
            $query->where('type', $type);
        }

        // if (!empty($additionalParameters['type'])) {
        //     $query->where('type', $additionalParameters['type']);
        // }

        // Paginate the results
        $documents = $query->paginate(10);

        // Return the response as JSON
        return response()->json($documents);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'nullable|string',
            'number' => 'nullable|string',
            'date' => 'nullable|date',
            'time' => 'nullable|string',
            'third_party_id' => 'nullable|integer',
            'origin_store_id' => 'nullable|integer',
            'destination_store_id' => 'nullable|integer',
            'user_id' => 'nullable|integer',
            'total_ht' => 'nullable|numeric',
            'total_vat' => 'nullable|numeric',
            'total_ttc' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'net_total' => 'nullable|numeric',
            'paid' => 'nullable|numeric',
            'balance' => 'nullable|numeric',
            'status' => 'required|integer',
            'closure_id' => 'nullable|integer',
            'description' => 'nullable|string',
            'invoice_id' => 'required|integer',
        ]);

        $document = Document::create($validated);

        return response()->json($document, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $document = Document::with(['third_party', 'store', 'user', 'document_lines', 'payments'])
            ->findOrFail($id);

        return response()->json($document);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $document = Document::findOrFail($id);

        $validated = $request->validate([
            'type' => 'nullable|string',
            'number' => 'nullable|string',
            'date' => 'nullable|date',
            'time' => 'nullable|string',
            'third_party_id' => 'nullable|integer',
            'origin_store_id' => 'nullable|integer',
            'destination_store_id' => 'nullable|integer',
            'user_id' => 'nullable|integer',
            'total_ht' => 'nullable|numeric',
            'total_vat' => 'nullable|numeric',
            'total_ttc' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'net_total' => 'nullable|numeric',
            'paid' => 'nullable|numeric',
            'balance' => 'nullable|numeric',
            'status' => 'nullable|integer',
            'closure_id' => 'nullable|integer',
            'description' => 'nullable|string',
            'invoice_id' => 'nullable|integer',
        ]);

        $document->update($validated);

        return response()->json($document);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $document = Document::findOrFail($id);
        $document->delete();

        return response()->json(null, 204);
    }
}
