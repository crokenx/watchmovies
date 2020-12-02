import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../servicios/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private params: ActivatedRoute,
    private http: HttpService
  ) {}

  ngOnInit(): void {}

  onChange(event: string) {
    this.router.navigate(['/home/buscador', event]);
  }
}
