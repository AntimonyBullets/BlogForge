import React, { useId } from 'react'

function Select(
    {
        options = [],
        label,
        className = '',
        ...props
    },
    ref
) {
    const id = useId();
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="inline-block mb-1 pl-1 text-slate-300"> {label} </label>}
            <select
                className={`px-3 py-2 rounded-lg bg-slate-800 text-slate-100 outline-none focus:bg-slate-700 focus:ring-2 focus:ring-blue-500 duration-200 border border-slate-700 w-full ${className}`}
                {...props}
                id={id}
                ref={ref}>
                {options.map((option) => (
                    <option value={option} key={option} className="bg-slate-800">
                        {option}
                    </option>
                ))}
            </select>
        </div>

    )
}
export default React.forwardRef(Select);