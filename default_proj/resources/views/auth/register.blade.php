@extends('layout.auth-layout')


@section('title', 'Register')

@section('header')
<div class="p-7 flex justify-center">
    <h1 class="text-2xl">REGISTRATION</h1>
</div>


@section('content')

<div class="flex justify-center items-center p-20 border border-slate-800 mt-10 flex-col">
    <form action="{{route("register")}}" method="POST" class="flex flex-col gap-3">

        @csrf

        <label class="text-sm">Enter name</label>
        <input class="p-1 border border-gray-500" type="name" name="name" placeholder="Enter name"></input>
        <label class="text-sm">Enter email</label>
        <input class="p-1 border border-gray-500" type="email" name ="email" placeholder="email"></input>
        <label class="text-sm">Enter password</label>
        <input class="p-1 border border-gray-500" type="password" name="password" placeholder="password"></input>
        <input class="p-1 border border-gray-500" type="password" name="password_confirmation" placeholder="confirm password"></input>
        <input class="p-1 cursor-pointer hover:opacity-50 mt-2" type="submit" name="submit"></input>
    </form>
    <a href="{{route('login')}}" class="text-sm text-slate-600 hover:opacity-50">Login page</a>
</div>

@endsection
