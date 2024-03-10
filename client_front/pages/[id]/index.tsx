import { protectedPage } from "@/features/auth/protected-page";
import { RecordsPage } from "@/pages/records";

export default protectedPage(RecordsPage)