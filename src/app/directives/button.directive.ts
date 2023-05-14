import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
	selector: '[appButton]'
})
export class ButtonDirective implements OnChanges {

	@Input() display: 'block' | 'inline-block' = 'block';
	@Input() isActive = false;

	constructor(
		private el: ElementRef,
		private renderer: Renderer2
	) {
		this.applyButtonStyles();
	}


	ngOnChanges(changes: SimpleChanges): void {
		if (changes['isActive']) {
			this.applyButtonStyles();
		}
	}

	applyButtonStyles(): void {
		const element: HTMLButtonElement = this.el.nativeElement;

		this.renderer.addClass(element, 'btn');

		if (this.isActive) this.renderer.addClass(element, 'active');
		else this.renderer.removeClass(element, 'active');
	}

}
