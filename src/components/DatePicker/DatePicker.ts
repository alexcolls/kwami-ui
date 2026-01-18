import { Component } from '../../core/Component';
import './DatePicker.css';

export interface DatePickerProps {
    /** Initial selected date */
    defaultDate?: Date;
    /** Minimum selectable date */
    minDate?: Date;
    /** Maximum selectable date */
    maxDate?: Date;
    /** First day of week (0 = Sunday, 1 = Monday, etc.) */
    firstDayOfWeek?: number;
    /** Callback when date changes */
    onChange?: (date: Date) => void;
    /** Label for the date picker */
    label?: string;
    /** Locale for date formatting */
    locale?: string;
    /** Placeholder text when no date selected */
    placeholder?: string;
    /** Popup direction */
    popupDirection?: 'up' | 'down';
}

export class DatePicker extends Component<DatePickerProps> {
    private currentMonth: Date;
    private selectedDate: Date | null = null;
    private isOpen = false;
    
    // DOM references
    private trigger: HTMLButtonElement | null = null;
    private popup: HTMLElement | null = null;
    private monthLabel: HTMLElement | null = null;
    private daysGrid: HTMLElement | null = null;
    private prevBtn: HTMLButtonElement | null = null;
    private nextBtn: HTMLButtonElement | null = null;
    private valueDisplay: HTMLElement | null = null;

    constructor(props: DatePickerProps = {}) {
        super(props);
        const { defaultDate } = props;
        
        if (defaultDate) {
            this.selectedDate = new Date(defaultDate);
            this.currentMonth = new Date(defaultDate.getFullYear(), defaultDate.getMonth(), 1);
        } else {
            this.currentMonth = new Date();
            this.currentMonth.setDate(1);
        }
    }

    render(): string {
        const { label, placeholder = 'Select date', popupDirection = 'up' } = this.props;
        const popupClass = popupDirection === 'down' ? 'kwami-datepicker-popup-down' : '';
        const displayValue = this.selectedDate ? this.formatDate(this.selectedDate) : placeholder;
        
        return `
            <div class="kwami-datepicker-container" data-kwami-id="${this.id}">
                ${label ? `<span class="kwami-datepicker-label">${label}</span>` : ''}
                <div class="kwami-datepicker">
                    <button class="kwami-datepicker-trigger" aria-label="Pick a date" title="Pick a date">
                        <span class="kwami-datepicker-value">${displayValue}</span>
                        <iconify-icon icon="solar:calendar-linear" width="16" height="16"></iconify-icon>
                    </button>
                    <div class="kwami-datepicker-popup ${popupClass}">
                        <div class="kwami-datepicker-header">
                            <button class="kwami-datepicker-nav kwami-datepicker-prev" aria-label="Previous month">
                                <iconify-icon icon="solar:alt-arrow-left-linear" width="18" height="18"></iconify-icon>
                            </button>
                            <span class="kwami-datepicker-month-label"></span>
                            <button class="kwami-datepicker-nav kwami-datepicker-next" aria-label="Next month">
                                <iconify-icon icon="solar:alt-arrow-right-linear" width="18" height="18"></iconify-icon>
                            </button>
                        </div>
                        <div class="kwami-datepicker-weekdays">
                            ${this.renderWeekdays()}
                        </div>
                        <div class="kwami-datepicker-days"></div>
                    </div>
                </div>
            </div>
        `;
    }

    private formatDate(date: Date): string {
        const { locale = 'en-US' } = this.props;
        return date.toLocaleDateString(locale, { 
            day: 'numeric',
            month: 'short', 
            year: 'numeric' 
        });
    }

    private renderWeekdays(): string {
        const { firstDayOfWeek = 0, locale = 'en-US' } = this.props;
        const weekdays: string[] = [];
        const baseDate = new Date(2024, 0, 7); // A known Sunday
        
        for (let i = 0; i < 7; i++) {
            const dayIndex = (firstDayOfWeek + i) % 7;
            const date = new Date(baseDate);
            date.setDate(date.getDate() + dayIndex);
            weekdays.push(date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 2));
        }
        
