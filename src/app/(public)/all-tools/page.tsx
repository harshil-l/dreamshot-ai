import { getAllToolConfigs } from "@/config/tools.server";
import AllToolsClient from "@/components/AllTools/AllToolsClient";
import Footer from "@/components/Footer";

/**
 * All Tools page - Server component that loads all tool configurations
 * Passes tools data to client component for filtering and search functionality
 */
export default async function AllTools() {
    // Load all tool configurations from config/tools directory
    const tools = await getAllToolConfigs();

    return (
        <>
            <AllToolsClient tools={tools} />
            <Footer />
        </>
    );
}