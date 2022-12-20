import { Injectable } from '@angular/core';

import { Auth, signInWithPopup, GoogleAuthProvider, signInWithCredential } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afAuth : Auth) { }

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

  async refreskToken(token : any): Promise<any>{
    try {
      return await signInWithCredential(this.afAuth, token)
    } catch (error) {
      console.log(error)
    }
  }

  logOut(){
    this.afAuth.signOut()
  }
}
