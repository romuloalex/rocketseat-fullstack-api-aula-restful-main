// Importa o Express e os tipos necessários para tipagem TypeScript
// Request: representa a requisição HTTP recebida
// Response: representa a resposta HTTP que será enviada
// NextFunction: função usada para passar controle para o próximo middleware
import express, { Request, Response, NextFunction } from "express";

// Importa ZodError da biblioteca Zod
// ZodError é lançado quando a validação de dados falha usando schemas Zod
import { ZodError } from "zod";

// Importa o objeto routes que contém todas as rotas da aplicação
// Este arquivo centraliza o registro de todas as rotas da API
import { routes } from "./routes";

// Importa a classe AppError, que é uma classe de erro customizada
// Usada para criar erros com status HTTP e mensagens específicas da aplicação
import { AppError } from "./utils/app-error";

// Define a porta onde o servidor HTTP irá escutar requisições
// Por padrão, o servidor ficará disponível em http://localhost:3333
const PORT = 3333;

// Cria uma instância do Express, que será nossa aplicação servidor
// Esta instância gerencia todas as rotas, middlewares e configurações do servidor
const app = express();

// Middleware global que faz o parse automático do corpo das requisições HTTP
// Quando uma requisição tem Content-Type: application/json, este middleware
// converte o JSON do body em um objeto JavaScript acessível via request.body
// Deve ser registrado antes das rotas para que o body esteja disponível nos handlers
app.use(express.json());

// Registra todas as rotas da aplicação no servidor Express
// As rotas definidas no arquivo routes/index.ts ficam disponíveis para receber requisições
// Este middleware direciona as requisições para os controllers apropriados
app.use(routes);

// Middleware de tratamento de erros global
// IMPORTANTE: Este middleware DEVE ser o último middleware registrado
// O Express identifica um middleware de erro pela assinatura com 4 parâmetros (error, req, res, next)
// Quando qualquer erro é lançado em qualquer middleware ou rota anterior, ele é capturado aqui
app.use((error: any, request: Request, response: Response, _: NextFunction) => {
  // Verifica se o erro é uma instância de AppError (erro customizado da aplicação)
  // AppError contém statusCode e message definidos pela aplicação
  if (error instanceof AppError) {
    // Retorna uma resposta JSON com o status HTTP específico do erro
    // e a mensagem de erro definida na classe AppError
    response.status(error.statusCode).json({ message: error.message });
    return; // Interrompe a execução para evitar enviar múltiplas respostas
  }

  // Verifica se o erro é uma instância de ZodError (erro de validação do Zod)
  // ZodError ocorre quando dados não passam na validação de schemas Zod
  if (error instanceof ZodError) {
    // Retorna status 400 (Bad Request) indicando erro de validação
    // Inclui a mensagem padrão e os detalhes formatados dos erros de validação
    // error.format() retorna um objeto estruturado com todos os campos que falharam na validação
    response
      .status(400)
      .json({ message: "Validation error.", issues: error.format() });
    return; // Interrompe a execução para evitar enviar múltiplas respostas
  }
  
  // Tratamento de erro genérico para qualquer erro não previsto
  // Erros que não são AppError nem ZodError são considerados erros internos do servidor
  // Retorna status 500 (Internal Server Error) com a mensagem do erro
  // Em produção, pode ser útil não expor detalhes do erro para o cliente por segurança
  response.status(500).json({ message: error.message });
});

// Inicia o servidor HTTP na porta definida
// O servidor fica escutando requisições indefinidamente até ser encerrado
// Quando o servidor estiver pronto, a função callback é executada
// Exibe uma mensagem no console confirmando que o servidor está rodando
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
