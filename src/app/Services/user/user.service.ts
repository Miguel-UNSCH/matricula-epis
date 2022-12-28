import { Injectable } from '@angular/core';

import { Auth, signInWithPopup, GoogleAuthProvider} from '@angular/fire/auth'

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afAuth : Auth, private route: Router) { }

  private Verify : boolean = true;

  esVerificado() : boolean{
    
    return this.Verify
  }

  VerificarUser(estado : boolean){
    this.Verify = estado
  }

  getCurrentUser(){
    return this.afAuth.currentUser
  }

  loginWhitGoogle(): Promise<any>{
    
      return signInWithPopup(this.afAuth, new GoogleAuthProvider() )
  }
       
  // async refreskToken(user: User ,token : AuthCredential): Promise<any>{
  //   try {
  //     return await reauthenticateWithCredential(user, token)
  //   } catch (error) {
  //     console.log(error, 'falló esta basura')
  //   }
  // }

  async logOut(){
    await this.afAuth.signOut()
    await localStorage.removeItem('407h')
    await this.route.navigate(['/'])
  }

  VerifiedEmail(email: any) : boolean {
    let verifiedText = ''
    let dominioEscuela = '27@unsch.edu.pe'

    if (email !== undefined){
      let activate = false
      for(let pos = 0; pos < email.length; pos++){
        if (email[pos] == '@'){
          verifiedText += email[pos-2] + email[pos-1]
          activate = true
        }
        if (activate){
          verifiedText += email[pos]
    }
  }
    }
    return verifiedText == dominioEscuela
  }
}
