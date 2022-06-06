
function filter(filtro){
    if (filtro == "Todos"){
        return produtos
    } else if (filtro === "botaoBuscaPorNome"){
        const input = document.querySelector(".campoDeBusca").value.toLowerCase()
        return produtos.filter(produto => {
            return produto.nome.toLowerCase().includes(input) || produto.secao.toLowerCase().includes(input) || produto.categoria.toLowerCase().includes(input) 
       })
    }
    return produtos.filter(produto => {
        return produto.secao === filtro
    })
}

function printProducts(produtos) {
    const divProdutos = document.querySelector("#listProdutos ul")
    divProdutos.innerText = ""

    produtos.forEach(produto => {
        divProdutos.append(createItem(produto))
    })
}

function createItem(produto) {
    const listaProduto = document.createElement("li")
    listaProduto.className = "containerCards__card"

    const img = document.createElement("img")
    img.src = produto.img
    img.className = "card__img"

    const h3 = document.createElement("h3")
    h3.innerText = produto.nome
    h3.className = "card__title"

    const span = document.createElement("span")
    span.className = "card__secao"
    span.innerText = `${produto.secao}`
    
    const ol = document.createElement("ol")
    ol.className = "card__listComponents"
    produto.componentes.forEach((element, index) => {
        const li = document.createElement("li")
        li.innerText = `${index+1}. ${element}`
        li.className = "card__component"
        ol.appendChild(li)
    })
    
    const div = document.createElement("div")
    div.className = "card__container"

    const p = document.createElement("p")
    p.className = "card__value"
    p.innerText = `R$${parseInt(produto.preco).toFixed(2)}`

    const btnAddCart = document.createElement("button")
    btnAddCart.className = "card__button"
    btnAddCart.id = `produto-${produto.id}`
    btnAddCart.innerText = "comprar"

    div.append(p, btnAddCart)
    listaProduto.append(img, h3, span, ol, div)
    return listaProduto
}

printProducts(produtos)

document.querySelector("header").addEventListener("click", event => {
    const btnClick = event.target.classList
    if (btnClick[0] === "estiloGeralBotoes"){
        let filtro = btnClick[1].split("--")[1]
        const produtosFiltrados = filter(filtro)
        printProducts(produtosFiltrados)
    }
})

let dataCart = []

    document.querySelector("body").addEventListener("click", event => {
        if (event.target.className === "card__button"){
        const btnClick = event.target.id.split("-")[1]
        dataCart.push(produtos[btnClick-1])
        createCardCart(dataCart)
        } else if (event.target.className === "cart__card__iconTrash"){
            removeProductToCart(event.target.id.split("__")[2])
        }
    })

function createCardCart(dataProduct) {
    const quantidadeCart = document.querySelector("#quantity")
    quantidadeCart.innerText = dataProduct.length

    let totalPrice = 0
    const totalValue = document.querySelector("#totalValue")

    if (dataProduct.length == 0){
        totalValue.innerText = `R$ 0.00`

        const divVazia = document.createElement("div")
        divVazia.className = "cart__vazio"
        const imgCartVazio = document.createElement("img")
        imgCartVazio.src = "./src/img/shopping-bag.svg"
        imgCartVazio.alt = "carrinho vazio"
        const paragraphCartVazio = document.createElement("p")
        paragraphCartVazio.innerText = "Por enquanto não temos produtos no carrinho"

        divVazia.append(imgCartVazio, paragraphCartVazio)
        
        const cartVazio = document.querySelector(".cart__products")
        cartVazio.innerText = ""
        cartVazio.append(divVazia)

    } else {
        const cart = document.querySelector(".cart__products")
        cart.innerText = ""
        
        dataProduct.forEach((product, index) => {
            totalPrice += parseInt(product.preco)
            totalValue.innerText = `R$ ${totalPrice.toFixed(2)}`

            const div = document.createElement("div")
            div.className = "cart__card"
        
            const img = document.createElement("img")
            img.className = "cart__card__image"
            img.src = product.img
    
            const divImg = document.createElement("div")
            divImg.className = "cart__card__divImg"
            divImg.appendChild(img)
        
            const h2 = document.createElement("h2")
            h2.className = "cart__card__title"
            h2.innerText = product.nome
        
            const p = document.createElement("p")
            p.className = "cart__card__value"
            p.innerText = product.preco
        
            const span = document.createElement("span")
            span.className = "cart__card__section"
            span.innerText = product.secao
        
            const divContainerInfo = document.createElement("div")
            divContainerInfo.className = "cart__card__info"
        
            const trash = document.createElement("img")
            trash.className = "cart__card__iconTrash"
            trash.id = `cart__card__${index}`
            trash.src = "./src/img/trash.svg"
            trash.alt = "remover do carrinho"
        
            divContainerInfo.append(h2, span, p)
    
            const divContainer= document.createElement("div")
            divContainer.className = "cart__card__container"
    
            divContainer.append(divImg, divContainerInfo)
    
            div.append(divContainer, trash)
    
            cart.append(div)
        })
    }
}

function removeProductToCart(id) {
   dataCart.splice(parseInt(id), 1)
   createCardCart(dataCart)
}

function somarValorCart() {

}