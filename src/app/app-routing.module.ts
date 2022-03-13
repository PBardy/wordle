import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { HomeComponent } from './pages/home/home.component';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WordleComponent } from './pages/wordle/wordle.component';

const routes: Routes = [
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'wordle', pathMatch: 'full', component: WordleComponent },
  { path: '401', pathMatch: 'full', component: NotAuthorizedComponent },
  { path: '403', pathMatch: 'full', component: ForbiddenComponent },
  { path: '404', pathMatch: 'full', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
