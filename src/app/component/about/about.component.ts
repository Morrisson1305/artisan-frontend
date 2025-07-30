import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-about',
  imports: [CommonModule, FooterComponent, HeaderComponent],
   templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  services: string[] = [
    'Plumbing',
    'Electrical',
    'Painting',
    'Carpentry',
    'Cleaning',
    'Gardening',
    'Roofing',
    'Tiling',
    'Air Conditioning',
    'Security Systems',
    'Solar Installation',
    'Welding'
  ];

}
