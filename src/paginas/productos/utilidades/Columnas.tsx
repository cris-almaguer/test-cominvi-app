import { Orden } from '@/tipos/orden';
import * as TablaReact from '@tanstack/react-table';
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import moment from 'moment/min/moment-with-locales';

export const columnas: TablaReact.ColumnDef<Orden>[] = [
    {
        accessorKey: "idorden",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Id Orden
                    &nbsp;
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div>{row.getValue("idorden")}</div>
        ),
        enableHiding: false
    },
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Nombre
                    &nbsp;
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (<div>{row.getValue("nombre")}</div>)
        },
    },
    {
        accessorKey: "categoria",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Categoría
                    &nbsp;
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (<Badge>{row.getValue("categoria")}</Badge>)
        },
    },
    {
        accessorKey: "cantidad",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cantidad
                    &nbsp;
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (<div>{row.getValue("cantidad")}</div>)
        },
    },
    {
        accessorKey: "importetotal",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Importe total
                    &nbsp;
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return (<div>{row.getValue("importetotal").toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            })}</div>)
        },
    },
    {
        accessorKey: "fecha",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Fecha
                    &nbsp;
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const fechaFormateada = moment(row.getValue("fecha")).locale('es').format('LL');
            return (<div>{fechaFormateada}</div>)
        },
    },
];