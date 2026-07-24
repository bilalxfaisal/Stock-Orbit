export type InputFieldProps = {
  label: string;
  type?: string;
  placeholder: string;
  value: string | number;
  readOnly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};