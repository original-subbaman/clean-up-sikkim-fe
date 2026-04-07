import { useState, useCallback } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Eye, EyeClosed } from "lucide-react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FieldLabel, FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface PasswordTextFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  /** react-hook-form control object */
  control: Control<TFieldValues>;
  /** Field name registered with the form */
  name: TName;
  /** Label shown above the input. Defaults to "Password". */
  label?: string;
  /** Helper text shown below the input. Pass null to hide it. */
  hint?: string | null;
  /** HTML id for the input element. Falls back to `name`. */
  id?: string;
  /** Placeholder for the input. Defaults to "••••••••". */
  placeholder?: string;
  /** Additional className applied to the outer Field wrapper. */
  className?: string;
  /** Additional className applied to the Input element. */
  inputClassName?: string;
  /** Whether the field is disabled. */
  disabled?: boolean;
}

export function PasswordTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label = "Password",
  hint = "Must be at least 8 characters with a symbol.",
  id,
  placeholder = "••••••••",
  className,
  inputClassName,
  disabled = false,
}: PasswordTextFieldProps<TFieldValues, TName>) {
  const inputId = id ?? name;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = useCallback(
    () => setPasswordVisible((v) => !v),
    [],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={className}>
          <FieldLabel
            htmlFor={inputId}
            className="block text-sm font-label font-bold text-on-surface-variant mb-2 ml-1"
          >
            {label}
          </FieldLabel>

          <div className="relative">
            <Input
              {...field}
              id={inputId}
              name={name}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
              placeholder={placeholder}
              type={passwordVisible ? "text" : "password"}
              className={cn(
                "w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary/20 rounded-xl px-5 py-4 text-on-surface placeholder:text-outline transition-all duration-200",
                inputClassName,
              )}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={passwordVisible ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-primary"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <Eye /> : <EyeClosed />}
            </Button>
          </div>

          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}

          {hint !== null && hint !== undefined && (
            <p className="mt-2 text-[0.7rem] text-outline px-1">{hint}</p>
          )}
        </Field>
      )}
    />
  );
}
