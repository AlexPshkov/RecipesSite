import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ExternalHtmlService {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer) {

  }

  public getHtml(url: string): Observable<SafeHtml> {
    console.warn("USE GET HTML. WARN");
    return this.http.get("http://localhost:4200/" + url, { responseType: 'text'}).pipe(
      map((value) => this.sanitizer.bypassSecurityTrustHtml(value))
    );
  }
}
