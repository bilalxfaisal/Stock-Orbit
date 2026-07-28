import { useState } from "react";

import { useContainers } from "@/hooks/useContainers";
import CreateContainerDialog from "@/components/container/CreateContainerDialog";
import ContainerTable from "@/components/container/ContainerTable";

export default function ContainersPage() {

    const [search, setSearch] = useState("");

    const {
        data: containers,
        isLoading,
        isFetching,
        error,
    } = useContainers({
        code: search,
    });

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>Failed to load containers.</h1>;
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>
                    <h1 className="text-3xl font-bold">
                        Containers
                    </h1>

                    <p className="text-muted-foreground">
                        Manage all containers.
                    </p>
                </div>

                <CreateContainerDialog />

            </div>

            <input
                className="border rounded px-3 py-2"
                placeholder="Search container..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {isFetching}

            <ContainerTable
                containers={containers ?? []}
            />

        </div>
    );
}