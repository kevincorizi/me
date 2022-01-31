import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../app-routing.module';
import { EXPERIENCES } from '../model/data';
import { SEOData, SEOService } from '../seo.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experiences = EXPERIENCES;

  constructor(private readonly seo: SEOService) {}

  ngOnInit(): void {
    this.seo.setTags(ROUTES[1].data as SEOData);
  }
}
