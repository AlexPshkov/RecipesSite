export class User {
  id: string | null;
  userName: string | null;
  login: string;
  description: string;
  role: string;

  constructor(id: string, userName: string, login: string, description: string, role: string) {
    this.id = id;
    this.userName = userName;
    this.login = login;
    this.description = description;
    this.role = role;
  }
}
