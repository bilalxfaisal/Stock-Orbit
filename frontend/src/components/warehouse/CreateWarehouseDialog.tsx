import { useState } from "react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useCreateWarehouse } from "@/hooks/useWarehouses";
import { InputField } from "../InputField";

export default function CreateWarehouseDialog() {
    const createWarehouse = useCreateWarehouse();

    const [open, setOpen] = useState(false);

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await createWarehouse.mutateAsync({
                code,
                name,
                location,
            });

            toast.success("Warehouse created.");

            setCode("");
            setName("");
            setLocation("");

            setOpen(false);
        } catch {
            toast.error("Failed to create warehouse.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger
                render={<Button />}
            >
                Create Warehouse
            </DialogTrigger>

            < DialogContent >
                <DialogHeader>
                    <DialogTitle>Create Warehouse </DialogTitle>
                </DialogHeader>

                < form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <InputField
                        label="Code"
                        placeholder="WH001"
                        className="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />

                    <InputField
                        label="Name"
                        placeholder="Main Warehouse"
                        className="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <InputField
                        label="Location"
                        placeholder="Islamabad"
                        className="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    < Button
                        className="w-full"
                        disabled={createWarehouse.isPending}
                        type="submit"
                    >
                        {
                            createWarehouse.isPending
                                ? "Creating..."
                                : "Create"
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
