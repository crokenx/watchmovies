import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService, pelicula } from '../../servicios/http.service';
//librerias externas
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  id: string;
  pelicula: pelicula;
  total: number = 5;
  constructor(private params: ActivatedRoute, private service: HttpService) {}

  ngOnInit(): void {
    this.params.paramMap.subscribe((params) => (this.id = params.get('id')));
    this.service.getPelicula(this.id).subscribe((response: pelicula) => {
      this.pelicula = response;
      console.log(response, this.pelicula);
    });
  }

  onRate(
    $event: {
      oldValue: number;
      newValue: number;
      starRating: StarRatingComponent;
    },
    _id: string
  ) {
    console.log('evento completo', $event, _id);
    //alert(`Old Value:${$event.oldValue},
    //New Value: ${$event.newValue},
    //Checked Color: ${$event.starRating.checkedcolor},
    //Unchecked Color: ${$event.starRating.uncheckedcolor}`);
    this.service
      .ratingPelicula($event.newValue, _id)
      .subscribe((response) => console.log(response));
  }
}
