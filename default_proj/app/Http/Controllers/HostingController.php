<?php

namespace App\Http\Controllers;

use App\Services\HostingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class HostingController extends Controller
{
    public function __construct(protected HostingService $hostingService)
    {}

    public function index(): JsonResponse
    {
        $hostings = auth()->user()->hostings;
        return response()->json(['hostings' => $hostings]);
    }

    public function update(Request $request, string $id):JsonResponse
    {
        $data = $request->all();
        $this->hostingService->update($data, $id);

        return response()->json(['message' => 'updated successfuly'], 200);

    }

    public function create():JsonResponse
    {
        $this->hostingService->create();
        return response()->json(['message' => 'Created successfuly'], 200);
    }

    public function delete($id):JsonResponse
    {
        $this->hostingService->delete($id);
        return response()->json(['message' => 'Deleted successfuly'], 200); 
    }
}
