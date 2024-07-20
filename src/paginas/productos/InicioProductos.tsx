import React, { useEffect } from "react";
import api from "@/servicios/servicio-api";
import { Orden } from "@/tipos/orden";
import ListadoProductos from "./componentes/ListadoProductos";
import { useToast } from "@/components/ui/use-toast";
import { Producto } from "@/tipos/producto";

const InicioProductos = () => {
    const { toast } = useToast();
    const [ordenes, setOrdenes] = React.useState<Orden[]>([]);
    const [productos, setProductos] = React.useState<Producto[]>([]);

    const obtenerOrdenes = async () => {
        try {
            const respuesta = await api.get('/ordenes');
            setOrdenes(respuesta.data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Oops!.",
                description: "Hubo un error al cargar la información del servidor"
            })
        }
    }

    const obtenerProductos = async () => {
        try {
            const respuesta = await api.get('/productos');
            setProductos(respuesta.data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Oops!.",
                description: "Hubo un error al cargar la información del servidor"
            })
        }
    }

    useEffect(() => {
        obtenerOrdenes();
        obtenerProductos();
    }, []);

    return (<ListadoProductos ordenes={ordenes} obtenerOrdenes={obtenerOrdenes} productos={productos} />);
}

export default InicioProductos;