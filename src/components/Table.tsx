import type { NextPage } from "next";

import {
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TransactionRow } from "../utils/makeData";
import React, { FC } from "react";
import moment from "moment";

interface TableProps {
  tableData: TransactionRow[];
}

const Table: FC<TableProps> = ({ tableData }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns = React.useMemo<ColumnDef<TransactionRow>[]>(
    () => [
      {
        accessorKey: "image",
        header: () => <span></span>,
        cell: (info) => <img src={String(info.getValue())} />,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Buyer</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "buyer",
        cell: (info) => info.getValue(),
        header: () => <span>Buyer</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "seller",
        cell: (info) => info.getValue(),
        header: () => <span>Buyer</span>,
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "time",
        cell: (info) => moment(info.getValue(), "YYYYMMDD").fromNow(),
        header: () => <span>Time</span>,
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [data, setData] = React.useState<TransactionRow[]>(tableData);
  // const refreshData = () => setData(() => makeData(100000));

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    // Pipeline
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2 overflow-x-auto" />
      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? " "}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 20)
            .map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="btn border rounded"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="btn border rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="btn border rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="btn border rounded"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="input input-bordered w-16 max-w-xs"
          />
        </span>
        <select
          className="select select-bordered max-w-xs"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>

      {/* <pre>{JSON.stringify(sorting, null, 2)}</pre> */}
    </div>
  );
};

export default Table;
