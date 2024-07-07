import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-icon-profile',
  standalone: true,
  imports: [
    FormsModule,
    AvatarModule
    
  ],
  templateUrl: './icon-profile.component.html',
  styleUrl: './icon-profile.component.css'
})
export class IconProfileComponent {

  constructor() {}

  @Input() userName: string | undefined;
  @Input() email: string | undefined;

  // function - hash that create color profile

  getColor(name: string): string {
    
    const hash = name
      .split('')
      .reduce((acc, char) => char.codePointAt(0)! + ((acc << 5) - acc), 0);
    const colorValues = Array(3)
      .fill(0)
      .map((_, i) => (hash >> (i * 8)) & 0xff);
    const color = `#${colorValues
      .map((value) => ('00' + value.toString(16)).substr(-2))
      .join('')}`;
    return color;
  }

}
