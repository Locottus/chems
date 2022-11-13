import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  successLogin: boolean = false;
  hide: boolean = false;

  usr: string = "";
  pwd: string = "";

  errorLogin:boolean=true;
  errorMsg:string="";

  constructor(
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) { }

  ngOnInit() {

  }

  validar() {
    console.log('pressed validation');
    console.log(this.usr,this.pwd);
    //this.showError('credenciales incorrectas');
    //this.dialogRef.close();
  }

  showError(msg:string){
    this.errorLogin = false;
    this.errorMsg = msg;
    setTimeout(() => {
      this.errorLogin = true;
    }, 3000);
  }
}

