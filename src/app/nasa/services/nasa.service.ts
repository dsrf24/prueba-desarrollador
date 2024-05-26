import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Neo } from '../interfaces/nasa.interfaces';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NasaService {

  private _dates: any[] = [];
  private _apodObj: any
  public apikey: any = "3uV93TIkMt0Ol60ogscdeECRhyJibLDXz7tPRsRU";
  
  selectedDate : any = "0000-00-00";

  constructor(
    private http: HttpClient
  ) { 
    this.getApod().subscribe( data =>{
      // console.log(data);
      this._apodObj = data; 
    })
  }


  get dates() {
    return [...this._dates];
  }

  get apod() {
    return this._apodObj;
  }
  
  generateDateRandom(): string {
    let random = Math.floor(Math.random() * 7);
    let fechaActual: Date = new Date();
    let dateTime: number = fechaActual.getTime();
    let dateTimeRandom: number = (60000 * 60 * 24) * random;
    let fechaNueva: Date = new Date(dateTime - dateTimeRandom); // Sumar random días
  
    let year = fechaNueva.getFullYear();
    let month = (fechaNueva.getMonth() + 1).toString().padStart(2, '0');
    let day = fechaNueva.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  

  getApod() {
    /**
     * Paso 1
     * Almacene en una variable un número aleatorio entre 1 y 7
     */
    let fecha = this.generateDateRandom();

    /**
     * Paso 3
     * petición APOD endpoint
     * consulte el endpoint https://api.nasa.gov/planetary/apod enviando los parámetros:
     * date = fecha obtenida en el Paso 2 en formato YYYY-MM-DD
     * api_key = su API KEY generado en el sitio web https://api.nasa.gov/
     * Debe asignar el valor de la respuesta del endpoint a la variable global _apod que ya se encuentra declarada, ejemplo: this._apodObj = respuesta;
     */
    let endpoint = `https://api.nasa.gov/planetary/apod?api_key=${this.apikey}&date=${fecha}`;
    return this.http.get(endpoint);
  }

  /**
   * 
   * @param date Fecha seleccionada en el input date
   */
  buscarNeo(date: string) {
    /**
     * Paso 1
     * petición NEOWS endpoint
     * consulte el endpoint https://api.nasa.gov/neo/rest/v1/feed enviando los parámetros:
     * api_key = su API KEY generado en el sitio web https://api.nasa.gov/
     * start_date = parámetro date recibido en la función en formato YYYY-MM-DD.
     * end_date = parámetro date recibido en la función en formato YYYY-MM-DD.
     * Nota: para start_date y end_date se utiliza el mismo valor el cual llega como parámetro de la función.
     * Debe asignar el valor de la respuesta del endpoint a la variable global _dates, ejemplo: this._dates = respuesta.near_earth_objects[date], siendo [date] el parámetro que recibe la función;
     */
    let endpoint = `https://api.nasa.gov/neo/rest/v1/feed?api_key=${this.apikey}&start_date=${date}&end_date${date}`;
    this.http.get(endpoint).subscribe((response: any) => {
      this._dates =  response.near_earth_objects[date];
      // console.log(response);
      // return response.near_earth_objects;
      
    });
  }

  buscarImagenNasa(datos: any){
    let endpoint = `https://api.nasa.gov/planetary/earth/imagery?lon=${datos[0]}&lat=${datos[1]}&date=${datos[2]}&dim=${datos[3]}&api_key=${this.apikey}`;
    console.log(endpoint);
    
    return endpoint;
    // return this.http.get(endpoint);
  }


}
