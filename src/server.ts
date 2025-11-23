import express, { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { routes } from "./routes";
import { AppError } from "./utils/app-error";

const PORT = 3333;

const app = express();

// Middleware para parse do body das requisições como JSON
app.use(express.json());

// Registra todas as rotas da aplicação
app.use(routes);

// Middleware de tratamento de erros
// Deve ser o último middleware registrado para capturar erros de todos os middlewares anteriores
app.use((error: any, request: Request, response: Response, _: NextFunction) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message });
    return;
  }

  if (error instanceof ZodError) {
    response
      .status(400)
      .json({ message: "Validation error.", issues: error.format() });
    return;
  }
  
  // Erro genérico não tratado
  response.status(500).json({ message: error.message });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
