import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../constants/url';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
const USER_KEY='User';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject=new BehaviorSubject<User>(this.getUserFromLocalStorage());// . يتيح ذلك لمكونات التطبيق الاشتراك ومراقبة تغييرات معلومات المستخدم 
  public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastrService:ToastrService) {
    this.userObservable=this.userSubject.asObservable();
   }


   login(userLogin:IUserLogin):Observable<User>{
   return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
    tap({
      next:(user)=>{
        this.setUserToLocalStorage(user);
        this.userSubject.next(user)
        this.toastrService.success(
          'Welcome to Foodmine ${user.name}!',
          'Login Successful'
          )
      },
      error:(errorResponse)=>{
        this.toastrService.error(
          errorResponse.error,
          'Login Failed'
        )
      }
    })
   );

  }


  setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));

  }
  getUserFromLocalStorage():User{
  const userJson=  localStorage.getItem(USER_KEY);
  if(userJson) return JSON.parse(userJson) as User;

  
  return new User();
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
}
