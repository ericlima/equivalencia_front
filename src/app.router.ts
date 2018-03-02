import { IesComponent } from './components/ies/ies.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/ies', pathMatch: 'full' },
    { path: 'ies', component: IesComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'disciplinas', component: DisciplinasComponent }
];
export const RoutingModule = RouterModule.forRoot(routes);
