import { Component, OnDestroy, OnInit } from '@angular/core';
import { Data, Router, RoutesRecognized } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { ROUTES } from './app-routing.module';
import { SEOService } from './seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  routes = ROUTES;

  private readonly sub: Subscription = new Subscription();

  constructor(
    private readonly seo: SEOService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.sub.add(
      this.router.events
        .pipe(
          filter((event: any) => event instanceof RoutesRecognized),
          map((event: RoutesRecognized) => event?.state?.root?.firstChild?.data)
        )
        .subscribe((data) => {
          if (data) {
            this.seo.setTitle(data['title']);
            this.seo.setDescription(data['description']);
            this.seo.setKeywords(data['keywords']);
            this.seo.setOgTitle(data['ogTitle']);
            this.seo.setOgSiteName(data['ogSiteName']);
            this.seo.setOgUrl(data['canonical']);
            this.seo.setOgDescription(data['description']);
            this.seo.setCanonical(data['canonical']);
          }
        })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
