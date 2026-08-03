import type { InputFieldProps } from "@/types/input-field.types"
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export function InputField({
  label,
  type = "text",
  placeholder,
  value,
  readOnly = false,
  onChange,
  className,
  error,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={className}
        aria-invalid={!!error}
      />

      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
