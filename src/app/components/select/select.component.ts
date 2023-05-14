import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface ISelectOption {
	name: string;
	value: any;
	disabled: boolean;
}

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {
	@Input({required: true}) options: ISelectOption[] = [];
	@Input() selectedValue!: any;
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

	ngOnInit(): void {
		if (!this.selectedValue) this.emit(this.options[0].value);
	}

	onValueChange(event: Event): void {
		this.emit((event.target as HTMLSelectElement).value);
	}

	emit(value: any): void {
		this.selectedValue = value;
		this.valueChange.next(this.selectedValue);
	}
}
