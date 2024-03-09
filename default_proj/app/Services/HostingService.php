<?php

namespace App\Services;

use App\Models\Hosting;

class HostingService
{
    public function update(array $data, string $id)
    {
        $hosting = Hosting::findOrFail($id);
        foreach ($data as $key => $value) {
            $hosting->$key = $value;
            $hosting->save();
        }
    }

    public function create()
    {
        $hosting = new Hosting();
        $hosting->user_id = auth()->user()->id;
        $hosting->save();
    }

    public function delete(string $id)
    {
        $hosting = Hosting::findOrFail($id);
        if ($hosting->user_id === auth()->user()->id){
            $hosting->delete();
        }
    }

}