        return weekdays.map(day => `<span class="kwami-datepicker-weekday">${day}</span>`).join('');
    }

    protected onHydrate(): void {
        if (!this.element) return;

        this.trigger = this.element.querySelector('.kwami-datepicker-trigger');
        this.popup = this.element.querySelector('.kwami-datepicker-popup');
        this.monthLabel = this.element.querySelector('.kwami-datepicker-month-label');
        this.daysGrid = this.element.querySelector('.kwami-datepicker-days');
        this.prevBtn = this.element.querySelector('.kwami-datepicker-prev');
        this.nextBtn = this.element.querySelector('.kwami-datepicker-next');
        this.valueDisplay = this.element.querySelector('.kwami-datepicker-value');

        if (!this.trigger || !this.popup || !this.monthLabel || !this.daysGrid || 
            !this.prevBtn || !this.nextBtn || !this.valueDisplay) return;

        this.setupEventListeners();
        this.renderMonth();
    }

    private setupEventListeners(): void {
        if (!this.trigger || !this.prevBtn || !this.nextBtn || !this.daysGrid || !this.popup) return;

        // Toggle popup
        this.addListener(this.trigger, 'click', (e) => {
            e.stopPropagation();
            this.togglePopup();
        });

        // Navigation
        this.addListener(this.prevBtn, 'click', (e) => {
            e.stopPropagation();
            this.navigateMonth(-1);
        });
        this.addListener(this.nextBtn, 'click', (e) => {
            e.stopPropagation();
            this.navigateMonth(1);
        });
        
        // Day selection
        this.addListener(this.daysGrid, 'click', (e) => {
            e.stopPropagation();
            const target = e.target as HTMLElement;
            const dayBtn = target.closest('.kwami-datepicker-day:not(.disabled):not(.outside)') as HTMLElement;
            
            if (dayBtn) {
                const day = parseInt(dayBtn.dataset.day || '0');
                if (day > 0) {
                    this.selectDate(day);
                }
            }
        });

        // Close on outside click
        const outsideClickHandler = (e: Event) => {
            if (this.isOpen && !this.element?.contains(e.target as Node)) {
                this.closePopup();
            }
        };
        document.addEventListener('click', outsideClickHandler);

        // Close on ESC
        const escHandler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closePopup();
            }
        };
        document.addEventListener('keydown', escHandler as EventListener);
    }

    private togglePopup(): void {
        this.isOpen = !this.isOpen;
        this.popup?.classList.toggle('active', this.isOpen);
        this.element?.querySelector('.kwami-datepicker')?.classList.toggle('active', this.isOpen);
    }

    private closePopup(): void {
        this.isOpen = false;
        this.popup?.classList.remove('active');
        this.element?.querySelector('.kwami-datepicker')?.classList.remove('active');
    }

    private navigateMonth(direction: number): void {
        this.currentMonth.setMonth(this.currentMonth.getMonth() + direction);
        this.renderMonth();
    }

    private renderMonth(): void {
        if (!this.monthLabel || !this.daysGrid) return;

        const { locale = 'en-US' } = this.props;
        
        // Update month label
        this.monthLabel.textContent = this.currentMonth.toLocaleDateString(locale, { 
            month: 'long', 
            year: 'numeric' 
        });

        // Generate days
        const days = this.generateDays();
        this.daysGrid.innerHTML = days;
    }

    private generateDays(): string {
        const { firstDayOfWeek = 0, minDate, maxDate } = this.props;
        
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        
        // Get first day of month and days in month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        
        // Get day of week for first day (adjusted for firstDayOfWeek)
        let startDayOfWeek = firstDay.getDay() - firstDayOfWeek;
        if (startDayOfWeek < 0) startDayOfWeek += 7;
        
        // Get days from previous month
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        
        const days: string[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Previous month days
        for (let i = startDayOfWeek - 1; i >= 0; i--) {
            const day = prevMonthLastDay - i;
            days.push(`<button class="kwami-datepicker-day outside" disabled>${day}</button>`);
        }
        
        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const classes: string[] = ['kwami-datepicker-day'];
            let disabled = false;
            
            // Check if today
            if (date.getTime() === today.getTime()) {
                classes.push('today');
            }
            
            // Check if selected
            if (this.selectedDate && 
                date.getFullYear() === this.selectedDate.getFullYear() &&
                date.getMonth() === this.selectedDate.getMonth() &&
                date.getDate() === this.selectedDate.getDate()) {
                classes.push('selected');
            }
            
            // Check min/max dates
            if (minDate && date < minDate) {
                classes.push('disabled');
                disabled = true;
            }
            if (maxDate && date > maxDate) {
                classes.push('disabled');
                disabled = true;
            }
            
            days.push(`<button class="${classes.join(' ')}" data-day="${day}"${disabled ? ' disabled' : ''}>${day}</button>`);
        }
        
        // Next month days (fill remaining slots to complete grid)
        const totalSlots = Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7;
        const remainingSlots = totalSlots - (startDayOfWeek + daysInMonth);
        
        for (let i = 1; i <= remainingSlots; i++) {
            days.push(`<button class="kwami-datepicker-day outside" disabled>${i}</button>`);
        }
        
        return days.join('');
    }

    private selectDate(day: number): void {
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        
        this.selectedDate = new Date(year, month, day);
        this.renderMonth();
        
        // Update trigger display
        if (this.valueDisplay) {
            this.valueDisplay.textContent = this.formatDate(this.selectedDate);
        }

        // Close popup after selection
        this.closePopup();
        
        // Dispatch custom event
        this.element?.dispatchEvent(new CustomEvent('datechange', {
            detail: { date: new Date(this.selectedDate) },
            bubbles: true
        }));
        
        // Call onChange callback
        if (this.props.onChange) {
            this.props.onChange(new Date(this.selectedDate));
        }
    }

    /** Get the currently selected date */
    getDate(): Date | null {
        return this.selectedDate ? new Date(this.selectedDate) : null;
    }

    /** Set the date programmatically */
    setDate(date: Date): void {
        this.selectedDate = new Date(date);
        this.currentMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        this.renderMonth();
        
        if (this.valueDisplay) {
            this.valueDisplay.textContent = this.formatDate(this.selectedDate);
        }
    }

    /** Clear the selected date */
    clear(): void {
        this.selectedDate = null;
        this.renderMonth();
        
        if (this.valueDisplay) {
            this.valueDisplay.textContent = this.props.placeholder || 'Select date';
        }
    }

    /** Navigate to a specific month */
    goToMonth(year: number, month: number): void {
        this.currentMonth = new Date(year, month, 1);
        this.renderMonth();
    }
}
