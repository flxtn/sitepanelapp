<?php

namespace App\Http\Controllers;

use App\Services\ParsedInfoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParsedInfoController extends Controller
{
    public function __construct(protected ParsedInfoService $parsedInfoService)
    {}

    public function getRecord(string $id): JsonResponse
    {
        $records = $this->parsedInfoService->getCurrentRecords($id);
        return response()->json(['records' => $records]);
    }
}
