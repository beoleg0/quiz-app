import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, map, Observable, take } from 'rxjs';
import { ISelectOption } from '../../components/select/select.component';
import { IQuiz, Question, QuestionID, Quiz, TOPIC } from '../../models/quiz.model';
import { QuizNavigationService } from '../../services/quiz-navigation.service';
import { QuizStoreService } from '../../services/quiz-store.service';
import { IMakeAnswerEvent } from './question-card/question-card.component';

@Component({
	selector: 'app-quiz-page',
	templateUrl: './quiz-page.component.html',
	styleUrls: ['./quiz-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizPageComponent {

	topicsOptions$: Observable<ISelectOption[]> = this.quizStoreService.quizzes$
		.pipe(
			map(quizzes => Object.values(TOPIC).map(topic => ({
					name: topic,
					value: topic,
					disabled: quizzes.find(quiz => quiz.topic === topic)?.isSubmitted || false
				}))
			)
		);

	selectedTopic$: Observable<TOPIC> = this.route.paramMap
		.pipe(map((params: ParamMap) => (params.get('topic') as TOPIC)));
	currentQuestionID: Observable<QuestionID> = this.route.paramMap
		.pipe(map((params: ParamMap) => +(params.get('questionID') || 0)));
	quiz$: Observable<Quiz | undefined> = combineLatest([this.selectedTopic$, this.quizStoreService.quizzes$])
		.pipe(map(([topic, quizzes]) => quizzes.find(quiz => quiz.topic === topic)));


	constructor(
		public quizStoreService: QuizStoreService,
		private route: ActivatedRoute,
		private quizNavigationService: QuizNavigationService
	) {
	}

	selectTopic(topic: TOPIC): void {
		this.quizStoreService.quizzes$
			.pipe(take(1))
			.subscribe(quizzes => this.quizNavigationService.navigateThroughQuiz(
				topic,
				quizzes.find(quiz => quiz.topic === topic)?.questions[0].id || 0
			));
	}


	makeAnswer($event: IMakeAnswerEvent, topic: TOPIC): void {
		this.quizStoreService.makeAnswer(
			$event.questionId,
			$event.answerId,
			topic
		);
	}

	goPrevQuestion(questions: Question[]): void {
		const currentQuestionID: QuestionID = +(this.route.snapshot.paramMap.get('questionID') as string);
		const index: number = questions.findIndex(question => question.id === currentQuestionID);
		if (index === -1) return;

		const prevQuestionID: QuestionID = questions[index - 1]?.id;
		if (prevQuestionID === undefined) return;

		this.quizNavigationService.navigateThroughQuiz(
			this.route.snapshot.paramMap.get('topic') as TOPIC,
			prevQuestionID
		);
	}

	goNextQuestion(questions: Question[]): void {
		const currentQuestionID: QuestionID = +(this.route.snapshot.paramMap.get('questionID') as string);
		const index: number = questions.findIndex(question => question.id === currentQuestionID);
		if (index === -1) return;

		const nextQuestionID: QuestionID = questions[index + 1]?.id;
		if (nextQuestionID === undefined) return;

		this.quizNavigationService.navigateThroughQuiz(
			this.route.snapshot.paramMap.get('topic') as TOPIC,
			nextQuestionID
		);
	}

	submitQuiz(quiz: IQuiz): void {
		this.quizStoreService.markQuizAsSubmitted(quiz);

		this.quizStoreService.quizzes$
			.pipe(take(1))
			.subscribe(quizzes => {
				const quiz = quizzes.find(quiz => !quiz.isSubmitted);
				quiz
					? this.quizNavigationService.navigateThroughQuiz(quiz.topic, quiz.questions[0].id)
					: this.quizNavigationService.navigateToResults();
			});
	}

	submitAll(): void {
		this.quizStoreService.quizzes$
			.pipe(take(1))
			.subscribe(quizzes => {
				quizzes.forEach(quiz => this.quizStoreService.markQuizAsSubmitted(quiz));
				this.quizNavigationService.navigateToResults();
			});
	}
}
