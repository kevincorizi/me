import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../app-routing.module';
import { SEOData, SEOService } from '../seo.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor(private readonly seo: SEOService) {}

  ngOnInit(): void {
    this.seo.setTags(ROUTES[0].data as SEOData);
  }
}
