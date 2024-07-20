import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Orden } from "@/tipos/orden"
import { columnas } from "../utilidades/Columnas"
import * as TablaReact from "@tanstack/react-table"
import * as TablaShadcn from "@/components/ui/table"
import { DollarSign, Smartphone } from "lucide-react"
import GenerarOrdenCompra from "./GenerarOrdenCompra"
import { Producto } from "@/tipos/producto"

interface Props {
    ordenes: Orden[],
    productos: Producto[],
    obtenerOrdenes: Function
}

const ListadoProductos = ({ ordenes, obtenerOrdenes, productos }: Props) => {
    const granTotal = ordenes.map(orden => orden.importetotal).reduce((a, b) => a + b, 0);
    const granTotalSmartphones = ordenes.filter(({ categoria }) => Object.is(categoria, "Smartphone")).map(or => or.importetotal).reduce((a, b) => a + b, 0);
    const [ordenamiento, setOrdenamiento] = React.useState<TablaReact.SortingState>([])
    const [filtrosColumna, setFiltrosColumna] = React.useState<TablaReact.ColumnFiltersState>(
        []
    )
    const [visibilidadColumnas, setVisibilidadColumnas] =
        React.useState<TablaReact.VisibilityState>({})
    const [seleccionFilas, setSeleccionFilas] = React.useState({});

    const tabla = TablaReact.useReactTable({
        data: ordenes,
        columns: columnas,
        onSortingChange: setOrdenamiento,
        onColumnFiltersChange: setFiltrosColumna,
        getCoreRowModel: TablaReact.getCoreRowModel(),
        getPaginationRowModel: TablaReact.getPaginationRowModel(),
        getSortedRowModel: TablaReact.getSortedRowModel(),
        getFilteredRowModel: TablaReact.getFilteredRowModel(),
        onColumnVisibilityChange: setVisibilidadColumnas,
        onRowSelectionChange: setSeleccionFilas,
        state: {
            sorting: ordenamiento,
            columnFilters: filtrosColumna,
            columnVisibility: visibilidadColumnas,
            rowSelection: seleccionFilas,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filtrar por nombre..."
                    value={(tabla.getColumn("nombre")?.getFilterValue() as string) ?? ""}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        tabla.getColumn("nombre")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <div className="ml-auto">
                    <GenerarOrdenCompra obtenerOrdenes={obtenerOrdenes} productos={productos} />
                </div>
            </div>
            <div className="rounded-md border">
                <TablaShadcn.Table>
                    <TablaShadcn.TableHeader>
                        {tabla.getHeaderGroups().map((headerGroup) => (
                            <TablaShadcn.TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TablaShadcn.TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : TablaReact.flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TablaShadcn.TableHead>
                                    )
                                })}
                            </TablaShadcn.TableRow>
                        ))}
                    </TablaShadcn.TableHeader>
                    <TablaShadcn.TableBody>
                        {tabla.getRowModel().rows?.length ? (
                            tabla.getRowModel().rows.map((row) => (
                                <TablaShadcn.TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TablaShadcn.TableCell key={cell.id}>
                                            {TablaReact.flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TablaShadcn.TableCell>
                                    ))}
                                </TablaShadcn.TableRow>
                            ))
                        ) : (
                            <TablaShadcn.TableRow>
                                <TablaShadcn.TableCell
                                    colSpan={columnas.length}
                                    className="h-24 text-center"
                                >
                                    No hay resultados.
                                </TablaShadcn.TableCell>
                            </TablaShadcn.TableRow>
                        )}
                    </TablaShadcn.TableBody>
                </TablaShadcn.Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => tabla.previousPage()}
                        disabled={!tabla.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => tabla.nextPage()}
                        disabled={!tabla.getCanNextPage()}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
            <div className="flex-1 items-center py-2">
                <div className="grid md:grid-cols-2 gap-4 py-2">
                    <div className="rounded-xl border bg-card text-card-foreground shadow p-3">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Gran Total</h3>
                            <DollarSign
                                className="h-4 w-4 text-muted-foreground"
                            />
                        </div>
                        <div className="p-6 pt-0">
                            <div className="text-2xl font-bold">{granTotal.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}</div>
                        </div>
                    </div>
                    <div className="rounded-xl border bg-card text-card-foreground shadow p-3">
                        <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                            <h3 className="tracking-tight text-sm font-medium">Gran Total "Smartphones"</h3>
                            <Smartphone
                                className="h-4 w-4 text-muted-foreground"
                            />
                        </div>
                        <div className="p-6 pt-0">
                            <div className="text-2xl font-bold">{granTotalSmartphones.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListadoProductos;
