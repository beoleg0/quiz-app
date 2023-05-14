import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QuizStoreService } from '../services/quiz-store.service';

export const resultsPageGuard: CanActivateFn = (
	route,
	state
) => {
	const quizStoreService = inject(QuizStoreService);
	const router = inject(Router);

	return quizStoreService.quizzes$.pipe(
		take(1),
		map((quizzes: Quiz[]) => {
			if (!quizzes.length) return router.createUrlTree(['404']);

			const isEveryQuizSubmitted: boolean = quizzes.every(quiz => quiz.isSubmitted);

			return isEveryQuizSubmitted
				? true
				: router.createUrlTree(['']);
		})
	);
};
