export enum TOPIC {
	DESIGN_PATTERNS = 'Design Patterns',
	ANGULAR = 'Angular',
	JAVA = 'Java',
}

export type QuestionID = number;
export type AnswerID = number;

export interface IQuestion {
	id: QuestionID;
	question: string;
	answers: IAnswer[];
	correct: AnswerID;
	topic: TOPIC;
	selectedAnswer?: AnswerID;
}

export interface IQuestionMethods {
	makeAnswer: (answerID: AnswerID) => void;
	clearAnswer: () => void;
}

export class Question implements IQuestion, IQuestionMethods {
	id!: number;
	question!: string;
	answers!: IAnswer[];
	correct!: AnswerID;
	topic!: TOPIC;
	selectedAnswer?: AnswerID;

	constructor(partial: Partial<IQuestion>) {
		Object.assign(this, partial);
	}

	makeAnswer(answerID: AnswerID): void {
		this.selectedAnswer = answerID;
	}

	clearAnswer(): void {
		this.selectedAnswer = null;
	}
}

export interface IAnswer {
	answer: string;
	id: AnswerID;
}

export interface IQuiz {
	topic: TOPIC;
	questions: IQuestion[];
	isSubmitted: boolean;
}

export interface IQuizMethods {
	markAsSubmitted: () => void;
	markAsNotSubmitted: () => void;
	getTotalCorrect: () => number;
	getQuestionCount: () => number;
}

export class Quiz implements IQuiz, IQuizMethods {
	topic!: TOPIC;
	questions: Question[] = [];
	isSubmitted: boolean = false;

	constructor(partial: Partial<IQuiz>) {
		Object.assign(this, partial);
	}

	markAsSubmitted(): void {
		this.isSubmitted = true;
	}

	markAsNotSubmitted(): void {
		this.isSubmitted = false;
	}

	getTotalCorrect(): number {
		return this.questions.reduce((acc: number, question: IQuestion) => {
			if (question.correct === question.selectedAnswer) acc++;
			return acc;
		}, 0);
	}

	getQuestionCount(): number {
		return this.questions.length;
	}
}