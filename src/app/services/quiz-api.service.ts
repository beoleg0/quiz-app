import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { IResponse } from '../models/api.model';
import { IQuestion, Question } from '../models/quiz.model';

@Injectable({
	providedIn: 'root'
})
export class QuizApiService {

	constructor(
		private http: HttpClient
	) {
	}

	getAngularQuestions(): Observable<IQuestion[]> {
		return this.http.get<IResponse<IQuestion[]>>('assets/db/angular-quiz.db.json')
			.pipe(
				map((response: IResponse<IQuestion[]>) => {
					return response.data
						.map(q => new Question(q))
						.sort((a, b) => a.id - b.id);
				}),
				shareReplay()
			);
	}

	getJavaQuestions(): Observable<IQuestion[]> {
		return this.http.get<IResponse<IQuestion[]>>('assets/db/java-quiz.db.json')
			.pipe(
				map((response: IResponse<IQuestion[]>) => {
					return response.data
						.map(q => new Question(q))
						.sort((a, b) => a.id - b.id);
				}),
				shareReplay()
			);
	}

	getDesignPatternsQuestions(): Observable<IQuestion[]> {
		return this.http.get<IResponse<IQuestion[]>>('assets/db/design-patterns-quiz.db.json')
			.pipe(
				map((response: IResponse<IQuestion[]>) => {
					return response.data
						.map(q => new Question(q))
						.sort((a, b) => a.id - b.id);
				}),
				shareReplay()
			);
	}
}
