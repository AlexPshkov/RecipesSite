import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {domainUrl} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class ExternalHtmlService {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer) {
  }

  public getHtml(url: string): Observable<SafeHtml> {
    return this.http.get(domainUrl + url, { responseType: 'text'}).pipe(
      map((value) => this.sanitizer.bypassSecurityTrustHtml(value))
    );
  }
}
