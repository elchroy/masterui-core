// components/FormattedDate.tsx
import { format } from 'date-fns';

type FormattedDateProps = {
  date: string | number | Date;
  formatStr?: string; // optional override
};

export const FormattedDate: React.FC<FormattedDateProps> = ({
  date,
  formatStr = 'MMMM d, yyyy', // Default: August 7, 2025
}) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return <span></span>;
  }

  return <span>{format(parsedDate, formatStr)}</span>;
};