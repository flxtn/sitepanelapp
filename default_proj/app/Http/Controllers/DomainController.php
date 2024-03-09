<?php

namespace App\Http\Controllers;

use App\Services\DomainService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class DomainController extends Controller
{

    public function __construct(protected DomainService $domainService)
    {}

    public function index(): JsonResponse
    {
        $domains = auth()->user()->domains;
        return response()->json(['domains' => $domains]);
    }

    public function update(Request $request, string $id):JsonResponse
    {
        $data = $request->all();
        $this->domainService->update($data, $id);

        return response()->json(['message' => 'updated successfuly'], 200);

    }

    public function create():JsonResponse
    {
        $this->domainService->create();
        return response()->json(['message' => 'Created successfuly'], 200);
    }

    public function delete($id):JsonResponse
    {
        $this->domainService->delete($id);
        return response()->json(['message' => 'Deleted successfuly'], 200); 
    }
}

