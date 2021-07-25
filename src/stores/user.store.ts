import { observable, action, makeObservable } from "mobx";

export class UserStore {
  public username = "";
  public email = "";

  constructor() {
    makeObservable(this, {
      username: observable,
      email: observable,
      setUser: action,
    });
  }

  public setUser(username: string, email: string): void {
    this.username = username;
    this.email = email;
  }
}
