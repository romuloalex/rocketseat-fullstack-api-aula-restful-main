// Importa os tipos necessários do Express para tipagem TypeScript
// NextFunction: função que passa o controle para o próximo middleware na cadeia
import type { NextFunction, Request, Response } from "express";

// Middleware customizado que adiciona informações à requisição
// Middlewares são funções que executam entre a requisição e a resposta final
// Podem modificar request/response, executar código, ou encerrar o ciclo da requisição
export function myMiddleware(request: Request, response: Response, next: NextFunction){
  // Adiciona uma propriedade user_id ao objeto request
  // Esta propriedade estará disponível em todos os handlers de rota que vierem depois
  // Em uma aplicação real, aqui seria feita a autenticação e extração do ID do token JWT
  // Por enquanto, está hardcoded como exemplo
  request.user_id = '123456'
  
  // Log para debug - mostra que o middleware foi executado
  console.log("Passou pelo middleware!")

  // Chama next() para passar o controle para o próximo middleware ou handler de rota
  // Se next() não for chamado, a requisição ficará "travada" e nunca chegará ao controller
  // Se houver erro, pode chamar next(error) para passar o erro ao middleware de tratamento
  return next()
}