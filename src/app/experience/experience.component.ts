import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EXPERIENCES } from '../model/data';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  experiences = EXPERIENCES;

  constructor(private readonly title: Title) {
    this.title.setTitle(`Kevin Corizi - Experience`);
  }
}
