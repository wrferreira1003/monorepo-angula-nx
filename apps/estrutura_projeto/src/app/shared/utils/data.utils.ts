export class DataUtils {
  // static para nao precisar instanciar a classe
  static formatDate(date: Date) {
    return date.toLocaleDateString('pt-BR');
  }
}
