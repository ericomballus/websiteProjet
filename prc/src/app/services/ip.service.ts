import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  constructor(private http: HttpClient) {}

  getUserIpAddress() {
    let url =
      'https://ipgeolocation.abstractapi.com/v1/?api_key=cca5b3d71efc4ff1b1c6d7907ac79fba';
    return this.http.get(url);
  }
}
