import { Component } from '@angular/core';
import { NasaService } from '../../services/nasa.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent {
    longitud:any = "-95.45";
    latitud:any = "29.7";
    fecha:any = "2018-01-01";
    dim:any = "0.15";
    imageUrl:any = "";

    constructor (private nasa: NasaService){}

    buscarImagen(){
      let datos = [this.longitud, this.latitud, this.fecha, this.dim];
      this.imageUrl =  this.nasa.buscarImagenNasa(datos);
    }

}
