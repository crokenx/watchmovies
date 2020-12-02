import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//componentes
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';
import { BuscadorComponent } from './componentes/buscador/buscador.component';
//Guardias
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [GuardGuard],
    children: [
      {
        path: '',
        redirectTo: 'formulario',
        pathMatch: 'full',
      },
      {
        path: 'formulario',
        component: FormularioComponent,
        canActivate: [GuardGuard],
      },
      {
        path: 'detalle/:id',
        component: DetalleComponent,
        canActivate: [GuardGuard],
      },
      {
        path: 'buscador/:pelicula',
        component: BuscadorComponent,
        canActivate: [GuardGuard],
      },
      { path: '**', redirectTo: 'home/formulario' }, // Wildcard route for a 404 page, Handler para colocar aqui un componente que hara el manejo de pagina no encontrada
    ],
  },
  { path: 'registro', component: RegistroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
