import { Component, OnInit } from '@angular/core';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';

  constructor(private _flashMessagesService: FlashMessagesService) {}

  ngOnInit() {
    // 1st parameter is a flash message text
    // 2nd parameter is optional. You can pass object with options.
    //this._flashMessagesService.show('We are in about component!', { cssClass: 'alert-success', timeout: 1000 });
}

}



