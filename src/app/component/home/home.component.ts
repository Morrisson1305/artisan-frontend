import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  services = [
    {
      icon: 'bx bx-paint',
      title: 'Painting',
      description: 'Interior & exterior painting services',
      price: 'From $50/hour',
      color: 'bg-blue',
    },
    {
      icon: 'bx bx-wrench',
      title: 'Plumbing',
      description: 'Repair, installation & maintenance',
      price: 'From $75/hour',
      color: 'bg-green',
    },
    {
      icon: 'bx bx-plug',
      title: 'Electrical',
      description: 'Wiring, fixtures & troubleshooting',
      price: 'From $80/hour',
      color: 'bg-orange',
    },
    {
      icon: 'bx bx-cog',
      title: 'Carpentry',
      description: 'Custom furniture & repairs',
      price: 'From $60/hour',
      color: 'bg-yellow',
    },
  ];
}
