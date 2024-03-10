<?php

namespace App\Http\Controllers;

use App\Http\Requests\CodeRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{


    public function __construct(protected AuthService $authService)
    {}

    public function register(RegisterRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = $this->authService->register($data);
        if($user)
        {
            $qrCode = $this->authService->generateQrCode($user);
            return response()->json(['svgQrCode' => $qrCode]);
        }
        return response()->json(['message' => 'Wrong email, name or password']);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();
        $user = $this->authService->login($data);
        if ($user)
        {
            return response()->json(['message' => 'Right Credentials'], 204);
        }
        return response()->json(['message' => 'Wrong email or password'], 401);
    }

    public function GetMe(Request $request)
    {
        if (Auth::check()) {
            return response()->json(['valid' => true], 200);
        }

        return response()->json(['valid' => false], 401);
    }

    public function logout(): JsonResponse
    {
        return response()->json(['message' => 'logout success']);
    }

    public function EnableTwoFa(CodeRequest $request): JsonResponse
    {
        $data = $request->validated();
        list('user' => $user, 'isValid' => $isValid) = $this->authService->checkCode($data); 
        if ($isValid) 
        {
            $user->two_fa_status = true;
            $user->save();
            return response()->json(['message' => 'registered successfuly', 200]);
        }else{
            return response()->json(['message' => 'wrong code', 401]);
        }
    }


    public function TwoFactorLogin(CodeRequest $request): JsonResponse | Response
    {
        $data = $request->validated();
        list('user' => $user, 'isValid' => $isValid) = $this->authService->checkCode($data); 
        if ($isValid && $user->is_active)
        {
            $token = JWTAuth::fromUser($user);
            return response()->json(['token' => $token], 200);
        }else if ($isValid && !$user->is_active){
            return response()->json(['message' => 'User is not active'], 204);
        }
        else{
            return response()->json(['message' => 'Wrong code']);
        }
    }


}
