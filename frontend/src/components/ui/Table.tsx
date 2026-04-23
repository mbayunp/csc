import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string | number;
  emptyMessage?: string;
  isLoading?: boolean;
}

export function Table<T>({ 
  data, 
  columns, 
  keyExtractor, 
  emptyMessage = 'Tidak ada data ditemukan.',
  isLoading = false 
}: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 border-y border-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} scope="col" className={`px-6 py-4 font-bold tracking-wider ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-3"></div>
                  <p className="font-medium">Memuat data...</p>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-16 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-gray-900 font-bold text-lg mb-1">Data Kosong</p>
                  <p className="text-gray-500">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr 
                key={keyExtractor(row)} 
                className={`transition-colors duration-200 hover:bg-green-50/50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
              >
                {columns.map((col, idx) => (
                  <td key={idx} className={`px-6 py-4 whitespace-nowrap ${col.className || ''}`}>
                    {typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
