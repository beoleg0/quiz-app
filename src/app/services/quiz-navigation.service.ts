import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionID, TOPIC } from '../models/quiz.model';
import { RoutesService } from './routes.service';

@Injectable({
	providedIn: 'root'
})
export class QuizNavigationService {

	constructor(
		private router: Router,
		private routesService: RoutesService
	) {
	}

	navigateToHome(): void {
		this.router.navigate(
			[this.routesService.home()]
		);
	}

	navigateThroughQuiz(
		topic: TOPIC,
		questionID: QuestionID
	): void {
		this.router.navigateByUrl(
			this.routesService.quizQuestion(topic, questionID)
		);
	}

	navigateToResults() {
		this.router.navigate(
			[this.routesService.quizResult()]
		);
	}

}