import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUpdateWarehouse } from "@/hooks/useWarehouses";
import type { Warehouse } from "@/types/warehouse.types";
import { usePermission } from "@/hooks/usePermission";

interface Props {
    warehouse: Warehouse;
}

export default function UpdateWarehouseDialog({
    warehouse,
}: Props) {
    const {can} = usePermission();
    const updateWarehouse = useUpdateWarehouse();

    const [open, setOpen] = useState(false);

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        setCode(warehouse.code);
        setName(warehouse.name);
        setLocation(warehouse.location);
    }, [warehouse]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await updateWarehouse.mutateAsync({
                id: warehouse.id,
                data: {
                    code,
                    name,
                    location,
                },
            });

            toast.success("Warehouse updated.");
            setOpen(false);
        } catch {
            toast.error("Failed to update warehouse.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={<Button disabled={!can("updateWarehouse")}/>}
            >
                Edit
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Warehouse</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <div className="space-y-1.5">
                        <Label>Code</Label>

                        <Input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Name</Label>

                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Location</Label>

                        <Input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    <Button
                        className="w-full"
                        disabled={updateWarehouse.isPending}
                        type="submit"
                    >
                        {updateWarehouse.isPending
                            ? "Updating..."
                            : "Update"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}