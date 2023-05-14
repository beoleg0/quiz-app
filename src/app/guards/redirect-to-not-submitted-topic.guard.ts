import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QuizStoreService } from '../services/quiz-store.service';

export const redirectToNotSubmittedTopicGuard: CanActivateFn = (
	route,
	state
) => {
	const quizStoreService = inject(QuizStoreService);
	const router = inject(Router);

	return quizStoreService.quizzes$.pipe(
		take(1),
		map(quizzes => {
			if (!quizzes.length) return router.createUrlTree(['404']);

			const notSubmittedQuiz: Quiz = quizzes.find(quiz => !quiz.isSubmitted);
			return router.createUrlTree([
				'quiz',
				notSubmittedQuiz.topic,
				notSubmittedQuiz.questions[0].id
			]);
		})
	);
};
