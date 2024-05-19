'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table';
import * as XLSX from 'xlsx';
import { useSearchParams } from 'next/navigation';
import SideNavbar from '../components/SideNavbar';
import Header from '../components/Header';
import Logo from '../components/Logo';

const DisplayFavorite = () => {
  const searchParams = useSearchParams();
  const file = searchParams.get('file');
  const [data, setData] = useState([]);
  const [filterInput, setFilterInput] = useState('');

  useEffect(() => {
    if (file) {
      fetch(`/assignments/${file}`)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
          const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          setData(jsonData);
        })
        .catch(error => console.error('Error fetching file:', error));
    }
  }, [file]);

  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      Header: key,
      accessor: key,
    }));
  }, [data]);

  const tableInstance = useTable(
    { columns, data },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = tableInstance;

  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setFilterInput(value);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Logo />
        <div className="flex flex-col items-center justify-center p-8">
          <h1 className="text-2xl font-bold text-center mb-4">{file}</h1>
          <div style={{ margin: '10px 0' }}>
            <input
              value={filterInput}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
          <div className="overflow-x-auto">
            <table {...getTableProps()} style={{ margin: 'auto', borderCollapse: 'collapse', border: 'solid 1px gray', width: '100%' }}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th {...column.getHeaderProps(column.getSortByToggleProps())} style={{ borderBottom: 'solid 3px blue', background: 'aliceblue', color: 'black', fontWeight: 'bold', padding: '10px', border: 'solid 1px gray' }}>
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''} 
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} style={{ padding: '10px', border: 'solid 1px gray', textAlign: 'center' }}>
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayFavorite;
