import { map } from 'rxjs/operators';
import { RolesModalComponent } from './../roles-modal/roles-modal.component';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;
  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }

  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe((users: User[]) => {
      this.users = users;
    }, error => {
      console.log(error);
    });
  }

  editRolesModal(user: User) {
    const initialState = {
     user,
     roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate =  {
        roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate){
        this.adminService.updateUserRoles(user,rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.roleNames];
        }, error => {
          console.log(error);
        });
      }
    });
  }

  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
        {name: 'Admin', value: 'Admin'},
        {name: 'Moderator', value: 'Moderator'},
        {name: 'Member', value: 'Member'},
        {name: 'VIP', value: 'VIP'},
    ];

    for (const availableRole of availableRoles) {
      let isMatch = false;
      for (const userRole of userRoles){
        if (availableRole.name === userRole){
          isMatch = true;
          availableRole.checked = true;
          roles.push(availableRole);
        }
      }
      if (!isMatch){
        availableRole.checked = false;
        roles.push(availableRole);
      }
    }

    return roles;
  }

}
