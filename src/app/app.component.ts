import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommitteeComponent } from './components/committee/committee.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import * as AOS from 'aos';

import { NgxSpinnerService } from 'ngx-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    SidebarComponent,
    CommitteeComponent,
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    NgxSpinnerModule
  ],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'ICST';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.showSpinner();

    if (isPlatformBrowser(this.platformId)) {
      AOS.init({
        duration: 2000
      });
    }
  }

  showSpinner() {
    this.spinner.show();

    // Hide the spinner after some time (3 seconds)
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
  }

  prepareRoute(outlet: any) {
    return outlet?.activatedRouteData?.['animation'];
  }
}