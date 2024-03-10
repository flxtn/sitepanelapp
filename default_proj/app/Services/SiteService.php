<?php

namespace App\Services;

use App\Models\DbConnection;
use App\Models\Domain;
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
        $site->hosting = $data['hosting'] . " (" . $data['account'] . ")";
        $site->period = $data['period'];
        $site->user_id = auth()->user()->id;
        $site->save();

        $domain = Domain::where('name', $data['domain'])->first();
        $domain->is_linked = true;
        $domain->save();

        $hosting = Hosting::where('name', $data['hosting'])->where('login', $data['account'])->first();
        $hosting->linked_sites += 1;
        $hosting->save();

        $dbconnection = new DbConnection();
        $dbconnection->name = $data['dbname'];
        $dbconnection->ip = $data['ip'];
        $dbconnection->port = $data['port'];
        $dbconnection->login = $data['login'];
        $dbconnection->password = $data['password'];
        $dbconnection->table_name = $data['table_name'];
        $dbconnection->site_id = $site->id;
        $dbconnection->save();

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