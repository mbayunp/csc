import React from 'react';

interface BadgeProps {
  status: 'pending' | 'approved' | 'rejected' | 'cancelled' | string;
}

export const Badge: React.FC<BadgeProps> = ({ status }) => {
  let colorStyles = 'bg-gray-100 text-gray-700 border-gray-200';

  switch (status.toLowerCase()) {
    case 'approved':
      colorStyles = 'bg-green-100 text-green-700 border-green-200';
      break;
    case 'pending':
      colorStyles = 'bg-yellow-100 text-yellow-700 border-yellow-200';
      break;
    case 'rejected':
    case 'cancelled':
      colorStyles = 'bg-red-100 text-red-700 border-red-200';
      break;
  }

  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${colorStyles} uppercase tracking-wide`}>
      {status}
    </span>
  );
};
