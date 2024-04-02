import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../service/users.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-check-registration-link',
  standalone: true,
  imports: [],
  template:`
  <h2>Checking if registration linkiz valid...</h2>
  `,
  styleUrl: './check-registration-link.component.scss'
})
export class CheckRegistrationLinkComponent implements OnInit{
  constructor(private activatedRoute: ActivatedRoute, private usersService:UsersService,private router:Router) {}
  isValid = false;
  ngOnInit(): void {
    let queryToken = '';
    let email = '';
    this.activatedRoute.queryParams.subscribe(params=>{
      queryToken = params["token"],
      email = params["email"],
      this.usersService.regMail = email;
    });
    this.usersService.isLinkValid(queryToken,email).pipe(catchError(()=>{
      this.router.navigate(['/account']);
      return of(false);
    })).subscribe(x=>{
      this.isValid = x;
      if(this.isValid){
        this.router.navigate(['/account/register']);
      }else{
        this.router.navigate(['/account']);
      }
    });
  }

}
