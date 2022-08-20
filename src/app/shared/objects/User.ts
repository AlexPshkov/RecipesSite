export class User {
  id: string | null;
  userName: string;
  password: string;
  login: string;
  description: string;
  role: string;

  constructor(id: string, userName: string, password: string, login: string, description: string, role: string) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.login = login;
    this.description = description;
    this.role = role;
  }
}
