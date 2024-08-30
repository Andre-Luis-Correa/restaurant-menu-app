export interface Cliente {
    id: string;
    cpf: string;
    pontos: number;
  }
  
  export interface Prato {
    id: string;
    img: string;
    nome: string;
    descricao: string;
    valorReais: number;
    valorPontos: number;
    categoria: string;
    status: string;
  }
  
  export interface Pedido {
    id: string;
    numeroPedido: string;
    descricao: string;
    observacoes: string;
    data: string;
  }
  
  export interface PratoMaisVendido {
    id: number;
    nome: string;
    quantidadeVendida: number;
  }
  
  export interface PratoLiderVenda extends PratoMaisVendido {
    img: string;
  }
  
  export interface Estatisticas {
    data: string;
    pratosMaisVendidos: PratoMaisVendido[];
    pratosLideresVenda: PratoLiderVenda[];
    lucroTotal: number;
  }
  
  export interface Ingrediente {
    id: string;
    nome: string;
    quantidade: string;
  }
  
  export interface Categoria {
    id: string;
    nome: string;
  }
  
  export interface HistoricoPedido {
    numeroPedido: string;
    descricao: string;
    valorReais: number;
    valorPontos: number;
    data: string;
    id: string;
  }
  
  export interface CarrinhoItem {
    id: string;
    nome: string;
    quantidade: number;
    valorTotal: number;
    valorReais: number;
  }
  
  export interface RestauranteData {
    clientes: Cliente[];
    pratos: Prato[];
    pedidos: Pedido[];
    estatisticas: Estatisticas;
    ingredientes: Ingrediente[];
    categorias: Categoria[];
    historicoPedidos: HistoricoPedido[];
    carrinho: CarrinhoItem[];
  }  

  export interface Cardapio {
    pratos: Prato[];  // O cardápio agora é uma lista de pratos
  }

export type DrawerParamList = {
  Home: undefined;
  Cardápio: undefined;
  Pedidos: undefined;
  Perfil: undefined;
  Carrinho: undefined; // Adicione todas as rotas que você tem no Drawer
};
