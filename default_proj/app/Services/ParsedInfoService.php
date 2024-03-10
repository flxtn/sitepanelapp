<?php

namespace App\Services;

use App\Models\ParsedInfo;
use App\Models\Site;

class ParsedInfoService
{
    public function getCurrentRecords(string $id)
    {
        $site = Site::findOrFail($id);
        if (auth()->user()->id === $site->user_id)
        {
            return $site->parsed_info;
        }
    }
}