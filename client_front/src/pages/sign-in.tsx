import { SignInForm } from "@/features/auth/sign-in-form";
import Link from "next/link";

export function SignIn() {
  return (
    <div className="flex justify-center items-center">
      <div className="border border-gray-300 p-10 mt-24 flex flex-col justify-center">
        <div className="mx-auto pb-10">
          <h1 className="text-xl">Login</h1>
        </div>
        <SignInForm />
        <div className="flex justify-center mt-4">
            <Link href="/signup"><span className="text-sm text-gray-400 hover:text-gray-600">To sign up page</span></Link>
        </div>
      </div>
    </div>
  );
}
