<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        return response()->json(Inventory::all());
    }

    public function show($id)
    {
        $inventory = Inventory::find($id);
        if (!$inventory) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($inventory);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'nullable|date',
            'product_id' => 'required|integer|exists:products,id',
            'quantity' => 'required|numeric',
            'purchase_price' => 'required|numeric'
        ]);

        $inventory = Inventory::create($validated);
        return response()->json($inventory, 201);
    }

    public function update(Request $request, $id)
    {
        $inventory = Inventory::find($id);
        if (!$inventory) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $validated = $request->validate([
            'date' => 'nullable|date',
            'product_id' => 'sometimes|integer|exists:products,id',
            'quantity' => 'sometimes|numeric',
            'purchase_price' => 'sometimes|numeric'
        ]);

        $inventory->update($validated);
        return response()->json($inventory);
    }

    public function destroy($id)
    {
        
        $inventory = Inventory::find($id);
        if (!$inventory) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $inventory->delete();
        return response()->json(null, 204);
    }
}
