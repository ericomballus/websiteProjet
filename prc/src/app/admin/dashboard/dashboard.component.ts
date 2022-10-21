import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { SaveRandomService } from 'src/app/services/save-random.service';
import { User } from 'src/app/models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterContentInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user!: User;
  constructor(
    private observer: BreakpointObserver,
    private saveRandom: SaveRandomService,
    private router: Router
  ) {}

  ngAfterContentInit() {
    if (!this.saveRandom.getUser()) {
      this.router.navigate(['/login']);
    }
    setTimeout(() => {
      this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
    }, 1500);
  }

  getUser() {}
}
