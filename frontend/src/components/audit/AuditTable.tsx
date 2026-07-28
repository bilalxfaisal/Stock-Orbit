import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Audit } from "@/types/audit.types";

interface Props {
  audits: Audit[];
}

export default function AuditTable({ audits }: Props) {
  if (!audits.length) {
    return <p className="text-muted-foreground">No audit logs found.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Entity ID</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Reason</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {audits.map((audit) => (
          <TableRow key={audit.id}>
            <TableCell>{new Date(audit.createdAt).toLocaleString()}</TableCell>
            <TableCell>{audit.action}</TableCell>
            <TableCell>{audit.entity}</TableCell>
            <TableCell>{audit.entityId}</TableCell>
            <TableCell>{audit.quantity ?? "-"}</TableCell>
            <TableCell>{audit.reason ?? "-"}</TableCell>
            <TableCell>{audit.role ?? "-"}</TableCell>
            <TableCell className="max-w-[280px] whitespace-normal">{audit.description ?? "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
