import clsx from 'clsx';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
//import { FieldWrapper, FieldWrapperPassThroughProps } from '../fieldWrapper/index'
import { FieldWrapper, FieldWrapperPassThroughProps } from '../fieldWrapper/fielWrapper';
type InputFieldProps = FieldWrapperPassThroughProps & {
	type?: 'text' | 'email' | 'number' | 'date' | 'file' | 'password';
	className?: string;
	placeholder?: string;
	autoFocus?: boolean;
  multiple?:boolean;
	disabled?: boolean;
	registration?: Partial<UseFormRegisterReturn>;
	isLoading?: boolean;
	onChange?: (e: any) => void;
	min?: number | string; 
  error?:FieldError
  };
  

  export const InputField = (props: InputFieldProps) => {
    const {
      type,
      label,
      placeholder,
      autoFocus = false,
      disabled = false,
      className = '',
      registration,
      error,
      isLoading = false,
      onChange,
      min,
      multiple,  
    } = props;
  
    if (type === 'file' && multiple) {
      return (
        <FieldWrapper label={label} error={error}>
          <input
            type={type}
            className={clsx(
              'form-control',
              error?.message
                ? 'border-red-300 focus:border-red-300'
                : 'border-gray-900 focus:border-gray-800',
              className
            )}
            
            autoFocus={autoFocus}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            {...registration}
            min={min}
            onChange={onChange ? onChange : () => {}}
            multiple  
          />
        </FieldWrapper>
      );
    }
    return (
      <FieldWrapper label={label} error={error}>
        <input
          type={type}
          className={clsx(
            'form-control',
            error?.message
              ? 'border-red-300 focus:border-red-300'
              : 'border-slate-300 focus:border-first-color',
            className
          )}
          autoComplete='on'
          autoFocus={autoFocus}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          {...registration}
          min={min}
          onChange={onChange ? onChange : () => {}}
        />
      </FieldWrapper>
    );
  };
  