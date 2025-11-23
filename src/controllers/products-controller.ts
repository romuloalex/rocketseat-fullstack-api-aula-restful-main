// Importa os tipos Request e Response do Express para tipagem
import type { Request, Response } from "express";
// Importa z (zod) para validação de dados usando schemas
import { z } from "zod";

// Schema de validação Zod para o corpo da requisição de criação de produto
// Zod valida automaticamente os dados e lança ZodError se a validação falhar
// Este schema define a estrutura esperada: objeto com name (string) e price (number)
const bodySchema = z.object({
  // Campo name: deve ser uma string obrigatória
  // trim(): remove espaços em branco no início e fim
  // min(1): garante que tenha pelo menos 1 caractere após o trim
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name must be 1 or more characters" }),
  
  // Campo price: deve ser um número obrigatório e positivo
  // positive(): garante que o valor seja maior que zero
  price: z
    .number({ required_error: "Price is required" })
    .positive({ message: "Price must be positive" }),
});

// Controller responsável por gerenciar as operações relacionadas a produtos
// Controllers contêm a lógica de negócio e interagem com request/response
export class ProductsController {
  // Método para listar produtos (GET /products)
  // Recebe query parameters para paginação
  index(request: Request, response: Response) {
    // Log para debug (pode ser removido em produção)
    console.log(request, response);
    
    // Extrai os parâmetros de query da URL
    // Exemplo: GET /products?page=1&limit=10
    // request.query contém { page: '1', limit: '10' }
    const { page, limit } = request.query;
    
    // Retorna uma resposta simples com os parâmetros de paginação
    // Em uma aplicação real, aqui seria feita a busca no banco de dados
    response.send(`Page ${page} de ${limit}`);
  }

  // Método para criar um novo produto (POST /products)
  // Este método é protegido pelo myMiddleware, então request.user_id estará disponível
  create(request: Request, response: Response) {
    // Valida e extrai os dados do corpo da requisição usando o schema Zod
    // Se os dados não corresponderem ao schema, ZodError é lançado automaticamente
    // O middleware de erro no server.ts captura o ZodError e retorna 400 com detalhes
    const { name, price } = bodySchema.parse(request.body);

    // Código comentado mostrando exemplos de como lançar erros:
    // if(!name) {
    //   throw new AppError("Nome do produto é obrigatório")
    // }
    // throw new Error("Erro ao tentar criar um produto!")
    // throw new AppError("Erro ao tentar criar um produto!");

    // Retorna status 201 (Created) indicando que o recurso foi criado com sucesso
    // Inclui os dados do produto criado e o user_id do middleware
    // Em uma aplicação real, aqui seria feita a inserção no banco de dados
    response.status(201).json({ name, price, user_id: request.user_id });
  }
}
