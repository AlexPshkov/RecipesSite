import {HttpErrorResponse} from "@angular/common/http";

export class ErrorMessages {

  /**
   * Converts HttpErrorResponse to text representation
   * @param error
   */
  public static getTextMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 401: return "Неправильный логин или пароль"
      case 409: return "Пользователь с таким логином уже существует"
      default: return "Внутренняя ошибка. Сообщите администрации"
    }
  }
}

