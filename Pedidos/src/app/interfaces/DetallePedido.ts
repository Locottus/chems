export class DetallePedido {
    public title: string;
    public date: string;
    public nombre: string;
    public detalle: string;
    public telefono: string;
    public ubicacion: string;
    public nota: string;
    public hora: string;
    public recordatorio: number = 1;
    public detalleJson: Array<any> = [];
}
