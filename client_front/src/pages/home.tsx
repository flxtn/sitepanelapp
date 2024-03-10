import { Sites } from "@/features/sites/sites";
import axiosInstance from "@/shared/api/api-instance";
import { UiButton } from "@/shared/ui/ui-button";
import Link from "next/link";
import { useRouter } from "next/router";

export function Home() {

  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.get("logout");
      localStorage.removeItem("accessToken");
      router.push('/signin')
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row px-24 justify-between">
        <div className="flex gap-4">
          <Link href="/domains">
            <span className="text-2xl text-gray-500 hover:text-gray-600">
              Domains
            </span>
          </Link>
          <Link href="/hostings">
            <span className="text-2xl text-gray-500 hover:text-gray-600">
              Hostings
            </span>
          </Link>
        </div>
        <div>
          <UiButton variant="primary" onClick={handleLogout}>Logout</UiButton>
        </div>
      </div>
      <main className="flex w-[80%] mx-auto">
        <Sites />
      </main>
    </div>
  );
}
