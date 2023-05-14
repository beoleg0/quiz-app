import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Renderer2 } from '@angular/core';

@Directive({
	selector: '[appIsland]'
})
export class IslandDirective {

	constructor(
		private el: ElementRef,
		private renderer: Renderer2,
		@Inject(DOCUMENT) private document: Document
	) {
		this.applyIslandStyles();
	}

	applyIslandStyles(): void {
		const element: HTMLElement = this.el.nativeElement;
		this.renderer.addClass(element, 'island');
	}

}
