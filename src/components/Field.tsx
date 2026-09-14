import { AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * Labelled form field wrapper.
 *
 * Guarantees, for every field on the site:
 *   - a real <label> bound to the control by id
 *   - errors and hints wired to the control via aria-describedby
 *   - aria-invalid set when there is an error
 *   - the error ALWAYS carries text and an icon — never a red border alone
 */

interface FieldProps {
  id: string;
  label: string;
  /** Rendered as "(Optional)" next to the label. */
  optional?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: {
    id: string;
    'aria-describedby': string | undefined;
    'aria-invalid': boolean | undefined;
    className: string;
  }) => React.ReactNode;
}

const baseControl =
  'w-full bg-white border px-4 py-3 rounded-sm text-brand-espresso placeholder:text-brand-espresso/30 transition-colors';

export function Field({ id, label, optional, hint, error, className, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={id} className="block text-xs uppercase tracking-widest font-semibold text-brand-espresso/70">
        {label}
        {optional && <span className="ml-2 normal-case tracking-normal font-normal opacity-60">(Optional)</span>}
      </label>

      {children({
        id,
        'aria-describedby': describedBy,
        'aria-invalid': error ? true : undefined,
        className: cn(
          baseControl,
          error ? 'border-[#8C2F1F] focus:border-[#8C2F1F]' : 'border-brand-teal/20 focus:border-brand-teal'
        ),
      })}

      {hint && (
        <p id={hintId} className="text-xs text-brand-espresso/60 font-light leading-relaxed">
          {hint}
        </p>
      )}

      {/* Error state is never carried by the border colour alone: icon + text. */}
      {error && (
        <p id={errorId} className="flex items-start gap-2 text-xs font-medium text-[#8C2F1F]">
          <AlertCircle size={14} className="mt-px shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
