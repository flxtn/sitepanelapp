import { SignUpForm } from "@/features/auth/sign-up-form";
import { UiTwoFactorModal } from "@/shared/ui/ui-two-factor-modal";
import Link from "next/link";

export function SignUp() {
  return (
    <div className="flex justify-center items-center">
      <div className="border border-gray-300 p-10 mt-24 flex flex-col justify-center">
        <div className="mx-auto pb-10">
          <h1 className="text-xl">Sign up</h1>
        </div>
        <SignUpForm />
        <div className="flex justify-center mt-4">
            <Link href="/signin"><span className="text-sm text-gray-400 hover:text-gray-600">To login page</span></Link>
        </div>
      </div>
    </div>
  );
}
