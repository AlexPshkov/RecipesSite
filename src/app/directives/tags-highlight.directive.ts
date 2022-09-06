import {Directive, ElementRef, HostBinding, Input, OnChanges, SecurityContext, SimpleChanges} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Directive({
  selector: '[highlight]'
})
export class TagsHighlightDirective implements OnChanges {

  @Input("highlight") searchTerm: string | undefined;
  @Input() caseSensitive = false;
  @Input() customClasses = "";

  @HostBinding("innerHtml")
  content: string | undefined;

  constructor(private el: ElementRef, private sanitizer: DomSanitizer) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.el?.nativeElement) {
      if ("searchTerm" in changes || "caseSensitive" in changes) {
        const text = (this.el.nativeElement as HTMLElement).textContent;
        if (text == null) return;
        if (this.searchTerm === "") this.content = text;
        else {
          const regex = new RegExp(this.searchTerm!, this.caseSensitive ? "g" : "gi");
          const newText = text.replace(regex, (match: string) => {
            return `<mark class="highlight ${this.customClasses}">${match}</mark>`;
          });
          this.content = this.sanitizer.sanitize(SecurityContext.HTML, newText)!;
        }
      }
    }
  }

}
