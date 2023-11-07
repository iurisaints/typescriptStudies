import * as leitor from 'readline-sync';
import banco from './db';
import { SistemaBiblioteca } from './biblioteca'; // Certifique-se de importar sua classe corretamente
/*let i = 0
for (i; i === 0; i = i){
}*/
main()


async function main() {
    while(true){
    const sistema = new SistemaBiblioteca();
    console.log('Menu:');
    console.log('1. Cadastrar Livro');
    console.log('2. Cadastrar Usuário');
    console.log('3. Emprestar Livro');
    console.log('4. Devolver Livro');
    console.log('5. Consultar Livros Disponíveis');
    console.log('6. Deletar Usuário');
    console.log('7. Deletar Livro');
    console.log('8. Sair');
    
    const opcao = leitor.questionInt('Escolha uma opção: ');
    
    switch (opcao) {
    case 1:
      await sistema.cadastrarLivro();
      break;
    
    case 2:
      await sistema.cadastrarUsuario();
      break;
    
    case 3:
      await sistema.emprestarLivro();
      break;
    
    case 4:
      sistema.devolverLivro();
      break;
    
    case 5:
      sistema.visualizarLivros();
      break;
    
    case 6:
      sistema.deletarUsuario();
      break;
    
    case 7:
      sistema.deletarLivro();
      break;
    
    case 8:
      console.log('Saindo do sistema.');
      process.exit(0);
    
    default:
      console.log('Opção inválida. Por favor, escolha uma opção válida.');
    }
}
}
