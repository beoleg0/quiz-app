import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { Quiz, TOPIC } from '../../models/quiz.model';
import { QuizNavigationService } from '../../services/quiz-navigation.service';
import { QuizStoreService } from '../../services/quiz-store.service';

export interface IResultStat {
	topic: TOPIC;
	questionsCount: number;
	correctCount: number;
}

@Component({
	selector: 'app-quiz-result-page',
	templateUrl: './quiz-result-page.component.html',
	styleUrls: ['./quiz-result-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizResultPageComponent {

	topicsStats$: Observable<IResultStat[]> = this.quizStoreService.quizzes$
		.pipe(
			map((quizzes: Quiz[]) => quizzes.map(quiz => ({
					topic: quiz.topic,
					correctCount: quiz.getTotalCorrect(),
					questionsCount: quiz.getQuestionCount()
				}))
			)
		);

	overallStats$: Observable<IResultStat> = this.topicsStats$
		.pipe(
			map((stats: IResultStat[]) => {
				return {
					topic: 'Overall' as TOPIC,
					questionsCount: stats.reduce((acc, stat) => acc + stat.questionsCount, 0),
					correctCount: stats.reduce((acc, stat) => acc + stat.correctCount, 0)
				};
			})
		);

	constructor(
		private quizStoreService: QuizStoreService,
		private quizNavigationService: QuizNavigationService
	) {
	}

	clearQuizzes(): void {
		this.quizStoreService.quizzes$
			.pipe(take(1))
			.subscribe((quizzes: Quiz[]) => {
				quizzes.forEach((quiz: Quiz) => this.quizStoreService.clearQuiz(quiz));
				const notSubmittedQuiz: Quiz = quizzes.find((quiz: Quiz) => !quiz.isSubmitted);
				this.quizNavigationService.navigateThroughQuiz(
					notSubmittedQuiz.topic,
					notSubmittedQuiz.questions[0].id
				);
			});
	}
}
