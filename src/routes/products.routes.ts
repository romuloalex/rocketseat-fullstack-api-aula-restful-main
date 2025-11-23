// Importa Router do Express para criar um conjunto de rotas
import { Router } from "express";
// Importa o controller que contém a lógica de negócio para produtos
import { ProductsController } from "../controllers/products-controller";
// Importa o middleware customizado que adiciona user_id à requisição
import { myMiddleware } from "../middlewares/my-middleware";

// Cria um router específico para rotas de produtos
// Router permite agrupar rotas relacionadas e aplicar middlewares específicos
const productsRoutes = Router()

// Instancia o controller de produtos
// O controller contém os métodos que serão chamados quando as rotas forem acessadas
const productsController = new ProductsController()

// Define a rota GET /products
// Quando uma requisição GET for feita para /products, o método index do controller é executado
// Esta rota lista produtos (com suporte a paginação via query params)
productsRoutes.get('/', productsController.index)

// Define a rota POST /products
// myMiddleware é executado ANTES do controller.create
// A ordem importa: primeiro o middleware adiciona user_id, depois o controller usa esse valor
// Quando uma requisição POST for feita para /products, primeiro myMiddleware executa,
// depois productsController.create é chamado com request.user_id já populado
productsRoutes.post("/", myMiddleware, productsController.create)

// Exporta o router para ser usado no arquivo de rotas principal (index.ts)
export { productsRoutes };

