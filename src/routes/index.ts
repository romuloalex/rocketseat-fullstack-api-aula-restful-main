// Importa Router do Express para criar o router principal da aplicação
import { Router } from "express";

// Importa o router de produtos que contém todas as rotas relacionadas a produtos
import { productsRoutes } from "./products.routes";

// Cria o router principal que centraliza todas as rotas da aplicação
// Este router será registrado no server.ts com app.use(routes)
const routes = Router()

// Registra o router de produtos no caminho /products
// Isso significa que todas as rotas definidas em productsRoutes terão o prefixo /products
// Exemplo: productsRoutes.get('/') vira GET /products/
//         productsRoutes.post('/') vira POST /products/
// Este padrão permite organizar rotas por recurso (products, users, orders, etc.)
routes.use("/products", productsRoutes)

// Exporta o router principal para ser usado no server.ts
// Todas as rotas da aplicação são acessíveis através deste objeto routes
export { routes };
