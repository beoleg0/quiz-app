import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionID, TOPIC } from '../models/quiz.model';

@Injectable({
	providedIn: 'root'
})
export class QuizNavigationService {

	constructor(private router: Router) {
	}

	navigateThroughQuiz(
		topic: TOPIC,
		questionID: QuestionID
	): void {
		this.router.navigate(['quiz', topic, questionID]);
	}

	navigateToResults() {
		this.router.navigate(['result']);
	}

}