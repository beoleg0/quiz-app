import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectToNotSubmittedTopicGuard } from './guards/redirect-to-not-submitted-topic.guard';
import { resultsPageGuard } from './guards/results-page.guard';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { QuizResultPageComponent } from './pages/quiz-result-page/quiz-result-page.component';

const routes: Routes = [
	{path: '', redirectTo: 'quiz', pathMatch: 'full'},
	{path: 'quiz', canActivate: [redirectToNotSubmittedTopicGuard], component: QuizPageComponent},
	{path: 'quiz/:topic/:questionID', component: QuizPageComponent},
	{path: 'result', canActivate: [resultsPageGuard], component: QuizResultPageComponent},
	{path: '404', component: NotFoundPageComponent},
	{path: '**', redirectTo: '404'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
