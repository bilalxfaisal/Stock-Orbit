import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RoleBreakdownProps {
    totalAdmins: number;
    totalManagers: number;
    totalStaff: number;
    totalAuditors: number;
}

const ROLES = [
    { key: "totalAdmins", label: "Admins", color: "var(--color-primary)" },
    { key: "totalManagers", label: "Managers", color: "var(--color-info)" },
    { key: "totalStaff", label: "Staff", color: "var(--color-success)" },
    { key: "totalAuditors", label: "Auditors", color: "var(--color-warning)" },
] as const;

export default function RoleBreakdown(props: RoleBreakdownProps) {
    const total =
        props.totalAdmins + props.totalManagers + props.totalStaff + props.totalAuditors;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Team composition</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    {total === 0 ? null : ROLES.map((role) => {
                        const value = props[role.key];
                        if (value === 0) return null;

                        return (
                            <div
                                key={role.key}
                                style={{
                                    width: `${(value / total) * 100}%`,
                                    backgroundColor: role.color,
                                }}
                            />
                        );
                    })}
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {ROLES.map((role) => (
                        <div key={role.key} className="flex items-center gap-2 text-sm">
                            <span
                                className="h-2.5 w-2.5 shrink-0 rounded-full"
                                style={{ backgroundColor: role.color }}
                            />
                            <span className="text-muted-foreground">{role.label}</span>
                            <span className="ml-auto font-mono tabular-nums text-foreground">
                                {props[role.key]}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}