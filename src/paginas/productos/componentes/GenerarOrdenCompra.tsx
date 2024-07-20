import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, PlusCircle } from 'lucide-react';
import * as UIDialog from "@/components/ui/dialog";
import * as UIForm from '@/components/ui/form';
import * as UISelect from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import axios from 'axios';
import api from '@/servicios/servicio-api';
import { Producto } from '@/tipos/producto';

interface Props {
    productos: Producto[];
    obtenerOrdenes: Function;
}

const GenerarOrdenCompra = ({ obtenerOrdenes, productos }: Props) => {
    const { toast } = useToast();
    const [cargando, setCargando] = useState(false);
    const [abierto, setAbierto] = useState(false);

    const esquemaFormulario = z.object({
        producto: z.string({
            required_error: "Selecciona un producto,",
        }),
        cantidad: z.coerce.number().min(1, "El valor mínimo es 1.")
            .min(1, "La cantidad no puede ser menor a 1.")
            .int({ message: "Ingresa un número entero" }),
        precioUnitario: z.coerce.number().min(1, "El valor mínimo es 1.")
            .min(1, "La cantidad no puede ser menor a 1.")
            .refine(value => {
                const decimalPart = (value.toString().split('.')[1] || '').length;
                return decimalPart <= 2;
            }, {
                message: "El costo debe tener hasta dos decimales.",
            })
    });

    const formulario = useForm({
        resolver: zodResolver(esquemaFormulario),
        mode: 'onChange',
        defaultValues: {
            producto: "",
            cantidad: 0,
            precioUnitario: 0
        },
    });

    const guardarOrdenCompra = async (values: z.infer<typeof esquemaFormulario>) => {
        setCargando(true);
        try {
            const { producto: idProducto, cantidad, precioUnitario } = values;
            const datosEnvio = {
                idorden: 0,
                idproducto: parseInt(idProducto),
                cantidad: cantidad,
                preciounitario: precioUnitario,
                importetotal: (cantidad * precioUnitario)
            }
            const respuesta = await api.post("/ordenes", datosEnvio);

            if (Object.is(respuesta.status, axios.HttpStatusCode.Ok)) {
                toast({
                    title: "¡Éxito!",
                    description: "Orden de compra generada exitosamente",
                });
                formulario.reset();
                obtenerOrdenes();
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "¡Vaya!",
                description: "Algo ha salido mal, hubo un error inesperado",
            });
        }
        setCargando(false);
        setAbierto(false);
    };

    return (
        <UIDialog.Dialog open={abierto} onOpenChange={setAbierto}>
            <UIDialog.DialogTrigger asChild>
                <Button>
                    <PlusCircle className="h-4 w-4" />&nbsp;Generar orden de compra
                </Button>
            </UIDialog.DialogTrigger>
            <UIDialog.DialogContent>
                <UIDialog.DialogHeader>
                    <UIDialog.DialogTitle>Generar orden de compra</UIDialog.DialogTitle>
                    <UIDialog.DialogDescription>
                        Llena la información requerida para generar una nueva orden de compra.
                    </UIDialog.DialogDescription>
                </UIDialog.DialogHeader>
                <UIForm.Form {...formulario}>
                    <form onSubmit={formulario.handleSubmit(guardarOrdenCompra)} className="space-y-4">
                        <UIForm.FormField
                            control={formulario.control}
                            name="producto"
                            render={({ field }) => (
                                <>
                                    <UIForm.FormItem>
                                        <UIForm.FormLabel>Producto</UIForm.FormLabel>
                                        <UISelect.Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <UIForm.FormControl>
                                                <UISelect.SelectTrigger>
                                                    <UISelect.SelectValue placeholder="Selecciona una opción" />
                                                </UISelect.SelectTrigger>
                                            </UIForm.FormControl>
                                            <UISelect.SelectContent>
                                                {productos.map(({ idproducto, nombre }) => (
                                                    <UISelect.SelectItem key={idproducto} value={idproducto.toString()}>
                                                        {nombre}
                                                    </UISelect.SelectItem>
                                                ))}
                                            </UISelect.SelectContent>
                                        </UISelect.Select>
                                        <UIForm.FormMessage />
                                    </UIForm.FormItem>
                                </>
                            )
                            }
                        />
                        <UIForm.FormField
                            control={formulario.control}
                            name="cantidad"
                            render={({ field }) => (
                                <UIForm.FormItem>
                                    <UIForm.FormLabel>Cantidad</UIForm.FormLabel>
                                    <UIForm.FormControl>
                                        <Input
                                            type="number" {...field} />
                                    </UIForm.FormControl>
                                    <UIForm.FormMessage />
                                </UIForm.FormItem>
                            )}
                        />
                        <UIForm.FormField
                            control={formulario.control}
                            name="precioUnitario"
                            render={({ field }) => (
                                <UIForm.FormItem>
                                    <UIForm.FormLabel>Precio Unitario</UIForm.FormLabel>
                                    <UIForm.FormControl>
                                        <Input
                                            type="number" {...field} />
                                    </UIForm.FormControl>
                                    <UIForm.FormMessage />
                                </UIForm.FormItem>
                            )}
                        />
                        <UIDialog.DialogFooter>
                            <Button disabled={cargando} type='submit'>
                                Guardar{" "}{cargando && <Loader2 className="mx-2 h-4 w-4 animate-spin" />}
                            </Button>
                        </UIDialog.DialogFooter>
                    </form>
                </UIForm.Form>
            </UIDialog.DialogContent>
        </UIDialog.Dialog>
    );
}

export default GenerarOrdenCompra;