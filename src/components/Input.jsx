import React, { useId } from 'react';

const Input = React.forwardRef(function Input(
  { 
    label, 
    type = 'text', 
    className = '',        
    ...props 
  },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        ref={ref}
        {...props}
        className={`
          px-3 py-2 rounded-lg bg-slate-800 text-slate-100 
          outline-none focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 duration-200 
          border border-slate-700 w-full placeholder:text-slate-500 ${className}
        `}
      />
    </div>
  );
});

export default Input;
