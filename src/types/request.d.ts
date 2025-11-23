// Arquivo de declaração de tipos TypeScript para estender tipos do Express
// Este arquivo adiciona propriedades customizadas ao objeto Request do Express
// Permite que o TypeScript reconheça propriedades adicionais sem erros de tipo

// Estende o namespace Express para adicionar propriedades ao tipo Request
declare namespace Express {
  // Estende a interface Request do Express
  export interface Request {
    // Propriedade opcional que armazena o ID do usuário autenticado
    // Esta propriedade é populada por middlewares (como myMiddleware)
    // e pode ser acessada em qualquer rota ou controller
    // O '?' indica que a propriedade é opcional (pode não existir)
    user_id?: string
  }
}