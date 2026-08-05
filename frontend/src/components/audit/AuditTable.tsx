import { ClipboardList } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableCard from "@/components/DataTableCard";
import { EmptyState } from "@/components/PageStates";
import StatusBadge from "@/components/StatusBadge";

import type { Audit } from "@/types/audit.types";

interface Props {
  audits: Audit[];
}

export default function AuditTable({ audits }: Props) {
  if (!audits.length) {
    return (
      <EmptyState
        icon={ClipboardList}
        title="No audit logs found"
        description="Try adjusting your filters — activity will show up here as it happens."
      />
    );
  }

  return (
    <DataTableCard>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Time</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Entity</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Role</TableHead>
            {/* <TableHead>Description</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {audits.map((audit) => (
            <TableRow key={audit.id}>
              <TableCell className="text-muted-foreground">
                {new Date(audit.createdAt).toLocaleString()}
              </TableCell>
              <TableCell><StatusBadge value={audit.action} /></TableCell>
              <TableCell className="text-muted-foreground">{audit.entity.replaceAll("_", " ")}</TableCell>
              <TableCell className="text-right font-mono tabular-nums text-muted-foreground">
                {audit.quantity ?? "—"}
              </TableCell>
              <TableCell>
                {audit.reason ? <StatusBadge value={audit.reason} /> : <span className="text-muted-foreground">—</span>}
              </TableCell>
              <TableCell>
                {audit.role ? <StatusBadge value={audit.role} /> : <span className="text-muted-foreground">—</span>}
              </TableCell>
              {/* <TableCell className="max-w-[280px] text-muted-foreground whitespace-normal">
                {audit.description ?? "—"}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableCard>
  );
}
