// Classe de erro customizada para a aplicação
// Permite criar erros com mensagens e códigos de status HTTP específicos
// Facilita o tratamento centralizado de erros no middleware de erro do Express
export class AppError {
  // Mensagem de erro que será retornada ao cliente
  message: string
  
  // Código de status HTTP que será retornado na resposta
  // Exemplos: 400 (Bad Request), 404 (Not Found), 401 (Unauthorized), etc.
  statusCode: number

  // Construtor da classe AppError
  // message: mensagem descritiva do erro
  // statusCode: código HTTP do erro (padrão é 400 - Bad Request)
  // Quando um erro é lançado com throw new AppError(), o middleware de erro
  // no server.ts captura e retorna a resposta apropriada
  constructor(message: string, statusCode: number = 400){
    this.message = message
    this.statusCode = statusCode
  }
}