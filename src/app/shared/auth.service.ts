import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Simuler une "base de données" en mémoire
  private users: RegisterData[] = [];

  constructor() { }

  // Méthode pour s'inscrire
  register(data: RegisterData): Observable<any> {
    const exists = this.users.some(u => u.email === data.email);
    if (exists) {
      // Email déjà utilisé
      return throwError(() => new Error('Email déjà utilisé')).pipe(delay(1000));
    }
    this.users.push(data);
    return of({ message: 'Inscription réussie' }).pipe(delay(1000)); // délai pour simuler serveur
  }

  // Méthode pour se connecter
  login(data: LoginData): Observable<any> {
    const user = this.users.find(u => u.email === data.email && u.password === data.password);
    if (!user) {
      return throwError(() => new Error('Identifiants invalides')).pipe(delay(1000));
    }
    return of({ message: 'Connexion réussie', user }).pipe(delay(1000));
  }
}
