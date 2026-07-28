import type {InputFieldProps} from "@/types/input-field.types"
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
}: InputFieldProps) {
  return (
    <>
      <Label>{label}</Label>

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={className}
      />
      <br />
    </>
  );
}