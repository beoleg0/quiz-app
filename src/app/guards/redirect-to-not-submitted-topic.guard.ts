import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QuizStoreService } from '../services/quiz-store.service';
import { RoutesService } from '../services/routes.service';

export const redirectToNotSubmittedTopicGuard: CanActivateFn = (
	route,
	state
) => {
	const quizStoreService = inject(QuizStoreService);
	const router = inject(Router);
	const routesService = inject(RoutesService);

	return quizStoreService.quizzes$.pipe(
		take(1),
		map(quizzes => {
			if (!quizzes.length) return router.createUrlTree([RoutesService.routes.errors['404']]);

			const notSubmittedQuiz: Quiz = quizzes.find(quiz => !quiz.isSubmitted);
			return router.createUrlTree([
				routesService.quizQuestion(
					notSubmittedQuiz.topic,
					notSubmittedQuiz.questions[0].id
				)
			]);
		})
	);
};
