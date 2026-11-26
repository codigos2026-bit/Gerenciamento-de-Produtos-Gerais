/ Meu JavaScript /

let produtos = [];

let proximoId = 1;



function adicionarProduto() {

    const nome = document.getElementById("nome").value;
    const categoria = document.getElementById("categoria").value;
    const preco = document.getElementById("preco").value;


    if (nome === "" || categoria === "" || preco === "") {
        alert("Preencha todos os campos!");
        return;
    }


    const produto = {
        id: proximoId,
        nome: nome,
        categoria: categoria,
        preco: parseFloat(preco)
    };

    produtos.push(produto);

    proximoId++;

    // Atualiza a tabela
    mostrarProdutos();

    // Limpa o formulário
    limparFormulario();

    alert("Produto adicionado com sucesso!");
}

function mostrarProdutos(lista = produtos) {

    const tabela = document.getElementById("listaProdutos");
    const mensagem = document.getElementById("mensagemVazia");

   
    tabela.innerHTML = "";


    if (lista.length === 0) {

        mensagem.style.display = "block";

        return;
    }

    mensagem.style.display = "none";


    lista.forEach(function(produto) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.id}</td>

            <td>${produto.nome}</td>

            <td>${produto.categoria}</td>

            <td>
                R$ ${produto.preco.toFixed(2)}
            </td>

            <td>

                <button
                    class="btn-editar"
                    onclick="editarProduto(${produto.id})">
                    Editar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.id})">
                    Excluir
                </button>

            </td>
        `;

        tabela.appendChild(linha);
    });
}

function editarProduto(id) {

    const produto = produtos.find(function(item) {
        return item.id === id;
    });

    if (!produto) {
        return;
    }

    document.getElementById("produtoId").value = produto.id;

    document.getElementById("nome").value = produto.nome;

    document.getElementById("categoria").value = produto.categoria;

    document.getElementById("preco").value = produto.preco;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function atualizarProduto() {

    const id = document.getElementById("produtoId").value;

    if (id === "") {
        alert("Clique em Editar em algum produto antes de atualizar.");
        return;
    }

    const nome = document.getElementById("nome").value;

    const categoria = document.getElementById("categoria").value;

    const preco = document.getElementById("preco").value;

    if (nome === "" || categoria === "" || preco === "") {
        alert("Preencha todos os campos!");
        return;
    }

    const produto = produtos.find(function(item) {
        return item.id == id;
    });

    if (produto) {

        produto.nome = nome;
        produto.categoria = categoria;
        produto.preco = parseFloat(preco);

        mostrarProdutos();

        limparFormulario();

        alert("Produto atualizado com sucesso!");
    }
}


function excluirProduto(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    produtos = produtos.filter(function(produto) {
        return produto.id !== id;
    });

    mostrarProdutos();

    alert("Produto excluído com sucesso!");
}

function buscarProduto() {

    const texto = document
        .getElementById("campoBusca")
        .value
        .toLowerCase();

    const resultado = produtos.filter(function(produto) {

        return (
            produto.nome.toLowerCase().includes(texto) ||
            produto.categoria.toLowerCase().includes(texto)
        );

    });

    mostrarProdutos(resultado);
}


function limparFormulario() {

    document.getElementById("produtoId").value = "";

    document.getElementById("nome").value = "";

    document.getElementById("categoria").value = "";

    document.getElementById("preco").value = "";
}


mostrarProdutos();
