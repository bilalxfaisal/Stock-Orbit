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
import { Label } from "@/components/ui/label";

import { useCreateUser } from "@/hooks/userUsers";
import { UserRole } from "@/types/user.types";
import { InputField } from "../InputField";
import FilterSelect from "../FilterSelect";
import { usePermission } from "@/hooks/usePermission";

export default function CreateUserDialog() {
    const { can } = usePermission();
    const createUser = useCreateUser();
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [role, setRole] = useState<UserRole>(
        UserRole.AUDITOR
    );

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            await createUser.mutateAsync({ name, email, password, phoneNumber, role });
            toast.success("User created.");
            setName("")
            setEmail("")
            setPassword("")
            setPhoneNumber("")
            setRole(UserRole.AUDITOR)
            setOpen(false)
        } catch {
            toast.error("Failed to user.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<Button disabled={!can("createUser")}
            />}>Create User</DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <InputField
                        label="Name"
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="name"
                    />
                    <InputField
                        label="Email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="email"
                    />
                    <InputField
                        label="Password"
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password"
                    />
                    <InputField
                        label="Phone Number"
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="phone-number"
                    />
                    <div className="space-y-1.5">
                        <Label>Role</Label>

                        <FilterSelect<UserRole>
                            value={role}
                            onValueChange={(value) => {
                                if (value !== undefined) {
                                    setRole(value);
                                }
                            }}
                            options={Object.values(UserRole).map((role) => ({
                                id: role,
                                label: role,
                            }))}
                            allLabel="All Roles"
                        />
                    </div>

                    <Button className="w-full" disabled={createUser.isPending} type="submit">
                        {createUser.isPending ? "Creating..." : "Create"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
