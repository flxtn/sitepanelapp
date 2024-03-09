<?php

namespace App\Services;

use App\Models\Domain;


class DomainService
{
    public function update(array $data, string $id)
    {
        $domain = Domain::findOrFail($id);
        foreach ($data as $key => $value) {
            $domain->$key = $value;
            $domain->save();
        }
    }

    public function create()
    {
        $domain = new Domain();
        $domain->user_id = auth()->user()->id;
        $domain->save();
    }

    public function delete(string $id)
    {
        $domain = Domain::findOrFail($id);
        if ($domain->user_id === auth()->user()->id){
            $domain->delete();
        }
    }

}