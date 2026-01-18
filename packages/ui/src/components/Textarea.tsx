import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className = '', id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={textareaId} className="form-label">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={`input textarea ${className}`.trim()}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
