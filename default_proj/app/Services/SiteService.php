<?php

namespace App\Services;

use App\Models\Hosting;
use App\Models\Site;

class SiteService
{

    public function getData()
    {
        $data = auth()->user()->sites;
        return $data;
    }


    public function createSite(array $data)
    {
        $site = new Site();
        $site->domain = $data['domain'];
        $site->description = $data['description'];
        $site->queries = $data['queries'];
        $site->hosting = $data['hosting'];
        $site->status = $data['status'];
        $site->user_id = auth()->user()->id;
        $site->save();

    }

    public function searchSite(array $data):array
    {
       return Site::where('user_id', auth()->user()->id)
       ->where($data['column_name'], 'LIKE', '%' . $data['searchText'] . '%')->get();
    }

    public function sortSites(array $data):array 
    {
        $column_name = $data['column_name'];
        if ($column_name === "Status")
        {
            return Site::where('user_id', auth()->user()->id)
        ->orderByRaw("CASE WHEN $column_name = 'Active' THEN 1 WHEN $column_name = 'Not Active' THEN 2 ELSE 3 END")->get();
        }
        return Site::where('user_id', auth()->user()->id)->orderBy($column_name, 'desc')->get();
    }
}