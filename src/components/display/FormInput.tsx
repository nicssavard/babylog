import clsx from "clsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: any;
  type: string;
  className?: string;
}

export default function FormInput({
  label,
  register,
  type,
  className,
  ...props
}: Props) {
  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <input
          {...register}
          type={type}
          {...props}
          className={clsx(
            `block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm `,
            className
          )}
        />
      </div>
    </div>
  );
}
