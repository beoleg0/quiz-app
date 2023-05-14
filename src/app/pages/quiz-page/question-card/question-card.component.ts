import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AnswerID, IQuestion } from '../../../models/quiz.model';

export interface IMakeAnswerEvent {
	questionId: number;
	answerId: AnswerID;
}

@Component({
	selector: 'app-question-card',
	templateUrl: './question-card.component.html',
	styleUrls: ['./question-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionCardComponent {

	@Input({required: true}) question!: IQuestion;
	@Input() index!: number;
	@Output() makeAnswer: EventEmitter<IMakeAnswerEvent> = new EventEmitter<IMakeAnswerEvent>();

	onAnswerMake(id: AnswerID): void {
		this.makeAnswer.emit({
			answerId: id,
			questionId: this.question.id
		});
	}
}
