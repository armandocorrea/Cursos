import { Usuario } from './usuario';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  }

  fazerLogin() {
    this.authService.fazerLogin(this.usuario);
  }

}
