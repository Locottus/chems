import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pwd-validation',
  templateUrl: './pwd-validation.component.html',
  styleUrls: ['./pwd-validation.component.css']
})
export class PwdValidationComponent implements OnInit {

  hasNumber: boolean = false;
  hasCapital: boolean = false;
  hasChar: boolean = false;
  hasLower: boolean = false;

  
  constructor() { }

  ngOnInit(): void {
  }

}
