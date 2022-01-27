import { Component } from '@angular/core';
import { EXPERIENCES } from '../model/data';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent {
  experiences = EXPERIENCES;
}
