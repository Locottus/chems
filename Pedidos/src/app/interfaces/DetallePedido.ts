export class DetallePedido {
    public title: string;
    public date: string;
    public nombre: string;
    public detalle: string;
    public telefono: string;
    public ubicacion: string;
    public nota: string;
    public hora: string;
    public recordatorio: string;
    public detalleJson: Array<any> = [];
    public total: number;
    public estado: string = "nuevo";
}
