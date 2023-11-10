import * as leitor from "readline-sync"
import banco from "./db"

class Medicamento {
  public nome: string;
  public quantidadeEmEstoque: number;
  public precoPorUnidade: number
  constructor(nome: string, quantidadeEmEstoque: number, precoPorUnidade: number) {
    this.nome = nome
    this.quantidadeEmEstoque = quantidadeEmEstoque
    this.precoPorUnidade = precoPorUnidade
  }
}

class Clientes {
  public nome_cliente: string;
  public documento: string;
  constructor(nome_cliente: string, documento: string){
    this.nome_cliente = nome_cliente
    this.documento = documento
  }
}

export class Farmacia {

  async getMedicamentos(): Promise<string> {
    try {
      let getRemedios = await executeDatabaseQuery("SELECT * FROM medicamentos", [])
      console.log('Lista de Remédios: ');
      return getRemedios.forEach(({ id_medicamento, nome_medicamento, quantidadeEmEstoque, precoPorUnidade }: any) => {
        console.log(`ID: ${id_medicamento} \nNome: ${nome_medicamento} \nQuantidade Dispo.: ${quantidadeEmEstoque} \nEmail: ${precoPorUnidade}`);
      })
    } catch (error) {
      return `Base de dados vazia ou indisponível, erro: ${error}`
    }
  }

  async getClientes(): Promise<string> {
    try {
      let getClientes = await executeDatabaseQuery("SELECT * FROM clientes", [])
      console.log('Lista de Clientes: ');
      return getClientes.forEach(({ id_cliente, nome_cliente}: any) => {
        console.log(`ID: ${id_cliente} \nNome: ${nome_cliente}`);
      })
    } catch (error) {
      return `Base de dados vazia ou indisponível, erro: ${error}`
    }
  }

  async getVendas(): Promise<string> {
    try {
      let getVendas = await executeDatabaseQuery(`
      SELECT vendas.id_venda, clientes.nome_cliente, medicamentos.nome_medicamento
      FROM vendas
      INNER JOIN clientes ON clientes.id_cliente = vendas.id_cliente
      INNER JOIN medicamentos ON medicamentos.id_medicamento = vendas.id_medicamento
      `, [])
      console.log('Lista de Vendas Realizadas: ');
      return getVendas.forEach(({id_venda, nome_cliente, nome_medicamento}: any) => {
        console.log(`ID da Venda: ${id_venda} \nNome do Cliente: ${nome_cliente} \nNome do Medicamento: ${nome_medicamento}`);
      })
    } catch (error) {
      return `Base de dados vazia ou indisponível, erro: ${error}`
    }
  }

  async getEstoque(): Promise<string> {
    try {
      let getEstoque = await executeDatabaseQuery(`SELECT nome_medicamento, quantidadeEmEstoque FROM medicamentos`, [])
      console.log('Lista de Vendas Realizadas: ');
      return getEstoque.forEach(({nome_medicamento, quantidadeEmEstoque}: any) => {
        console.log(`Medicamento: ${nome_medicamento} \nQuantidade: ${quantidadeEmEstoque}`);
      })
    } catch (error) {
      return `Base de dados vazia ou indisponível, erro: ${error}`
    }
  }

  async setMedicamentos(): Promise<void> {
    let nomeMedicamento = leitor.question("Informe o nome do medicamento: ").toUpperCase()
    let quantidade = leitor.questionInt("Informe a quantidade a ser inserida no estoque: ")
    let preco = leitor.questionFloat("Informe o preco final do produto (ex.: 10.00): ")

    try {
      await executeDatabaseQuery("INSERT INTO medicamentos(nome_medicamento, quantidadeEmEstoque, precoPorUnidade) VALUES (?,?,?)", [nomeMedicamento, quantidade, preco])
      console.log(`Deu tudo certo! ${nomeMedicamento} inserido no banco de dados!`);
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  async setClientes(): Promise<void> {
    let nomeCliente = leitor.question("Informe o nome do cliente para cadastra-lo: ")
    let documento = leitor.question("Informe o documento (RG ou CPF), apenas numeros: ")

    try {
      await executeDatabaseQuery("INSERT INTO clientes(nome_cliente, documento) VALUES(?, ?)", [nomeCliente, documento])
      console.log(`Deu tudo certo! ${nomeCliente} inserido com sucesso!`);
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  async setVendas(): Promise<void> {
    await this.getMedicamentos()
    let id_medicamento = leitor.questionInt(`Insira o ID do medicamento a ser vendido: `)
    await this.getClientes()
    let id_cliente = leitor.questionInt(`Insira o ID do cliente que está comprando: `)
    try {
      await executeDatabaseQuery("INSERT INTO vendas(id_medicamento, id_cliente) VALUES (?, ?)", [id_medicamento, id_cliente])
    } catch (error) {
      console.log(`Erro! ${error}`);
    }
  }

  async substituicao(): Promise<void> {
    this.getMedicamentos()
    let id_medicamento = leitor.questionInt(`Insira o ID do medicamento a ser deletado: `)
    try {
      await executeDatabaseQuery("DELETE FROM medicamentos WHERE id_medicamento = ?", [id_medicamento])
      console.log(`Medicamento deletado.`)
    } catch (error) {
      console.log(`Erro: ${error}`);      
    }
    let nomeMedicamento = leitor.question("Informe o nome do medicamento: ").toUpperCase()
    let quantidade = leitor.questionInt("Informe a quantidade a ser inserida no estoque: ")
    let preco = leitor.questionFloat("Informe o preco final do produto (ex.: 10.00): ")

    try {
      await executeDatabaseQuery("INSERT INTO medicamentos(nome_medicamento, quantidadeEmEstoque, precoPorUnidade) VALUES (?,?,?)", [nomeMedicamento, quantidade, preco])
      console.log(`Deu tudo certo! ${nomeMedicamento} inserido no banco de dados!`);
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  async deleteCliente(): Promise<void> {
    await this.getClientes()
    let id_cliente = leitor.questionInt(`Insira o ID do cliente a ser deletado: `)
    try {
      await executeDatabaseQuery("DELETE FROM clientes WHERE id_cliente = ?", [id_cliente])
      console.log(`Cliente deletado.`);
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  async deleteMedicamento(): Promise<void> {
    await this.getMedicamentos()
    let id_medicamento = leitor.questionInt(`Insira o ID do medicamento a ser deletado: `)
    try {
      await executeDatabaseQuery("DELETE FROM medicamentos WHERE id_medicamento = ?", [id_medicamento])
      console.log(`Medicamento deletado.`)
    } catch (error) {
      console.log(`Erro: ${error}`);      
    }
  }
}


async function executeDatabaseQuery(query: string, params: any[]): Promise<any> {
  try {
    const result = await banco.execute(query, params)
    return result
  } catch (err) {
    console.error('Erro na execucao da consulta', err);
    throw err
  }
}