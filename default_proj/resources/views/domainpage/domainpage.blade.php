@extends('layout.layout')

@section("title", "Domainspage")

@section('header')
<div class="p-7 flex">
    <div class="mx-auto">
        <h1 class="text-2xl">DOMAINS</h1>
    </div>
    <div class="flex items-center">
        @auth('web')
            <a href="{{route('logout')}}">ВЫЙТИ</a>
        @endauth
    </div>
</div>

@section('content')
<div class="2/12">

</div>
<div class="w-9/12 flex mx-auto">
    <form action="{{route('update-domains')}}" method="POST">
        @csrf
        <table class="table-auto border-collapse border border-gray-800 mx-auto">
            <thead>
                <tr>
                    <th class="px-4 py-2 bg-gray-800 text-white">Registrator</th>
                    <th class="px-4 py-2 bg-gray-800 text-white">Login</th>
                    <th class="px-4 py-2 bg-gray-800 text-white">Password</th>
                    <th class="px-4 py-2 bg-gray-800 text-white">Domain</th>
                    <th class="px-4 py-2 bg-gray-800 text-white">Date</th>
                    <th class="px-4 py-2 bg-gray-800 text-white">Is linked</th>
                    <th class="px-4 py-2 bg-gray-800 text-white">Actions</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($data as $item)
                <tr>
                        <td class="border p-2"><input type="text" name="data[{{ $item->id }}][registrator]" value="{{ $item->registrator }}" class="w-[10%]"></td>
                        <td class="border p-2"><input type="text" name="data[{{ $item->id }}][login]" value="{{ $item->login }}"></td>
                        <td class="border p-2"><input type="text" name="data[{{ $item->id }}][password]" value="{{ $item->password }}"></td>
                        <td class="border p-2"><input type="text" name="data[{{ $item->id }}][name]" value="{{ $item->name }}"></td>
                        <td class="border p-2"><input type="text" name="data[{{ $item->id }}][date]" value="{{ $item->date }}"></td>
                        @if(!$item->is_linked)
                        <td class="border p-2">No</td>
                        <td class="border p-2"><button id="delete-request" item-id="{{$item->id}}" class="underline">Delete</button></td>
                        @else
                        <td class="border p-2">Yes</td>
                        <td class="border"></td>
                        @endif
                </tr>
                @endforeach
            </tbody>
        </table>
        <input type="submit" value="Save" class="py-1 px-3 cursor-pointer hover:opacity-50 mt-2">
    </form>
    <form action="{{route('create-domain')}}" method="POST">
        @csrf
        <input type="submit" value="Create" class="py-1 px-3 cursor-pointer hover:opacity-50 ml-4">
    </form>
</div>
@endsection


<script>
    document.getElementById("delete-request").addEventListener("click", function() {
        event.preventDefault();
        // Получаем значение item-id из атрибута data-item-id кнопки
        сonst itemId = this.getAttribute("item-id");
        const url = "{{ route('delete-domain') }}";
        // Создаем новый объект XMLHttpRequest
        const xhr = new XMLHttpRequest();
        
        // Устанавливаем URL и метод запроса
        xhr.open("POST", url, true);
        
        // Устанавливаем обработчик события изменения состояния запроса
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText); // Выводим ответ сервера в консоль
            }
        };
        
        const data = itemId;
        xhr.send(data);
    });
</script>