import {Component, OnInit} from '@angular/core';
import {UserService} from '../shared/user/user.service';
import {GiphyService} from '../shared/giphy/giphy.service';
import {Router} from '@angular/router';
import {CarService} from '../shared/car/car.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: Array<any>;
  selectedOptions: string[] = [];
  cars: Array<any>;

  constructor(private carService: CarService, private router: Router, private userService: UserService, private giphyService: GiphyService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data['_embedded']['owners'];
      for (const user of this.users) {
        if (user.dni != null) {
          this.giphyService.get(user.name).subscribe(url => user.giphyUrl = url);
        }
      }
    });
  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }

  remove() {

    for (const href of this.selectedOptions) {
      this.userService.getHref(href).subscribe((user: any) => {
        if (user) {
          this.carService.removeOwner(user.dni);
        }
      });
      this.userService.remove(href).subscribe(result => {
        console.log(href);
      }, error => console.error(error));
    }
    this.router.navigate(['/menu']);
  }

}
