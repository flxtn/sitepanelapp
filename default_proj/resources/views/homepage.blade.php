@extends('layout.layout')

@section("title", "Homepage")

@section('header')
<div class="p-7 flex">
    <div class="mx-auto">
        <h1 class="text-2xl">HOMEPAGE</h1>
    </div>
    <div class="flex items-center">
        @auth('web')
            <a href="{{route('logout')}}">ВЫЙТИ</a>
        @endauth
    </div>
</div>

@section('content')

<div class="flex flex-col gap-3 w-2/12 pl-10 ml-5">
    <form action={{route('create-site')}} method="POST" class="flex flex-col gap-1">
        @csrf
        <label class="text-sm">Domain</label>
        <input type="text" name="domain" placeholder="domain" class="p-1 border border-gray-500"></input>
        <label class="text-sm">Description</label>
        <input type="text" name="description" placeholder="description" class="p-1 border border-gray-500"></input>
        <label class="text-sm">Queries</label>
        <input type="number" name="queries" class="border border-gray-500"></input>
        <label class="text-sm">Hosting</label>
        <input type="text" name="hosting" placeholder="hosting" class="p-1 border border-gray-500"></input>
        <label class="text-sm">Status</label>
        <select id="select_id" name="status" class="p-1 border border-gray-500">
            <option value="Active">Active</option>
            <option value="Not Active">Not Active</option>
        </select>
        <input type="submit" value="Create" class="p-1 cursor-pointer hover:opacity-50 mt-2" ></input>
    </form>

    <form action={{route('search')}} method="GET" class="flex flex-col gap-1">
        @csrf
        <label class="text-sm">Search by</label>
        <input type="text" name="searchText" class="p-1 border border-gray-500"></input>
        <select id="select_id" name="column_name" class="p-1 border border-gray-500">>
            <option value="Domain">Domain</option>
            <option value="Description">Description</option>
            <option value="Hosting">Hosting</option>
        </select>
        <input type="submit" value="Search" class="p-1 cursor-pointer hover:opacity-50 mt-2"></input>
    </form>

    <form action={{route('sort')}} method="GET" class="flex flex-col gap-1">
        @csrf
        <label class="text-sm">Sort by</label>
        <select id="select_id" name="column_name" class="p-1 border border-gray-500">>
            <option value="Queries">Queries</option>
            <option value="Status">Status</option>
        </select>
        <input type="submit" value="Sort" class="p-1 cursor-pointer hover:opacity-50 mt-2"></input>
    </form>
</div>

<div class="w-9/12">
    <table class="table-auto border-collapse border border-gray-800 mx-auto">
        <thead>
            <tr>
                <th class="px-4 py-2 bg-gray-800 text-white">Domain</th>
                <th class="px-4 py-2 bg-gray-800 text-white">Description</th>
                <th class="px-4 py-2 bg-gray-800 text-white">Queries</th>
                <th class="px-4 py-2 bg-gray-800 text-white">Hosting</th>
                <th class="px-4 py-2 bg-gray-800 text-white">Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $item)
            <tr>
                <td class="border px-4 py-2">{{ $item->domain }}</td>
                <td class="border px-4 py-2">{{ $item->description }}</td>
                <td class="border px-4 py-2">{{ $item->queries}}</td>
                <td class="border px-4 py-2">{{ $item->hosting }}</td>
                <td class="border px-4 py-2">{{ $item->status }}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
</div>


@endsection