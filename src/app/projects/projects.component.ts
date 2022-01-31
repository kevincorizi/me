import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../app-routing.module';
import { PROJECTS } from '../model/data';
import { SEOData, SEOService } from '../seo.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects = PROJECTS;

  constructor(private readonly seo: SEOService) {}

  ngOnInit(): void {
    this.seo.setTags(ROUTES[2].data as SEOData);
  }
}
