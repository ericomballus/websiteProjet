import { Injectable } from '@angular/core';
import { User } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class SaveRandomService {
  user!: User;
  constructor() {}

  setUser(data: User) {
    this.user = data;
  }

  getUser(): User {
    return this.user;
  }
}
