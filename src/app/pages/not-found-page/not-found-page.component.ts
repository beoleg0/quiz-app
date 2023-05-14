import { ChangeDetectionStrategy, Component } from '@angular/core';
import { QuizNavigationService } from '../../services/quiz-navigation.service';

@Component({
	selector: 'app-not-found-page',
	templateUrl: './not-found-page.component.html',
	styleUrls: ['./not-found-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundPageComponent {
	constructor(
		private quizNavigationService: QuizNavigationService
	) {
	}

	navigateToHome() {
		this.quizNavigationService.navigateToHome();
	}
}
