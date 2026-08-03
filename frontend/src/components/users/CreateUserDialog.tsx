import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

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
import { flattenZodErrors, getApiErrorMessage } from "@/lib/form-errors";

const schema = z.object({
    name: z.string().trim().min(1, "Name is required."),
    email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
    password: z.string().min(1, "Password is required.").min(8, "Password must be at least 8 characters."),
    phoneNumber: z.string().trim().min(1, "Phone number is required."),
    role: z.enum(UserRole, { error: "Please select a role." }),
});

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
    const [errors, setErrors] = useState<Record<string, string>>({});

    function clearError(field: string) {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    function resetForm() {
        setName("")
        setEmail("")
        setPassword("")
        setPhoneNumber("")
        setRole(UserRole.AUDITOR)
        setErrors({});
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const result = schema.safeParse({ name, email, password, phoneNumber, role });

        if (!result.success) {
            setErrors(flattenZodErrors(result.error));
            return;
        }

        try {
            await createUser.mutateAsync(result.data);
            toast.success("User created.");
            resetForm();
            setOpen(false)
        } catch (error) {
            toast.error(getApiErrorMessage(error, "Failed to create user."));
        }
    }

    return (
        <Dialog open={open} onOpenChange={(next) => { setOpen(next); if (!next) resetForm(); }}>
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
                        onChange={(e) => { setName(e.target.value); clearError("name"); }}
                        error={errors.name}
                    />
                    <InputField
                        label="Email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                        error={errors.email}
                    />
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                        error={errors.password}
                    />
                    <InputField
                        label="Phone Number"
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => { setPhoneNumber(e.target.value); clearError("phoneNumber"); }}
                        error={errors.phoneNumber}
                    />
                    <div className="space-y-1.5">
                        <Label>Role</Label>

                        <FilterSelect<UserRole>
                            value={role}
                            onValueChange={(value) => {
                                if (value !== undefined) {
                                    setRole(value);
                                    clearError("role");
                                }
                            }}
                            options={Object.values(UserRole).map((role) => ({
                                id: role,
                                label: role,
                            }))}
                            allLabel="Select role"
                            showAllOption={false}
                            error={errors.role}
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
