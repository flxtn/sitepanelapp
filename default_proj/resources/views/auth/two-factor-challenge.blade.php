@extends('layout.auth-layout')


@section('title', 'QRCode')

@section('header')
<div class="p-7 flex justify-center">
    <h1 class="text-2xl">TWO-FACTOR CHALLENGE</h1>
</div>


@section('content')
<div class="flex flex-col gap-3">
    {!! $svgQrCode !!}
    <form action='{{ route('two-factor-qr', ['id' => $user->id]) }}' method='POST' class="flex flex-col gap-3">
        @csrf
        <label>Enter Authenticator code:</label>
        <input type="text" name="code" class="p-1 border border-gray-500"></input>
        <input type="submit" name="submit" class="p-1 bg-slate-600 cursor-pointer hover:opacity-50 mt-2 border border-gray-200"></input>
    </form>
</div>





@endsection