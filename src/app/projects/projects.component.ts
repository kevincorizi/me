import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PROJECTS } from '../model/data';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  projects = PROJECTS;

  constructor(private readonly title: Title) {
    this.title.setTitle(`${this.title.getTitle()} - Projects`);
  }
}
