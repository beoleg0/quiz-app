import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { redirectToNotSubmittedTopicGuard } from './guards/redirect-to-not-submitted-topic.guard';
import { resultsPageGuard } from './guards/results-page.guard';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { QuizResultPageComponent } from './pages/quiz-result-page/quiz-result-page.component';
import { RoutesService } from './services/routes.service';

const routes: Routes = [
	{
		path: RoutesService.routes.home,
		redirectTo: RoutesService.routes.quiz.root,
		pathMatch: 'full'
	},
	{
		path: RoutesService.routes.quiz.root,
		canActivate: [redirectToNotSubmittedTopicGuard],
		component: QuizPageComponent
	},
	{
		path: RoutesService.routes.quiz.question,
		component: QuizPageComponent
	},
	{
		path: RoutesService.routes.quiz.result,
		canActivate: [resultsPageGuard],
		component: QuizResultPageComponent
	},
	{
		path: RoutesService.routes.errors['404'],
		component: NotFoundPageComponent
	},
	{
		path: '**',
		redirectTo: RoutesService.routes.errors['404']
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
