import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SelectComponent } from './components/select/select.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { QuestionCardComponent } from './pages/quiz-page/question-card/question-card.component';
import { QuizPageComponent } from './pages/quiz-page/quiz-page.component';
import { QuizResultPageComponent } from './pages/quiz-result-page/quiz-result-page.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		NotFoundPageComponent,
		QuestionCardComponent,
		QuizPageComponent,
		QuizResultPageComponent,
		SelectComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		FormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
