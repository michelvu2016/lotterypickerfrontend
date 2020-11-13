import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { fromActions } from 'src/app/store';
import { AppUser } from '../../store/app-users/models/app-user.model';
import { AppUserService } from '../../store/app-users/services/app-user.service'

@Component({
  selector: 'app-app-admin',
  templateUrl: './app-admin.component.html',
  styleUrls: ['./app-admin.component.css']
})
export class AppAdminComponent implements OnInit {

   loggedOn = false;
   adminUser: AppUser;
   userLoading$ : Observable<boolean>;
   usersObs$ : Observable<AppUser[]>;


  constructor(private appUserService: AppUserService, private adminActionEventEffect: AdminActionListenerEffect) {
       this.usersObs$ = appUserService.entities$;
       this.userLoading$ = appUserService.loading$;
       console.log("[AppAdminComponent] constructor called");
       adminActionEventEffect.event$.subscribe((cmd) => {
          console.log("[AppAdminComponent] triggering adminRequest()");
          this.adminRequest();
       })
   }

  ngOnInit(): void {
    this.appUserService.changeState$.subscribe(() => {
       this.appUserService.getByKey('mvu').subscribe(appUser => {
          this.adminUser = appUser;
       });
    })

  }

  adminRequest() {
     if(!this.loggedOn) {
       this.appUserService.getWithQuery({'role': 'admin'}).subscribe((user) => {
        console.log("[AppAdminComponent] users found:", user);
          if(user.length === 1 && user[0].role === 'admin') {
             this.adminUser = user[0];
             this.loggedOn = true;
          } else {
            this.adminUser = null;
            this.loggedOn = false;
          }
          

       })
       
     }
  }

}


@Injectable()
export class AdminActionListenerEffect {

   event$ = new Subject<string>();

   constructor(private action$: Actions) {

   }

  adminAction$ = createEffect(() => this.action$.pipe(
    ofType(fromActions.adminRequestAction),
    tap({
       next: () => {
         console.log("[AdminActionListenerEffect] admin request action caught"); 
        this.event$.next('request')
       }
    })
  ), {dispatch: false});


}
