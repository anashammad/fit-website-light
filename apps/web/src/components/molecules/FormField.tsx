import { Input, Textarea, Select, type SelectOption } from '@/components/atoms';

export type FormFieldType = 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';

export interface FormFieldProps {
  name: string;
  label: string;
  type?: FormFieldType;
  required?: boolean;
  placeholder?: string;
  error?: string;
  hint?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: SelectOption[];
}

export function FormField({
  name,
  label,
  type = 'text',
  required,
  placeholder,
  error,
  hint,
  value,
  onChange,
  options,
}: FormFieldProps) {
  if (type === 'textarea') {
    return (
      <Textarea
        name={name}
        id={name}
        label={label}
        required={required}
        placeholder={placeholder}
        error={error}
        hint={hint}
        value={value}
        onChange={onChange}
      />
    );
  }

  if (type === 'select' && options) {
    return (
      <Select
        name={name}
        id={name}
        label={label}
        required={required}
        options={options}
        error={error}
        hint={hint}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <Input
      name={name}
      id={name}
      label={label}
      type={type}
      required={required}
      placeholder={placeholder}
      error={error}
      hint={hint}
      value={value}
      onChange={onChange}
    />
  );
}
