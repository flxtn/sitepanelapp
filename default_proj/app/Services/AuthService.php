<?php

namespace App\Services;

use App\Models\User;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\SvgWriter;
use Illuminate\Support\Facades\Hash;
use PragmaRX\Google2FA\Google2FA;



class AuthService
{
    public function register(array $data): ?User
    {
        $secret = $this->generateSecret();
        $user = new User();
        $user->name = $data['username'];
        $user->email = $data['email'];
        $user->password = $data['password'];
        $user->two_factor_secret = $secret;
        $user->save();

        return $user;
    }

    public function login(array $data): User | bool
    {
        $user = User::where('email', $data['email'])->first();
        if (Hash::check($data['password'], $user->password)){
            return $user;
        }else{
            return false;
        }

    }

    protected function generateSecret()
    {
        $google2fa = new Google2FA();
        return $google2fa->generateSecretKey();
    }

    public function generateQrCode($user): string
    {
        $google2fa = new Google2FA();
        $secret = $user->two_factor_secret;
        $email = $user->email;
        $qrCodeUrl = $google2fa->getQRCodeUrl('default_proj', $email, $secret);
    
        $qrCode = new QrCode($qrCodeUrl);
        $writer = new SvgWriter();
        $svg = $writer->write($qrCode)->getString();
    
        return base64_encode($svg);
    
    }
    protected function authenticate(string $code, string $secret): bool
    {
        $google2fa = new Google2FA();
        $isValidCode = $google2fa->verifyKey($secret, $code);
        return $isValidCode;
    }

    public function checkCode(array $data): array
    {
        $user = User::where('email', $data['email'])->first();
        $secret = $user->two_factor_secret;
        $code = $data['code'];
        $isValid = $this->authenticate($code, $secret);
        return compact('user', 'isValid');
    }


}