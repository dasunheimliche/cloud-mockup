import { cn } from "@/lib/utils";
import TableRow from "./table-row";

export default function Table({
  data,
  columnsRef,
  selected,
  onSelectRow,
  onDoubleClickRow,
  className,
}: any) {
  return (
    <table id="myTable" className={cn("w-full relative", className)}>
      <thead>
        <tr className="text-[0.75rem] font-normal uppercase text-slate-700">
          {columnsRef?.map((header: any, i: number) => (
            <th
              key={i}
              className={cn(
                "py-3 border-b-[1px] border-t-[1px] border-slate-200",
                header.hidden ? "hidden" : "",
                header.hiddenOnMobile ? "max-lg:hidden" : "",
                header.isLast ? "border-r-[0px]" : ""
              )}
            >
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data?.map((row: any, j: number) => {
          console.log("ROW Nº: ", j, " VALUES: ", row);
          return (
            <TableRow
              key={j}
              data={row}
              isSelected={selected?.id === row?.id}
              onSelect={onSelectRow}
              onDoubleClick={onDoubleClickRow}
              columnsRef={columnsRef}
            />
          );
        })}
      </tbody>
    </table>
  );
}
