import { Filters } from "@/types/Filters";

type YearsProps = {
  name: keyof Filters;
  label: string;
  value?: string;
};

const Years = ({ name, label, value }: YearsProps) => {
  return (
    <div className="flex flex-col gap-2 items-start">
      <label htmlFor={name}>{label}</label>
      <input
        className="p-2 rounded-md border border-gray-600"
        type="date"
        name={name}
        id={name}
        defaultValue={value}
      />
    </div>
  );
};

export default Years;
