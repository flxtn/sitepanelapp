<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SiteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.

     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'domain' => 'required|string',
            'description' => 'required|string',
            'queries' => 'required|numeric',
            'hosting' => 'required|string',
            'status' => 'required|in:Active,Not Active',
        ];
    }
}
