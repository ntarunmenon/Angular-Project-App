import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
 
    constructor(private elRef: ElementRef, private renderer: Renderer2) { }

    @HostBinding('class.open') isOpen=false;

    @HostListener('click') click(eventData: Event){
        this.isOpen = !this.isOpen;
    }

    
}