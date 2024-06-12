import { Component } from '@angular/core';
// import  AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin';
  // ngOnInit() {
  //   AOS.init({disable: 'mobile'});//AOS - 2
  //   AOS.refresh();//refresh method is called on window resize and so on, as it doesn't require to build new store with AOS elements and should be as light as possible.
  // }
}
