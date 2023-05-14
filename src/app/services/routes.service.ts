import { Injectable } from '@angular/core';
import { QuestionID, TOPIC } from '../models/quiz.model';

@Injectable({
	providedIn: 'root'
})
export class RoutesService {

	public static routes = {
		errors: {
			'404': '404'
		},
		home: '',
		quiz: {
			root: 'quiz',
			question: 'quiz/:topic/:questionID',
			result: 'result'
		}
	};

	constructor() {
	}

	home(): string {
		return `/${RoutesService.routes.home}`;
	}

	quiz(): string {
		return `/${RoutesService.routes.quiz.root}`;
	}

	quizQuestion(topic: TOPIC, questionID: QuestionID): string {
		return `/${RoutesService.routes.quiz.question
			.replace(':topic', topic)
			.replace(':questionID', questionID.toString())}`;
	}

	quizResult(): string {
		return `/${RoutesService.routes.quiz.result}`;
	}
}