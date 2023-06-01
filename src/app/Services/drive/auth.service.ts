import { Injectable } from '@angular/core';
import { GoogleAuth, Credentials } from 'google-auth-library';
import { from, map, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: GoogleAuth;

  constructor() {
    // Crea una instancia de GoogleAuth con las credenciales de autenticación
    this.auth = new GoogleAuth({
      // ...
    });
  }

  getToken(): Observable<string> {
    const user$: Observable<Credentials> = from(
      this.auth.getCredentials().then(credentials => Credentials.create(credentials))
    );

    const token$: Observable<string> = user$.pipe(
      switchMap(credentials => from(credentials.refreshAccessToken())),
      map(authResponse => authResponse.access_token)
    );

    return token$;
  }
}
