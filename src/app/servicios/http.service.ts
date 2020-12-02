import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  register(usuario) {
    const body = JSON.stringify(usuario);
    console.log('Usuario a registrar: ', JSON.stringify(usuario));
    return this.http.post(
      'https://watchmovieskubo.herokuapp.com/api/auth/register',
      body,
      { headers: this.headers }
    );
  }

  login(usuario): any {
    const body = JSON.stringify(usuario);
    return this.http.post(
      'https://watchmovieskubo.herokuapp.com/api/auth/login',
      body,
      { headers: this.headers }
    );
  }

  me(): any {
    const token = localStorage.getItem('token');
    const newheaders = this.headers.set('authorization', token);
    return this.http.get('https://watchmovieskubo.herokuapp.com/api/auth/me', {
      headers: newheaders,
    });
  }

  getPeliculas() {
    return this.http.get(
      'https://watchmovieskubo.herokuapp.com/api/peliculas',
      { headers: this.headers }
    );
  }

  getPelicula(id: string) {
    return this.http.get(
      `https://watchmovieskubo.herokuapp.com/api/peliculas/${id}`,
      { headers: this.headers }
    );
  }

  agregarPelicula(pelicula: FormData) {
    const token = localStorage.getItem('token');
    const newheaders = new HttpHeaders().set('authorization', token); //envio el token al middleware pero no el tipo de contenido, ya que multer se encarga de procesar la peticion del FormData cuando tiene la propiedad 'image'
    // console.log(newheaders);
    return this.http.post(
      'https://watchmovieskubo.herokuapp.com/api/peliculas',
      pelicula,
      { headers: newheaders }
    );
    // return this.http.post('http://localhost:4000/api/peliculas', pelicula);
  }

  ratingPelicula(calificacion: number, _id: string) {
    const token = localStorage.getItem('token');
    const newheaders = new HttpHeaders()
      .set('authorization', token)
      .set('Content-Type', 'application/json');
    return this.http.put(
      `https://watchmovieskubo.herokuapp.com/api/peliculas/${_id}`,
      { calificacion: calificacion },
      { headers: newheaders }
    );
  }

  buscarPelicula(pelicula: string): Array<Object> {
    let peliculas = [];
    this.http
      .get('https://watchmovieskubo.herokuapp.com/api/peliculas', {
        headers: this.headers,
      })
      .subscribe((response: string) => {
        for (let res of response) {
          let peli: string = res['titulo'];
          if (peli.toLowerCase().indexOf(pelicula) >= 0) {
            peliculas.push(res);
          }
        }
      });

    return peliculas;
  }
}
