import { protectedPage } from "@/features/auth/protected-page";
import { DomainsPage } from "@/pages/domains";

export default protectedPage(DomainsPage)
