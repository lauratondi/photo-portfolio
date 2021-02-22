import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Admin } from '../../models/Admin';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
})
export class AdminsComponent implements OnInit {
  admins: Admin[] | any;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    return this.adminService.getAdmins().subscribe((admins) => {
      this.admins = admins;
      console.log(admins);
    });
  }
}
