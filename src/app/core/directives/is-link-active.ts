import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Directive({
  selector: '[appIsLinkActive]'
})
export class IsLinkActiveDirective implements OnInit {

  @Input() appIsLinkActive: string | undefined;

  constructor(
    private _elementRef: ElementRef,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._isActiveLink();
    this._router.events
      .pipe()
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this._isActiveLink();
        }
      });
  }

  private _isActiveLink(): void {
    const queryParamsIndex = this._router.url.indexOf('?');
    const baseUrl = queryParamsIndex === -1 ? this._router.url :
      this._router.url.slice(0, queryParamsIndex);

    if (baseUrl.includes(<string>this.appIsLinkActive)) {
      this._elementRef.nativeElement.classList.add('active');
    } else {
      this._elementRef.nativeElement.classList.remove('active');
    }
  }
}
