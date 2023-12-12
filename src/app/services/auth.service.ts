import { Injectable } from '@angular/core';
import { User } from '../model/User.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*users: User[] = [{ "username": "admin", "password": "123", "roles": ['ADMIN'] },
  { "username": "cherine", "password": "123", "roles": ['USER'] }];*/

  public loggedUser!: string;
  public isloggedIn: Boolean = false;
  public roles!: string[];
  apiURL: string = 'http://localhost:8081/users';
  token!:string;
  private helper = new JwtHelperService();
  public regitredUser : User = new User();
  
  constructor(private router: Router,
    private http : HttpClient) { }

 


    
  login(user : User)
{
  return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
}
saveToken(jwt:string){
  localStorage.setItem('jwt',jwt);
  this.token = jwt;
  this.isloggedIn = true; 
  this.decodeJWT();

}
  logout() {
    this.loggedUser = undefined!;
    this.roles = undefined!;
    this.token= undefined!;
    this.isloggedIn = false;
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);

  }
  /*SignIn(user: User): Boolean {
    let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if (user.username == curUser.username && user.password == curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser', this.loggedUser);
        localStorage.setItem('isloggedIn', String(this.isloggedIn));
      }
    });
    return validUser;
  }*/
  isAdmin(): Boolean {
    if (!this.roles)
    return false;
    return this.roles.indexOf('ADMIN') >=0;
  }

  setLoggedUserFromLocalStorage(login : string) {
    this.loggedUser = login;
    this.isloggedIn = true;
    //this.getUserRoles(login);
    }
    /*getUserRoles(username :string){
    this.users.forEach((curUser) => {
    if( curUser.username == username ) {
    this.roles = curUser.roles;
    }
    });
    
}*/

 /*loadToken() {
  this.token = localStorage.getItem('jwt');
 }*/
 getToken():string {
  return this.token;
 }

 decodeJWT()
 { if (this.token == undefined)
  return;
 const decodedToken = this.helper.decodeToken(this.token);
 this.roles = decodedToken.roles;
 this.loggedUser = decodedToken.sub;
 }
loadToken() {
  this.token = localStorage.getItem('jwt')!;
  this.decodeJWT();
}
isTokenExpired(): Boolean
{
  return this.helper.isTokenExpired(this.token);
}

setRegistredUser(user: User) {
  this.regitredUser = user;
}
getRegistredUser(){
  return this.regitredUser;
}


isUser(): Boolean {
  if (!this.roles) return false;
  return this.roles.indexOf('USER') > -1;
}

getIsLoggedIn(): boolean {
  return JSON.parse(localStorage.getItem('isLoggedIn')!);
}
// getUserRoles(username :string){
//   this.users.forEach((curUser) => {
//     if( curUser.username == username ) {
//       this.roles = curUser.roles;
//     }
//   });
// }
registerUser(user :User){
  return this.http.post<User>(this.apiURL+'/register', user, {observe:'response'});
  }
  

// validateEmail(email : string,verifectioncode:number):Observable<any>{
// const data={email,verifectioncode};
// console.log(data);
// return this.http.post<User>(this.apiURL+'/verifyEmail/',data);
// }


validateEmail(code : string){
  return this.http.get<User>(this.apiURL+'/verifyEmail/'+code);
  }
  
isUserEnabledbled(username : string){
return this.http.get(this.apiURL+'/register/isenabled/'+ username);
}



}