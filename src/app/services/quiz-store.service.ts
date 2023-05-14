import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, filter, forkJoin, Observable } from 'rxjs';
import { AnswerID, IQuiz, QuestionID, Quiz, TOPIC } from '../models/quiz.model';
import { QuizApiService } from './quiz-api.service';

@Injectable({
	providedIn: 'root'
})
export class QuizStoreService {

	private _quizzes$$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);
	quizzes$ = this._quizzes$$
		.pipe(filter((quizzes: Quiz[]) => !!quizzes.length)) as Observable<Quiz[]>;

	constructor(
		private quizApiService: QuizApiService,
	) {
		this.fillQuizzes();
	}

	private fillQuizzes(): void {
		forkJoin([
			this.quizApiService.getAngularQuestions(),
			this.quizApiService.getJavaQuestions(),
			this.quizApiService.getDesignPatternsQuestions()
		])
			.subscribe((data) => {
				const newQuizzes = this._quizzes$$.getValue();
				data.forEach(questions => {
					newQuizzes.push(new Quiz({
						topic: questions[0].topic,
						questions
					}));
				});
				this._quizzes$$.next(newQuizzes);
			});
	}

	makeAnswer(questionId: QuestionID, answerId: AnswerID, topic: TOPIC): void {
		const quizzes: Quiz[] = this._quizzes$$.getValue();
		const quizToUpdateIndex: number = quizzes.findIndex(quiz => quiz.topic === topic);
		if (quizToUpdateIndex === -1) return;

		const quizToUpdate: Quiz = quizzes[quizToUpdateIndex];
		const questionToUpdateIndex = quizToUpdate.questions.findIndex(question => question.id === questionId);
		if (questionToUpdateIndex === -1) return;

		const questionToUpdate = quizToUpdate.questions[questionToUpdateIndex];
		questionToUpdate.makeAnswer(answerId);
		quizToUpdate.questions.splice(questionToUpdateIndex, 1, questionToUpdate);
		quizzes.splice(quizToUpdateIndex, 1, quizToUpdate);
		this._quizzes$$.next(quizzes);
	}

	markQuizAsSubmitted(quiz: IQuiz): void {
		const quizzes: Quiz[] = this._quizzes$$.getValue();
		const quizToUpdateIndex: number = quizzes.findIndex(q => q.topic === quiz.topic);
		if (quizToUpdateIndex === -1) return;

		const quizToUpdate: Quiz = quizzes[quizToUpdateIndex];
		quizToUpdate.markAsSubmitted();
		quizzes.splice(quizToUpdateIndex, 1, quizToUpdate);
		this._quizzes$$.next(quizzes);
	}

	clearQuiz(quiz: IQuiz): void {
		const quizzes: Quiz[] = this._quizzes$$.getValue();
		const quizToUpdateIndex: number = quizzes.findIndex(q => q.topic === quiz.topic);
		if (quizToUpdateIndex === -1) return;

		const quizToUpdate: Quiz = quizzes[quizToUpdateIndex];
		quizToUpdate.questions.forEach(question => question.clearAnswer());
		quizToUpdate.markAsNotSubmitted();
		quizzes.splice(quizToUpdateIndex, 1, quizToUpdate);
		this._quizzes$$.next(quizzes);
	}
}