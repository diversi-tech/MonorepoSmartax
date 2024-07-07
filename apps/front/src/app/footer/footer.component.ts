import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Footer } from 'primeng/api';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: true,
    imports: [Footer, RouterLink]
})
export class FooterComponent { }
