import { protectedPage } from "@/features/auth/protected-page";
import { CreateSitePage } from "@/pages/create-site";

export default protectedPage(CreateSitePage);