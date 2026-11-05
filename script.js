/* =========================================

   GRUPO BB AGRONEGÓCIOS - INTERATIVIDADE

   Este arquivo não altera o HTML: tudo é

   aplicado por cima do conteúdo existente.

========================================= */



(function () {

    "use strict";



    // -----------------------------------------

    // CONFIGURAÇÃO

    // Informe o número oficial com DDI + DDD, só dígitos

    // (ex.: "5595999999999"). Se ficar vazio, o WhatsApp

    // abre com a mensagem pronta e a pessoa escolhe o contato.

    // -----------------------------------------

    const WHATSAPP_NUMERO = "";

    const WHATSAPP_SAUDACAO = "Olá! Vim pelo site do Grupo BB Agronegócios.";



    const reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;



    const $ = function (seletor, base) { return (base || document).querySelector(seletor); };

    const $$ = function (seletor, base) { return Array.from((base || document).querySelectorAll(seletor)); };



    // -----------------------------------------

    // INFORMAÇÕES NUTRICIONAIS (dados originais)

    // -----------------------------------------



    // SEÇÃO ÚNICA DE INFORMAÇÕES NUTRICIONAIS



    const informacoesNutricionais = {

        "morango": {

            nome: "Morango",

            texto: "Por 100 g: aproximadamente 32 kcal, 7,7 g de carboidratos, 2 g de fibras e 59 mg de vitamina C."

        },

        "batata-inglesa": {

            nome: "Batata inglesa",

            texto: "Por 100 g de batata crua: aproximadamente 77 kcal, 17 g de carboidratos, 2,2 g de fibras e 2 g de proteínas."

        },

        "batata-asterix": {

            nome: "Batata Asterix",

            texto: "Por 100 g de batata crua: aproximadamente 77 kcal, 17 g de carboidratos, 2,2 g de fibras e 2 g de proteínas."

        },

        "pimentao": {

            nome: "Pimentão",

            texto: "Os valores variam conforme a cor. É fonte de vitamina C e contém fibras e água."

        },

        "vagem": {

            nome: "Vagem",

            texto: "Por 100 g: aproximadamente 31 kcal, com fibras, carboidratos e pequenas quantidades de proteínas."

        },

        "laranja": {

            nome: "Laranja",

            texto: "Por 100 g: aproximadamente 47 kcal, 11,8 g de carboidratos e 53 mg de vitamina C."

        },

        "brocolis": {

            nome: "Brócolis",

            texto: "Por 100 g: aproximadamente 34 kcal, com fibras, vitamina C, vitamina K e folato."

        },

        "couve-flor": {

            nome: "Couve-flor",

            texto: "Por 100 g: aproximadamente 25 kcal, com fibras, vitamina C e folato."

        },

        "tomate": {

            nome: "Tomate",

            texto: "Por 100 g: aproximadamente 18 kcal, com água, fibras e licopeno."

        },

        "milho": {

            nome: "Milho",

            texto: "Por 100 g de milho doce: aproximadamente 86 kcal, 19 g de carboidratos e 2,7 g de fibras."

        },

        "cenoura": {

            nome: "Cenoura",

            texto: "Por 100 g: aproximadamente 41 kcal, com fibras e betacaroteno."

        },

        "alho": {

            nome: "Alho",

            texto: "Por 100 g: aproximadamente 149 kcal. É consumido geralmente em pequenas quantidades como tempero."

        },

        "cebola": {

            nome: "Cebola",

            texto: "Por 100 g: aproximadamente 40 kcal, com carboidratos, água e pequenas quantidades de fibras."

        },

        "abacate": {

            nome: "Abacate",

            texto: "Por 100 g: aproximadamente 160 kcal, com gorduras insaturadas, fibras e potássio."

        },

        "maca": {

            nome: "Maçã",

            texto: "Por 100 g: aproximadamente 52 kcal, com carboidratos e fibras."

        },

        "abacaxi": {

            nome: "Abacaxi",

            texto: "Por 100 g: aproximadamente 50 kcal, com carboidratos, água e vitamina C."

        },

        "batata-doce": {

            nome: "Batata-doce",

            texto: "Por 100 g de batata-doce crua: aproximadamente 86 kcal, com carboidratos, fibras e betacaroteno em variedades alaranjadas."

        },

        "repolho": {

            nome: "Repolho",

            texto: "Por 100 g: aproximadamente 25 kcal, com fibras e vitamina C."

        },

        "repolho-roxo": {

            nome: "Repolho roxo",

            texto: "Por 100 g: aproximadamente 31 kcal, com fibras, vitamina C e antocianinas."

        }

    };



    // -----------------------------------------

    // ROLAGEM: cabeçalho, barra de progresso,

    // voltar ao topo e leve parallax na capa

    // -----------------------------------------

    function iniciarRolagem() {

        const cabecalho = $(".cabecalho");

        const capaFundo = $(".capa-fundo");



        const barra = document.createElement("div");

        barra.className = "barra-progresso";

        barra.setAttribute("aria-hidden", "true");

        document.body.appendChild(barra);



        const topo = document.createElement("button");

        topo.type = "button";

        topo.className = "voltar-topo";

        topo.setAttribute("aria-label", "Voltar ao topo");

        topo.innerHTML =

            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" ' +

            'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +

            '<path d="M12 19V5M5 12l7-7 7 7"/></svg>';

        document.body.appendChild(topo);



        topo.addEventListener("click", function () {

            window.scrollTo({ top: 0, behavior: reduzMovimento ? "auto" : "smooth" });

        });



        let agendado = false;

        let ultimoY = 0;



        function atualizar() {

            agendado = false;

            const y = window.scrollY || document.documentElement.scrollTop;

            const max = document.documentElement.scrollHeight - window.innerHeight;



            barra.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";



            if (cabecalho) {

                cabecalho.classList.toggle("rolou", y > 8);



                const menuAberto = cabecalho.querySelector(".menu.aberto");

                const delta = y - ultimoY;



                if (!reduzMovimento && !menuAberto && y > 420 && delta > 6) {

                    cabecalho.classList.add("oculto");

                } else if (delta < -4 || y <= 420 || menuAberto) {

                    cabecalho.classList.remove("oculto");

                }

            }



            ultimoY = y;



            topo.classList.toggle("visivel", y > 600);



            if (capaFundo && !reduzMovimento && y < window.innerHeight * 1.2) {

                capaFundo.style.setProperty("--py", (y * 0.18).toFixed(1) + "px");

            }

        }



        window.addEventListener("scroll", function () {

            if (!agendado) {

                agendado = true;

                window.requestAnimationFrame(atualizar);

            }

        }, { passive: true });



        window.addEventListener("resize", atualizar);

        atualizar();

    }



    // -----------------------------------------

    // MENU (celular) e destaque da página atual

    // -----------------------------------------

    function iniciarMenu() {

        const botao = $(".menu-toggle");

        const menu = $(".menu");



        if (menu) {

            const links = $$("a", menu);



            if (!links.some(function (a) { return a.classList.contains("ativo"); })) {

                const atual = (location.pathname.split("/").pop() || "index.html").toLowerCase();



                links.forEach(function (a) {

                    const destino = (a.getAttribute("href") || "").split("#")[0].toLowerCase();



                    if (destino === atual) {

                        a.classList.add("ativo");

                        a.setAttribute("aria-current", "page");

                    }

                });

            }

        }



        if (!botao || !menu) {

            return;

        }



        if (!menu.id) {

            menu.id = "menu-principal";

        }



        botao.setAttribute("aria-controls", menu.id);

        botao.setAttribute("aria-expanded", "false");



        function definir(aberto) {

            menu.classList.toggle("aberto", aberto);

            botao.setAttribute("aria-expanded", aberto ? "true" : "false");

            botao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");

            botao.textContent = aberto ? "✕" : "☰";

        }



        botao.addEventListener("click", function (evento) {

            evento.stopPropagation();

            definir(!menu.classList.contains("aberto"));

        });



        menu.addEventListener("click", function (evento) {

            if (evento.target.closest("a")) {

                definir(false);

            }

        });



        document.addEventListener("click", function (evento) {

            if (menu.classList.contains("aberto") && !evento.target.closest(".cabecalho")) {

                definir(false);

            }

        });



        document.addEventListener("keydown", function (evento) {

            if (evento.key === "Escape" && menu.classList.contains("aberto")) {

                definir(false);

                botao.focus();

            }

        });



        window.addEventListener("resize", function () {

            if (window.innerWidth > 850 && menu.classList.contains("aberto")) {

                definir(false);

            }

        });

    }



    // -----------------------------------------

    // ANIMAÇÃO DE ENTRADA AO ROLAR

    // -----------------------------------------

    function iniciarEntradas() {

        if (reduzMovimento || !("IntersectionObserver" in window)) {

            return;

        }



        const seletor = [

            ".titulo-secao", ".secao-titulo",

            ".duas-colunas > *", ".historia-introducao > *",

            ".secao.secao-destaque",

            ".grade-produtos > *", ".destaques-produtos > *",

            ".grade-equipe > *", ".grade-parceiros > *",

            ".cartoes-sedes > *", ".grade-indicadores > *",

            ".grade-graficos > *", ".grade-cards > *",

            ".tabela-responsiva", ".nota-safra",

            ".faq-item", ".faq-contato",

            ".contato-layout > *", ".faixa-comercial > *",

            ".filtros-produtos", ".imagem-destaque", ".historia-imagem"

        ].join(",");



        const observador = new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {

                if (!entrada.isIntersecting) {

                    return;

                }



                const el = entrada.target;

                const atraso = parseFloat(el.style.getPropertyValue("--atraso")) || 0;



                el.classList.add("visivel");

                observador.unobserve(el);



                // devolve o elemento ao estado normal para o hover responder sem atraso

                window.setTimeout(function () {

                    el.classList.remove("reveal", "reveal-mascara", "visivel");

                    el.style.removeProperty("--atraso");

                }, 900 + atraso * 1000);

            });

        }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });



        const mascaras = new WeakMap();

        const observadorPais = new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {

                if (!entrada.isIntersecting) {

                    return;

                }



                observadorPais.unobserve(entrada.target);



                (mascaras.get(entrada.target) || []).forEach(function (el) {

                    const atraso = parseFloat(el.style.getPropertyValue("--atraso")) || 0;



                    el.classList.add("visivel");



                    window.setTimeout(function () {

                        el.classList.remove("reveal", "reveal-mascara", "visivel");

                        el.style.removeProperty("--atraso");

                    }, 1300 + atraso * 1000);

                });

            });

        }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });



        $$(seletor).forEach(function (el) {

            // o que já está visível ao abrir a página não precisa esconder

            if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {

                return;

            }



            const irmaos = el.parentElement ? Array.from(el.parentElement.children) : [];

            const posicao = Math.max(irmaos.indexOf(el), 0);



            el.style.setProperty("--atraso", (Math.min(posicao % 3, 3) * 0.1).toFixed(2) + "s");

            el.classList.add("reveal");



            if (el.matches(".foto-quadro, .imagem-destaque, .historia-imagem, .video-quadro")) {

                // o recorte (clip-path) zera a área visível, então o observador vigia o elemento pai

                el.classList.add("reveal-mascara");

                const pai = el.parentElement;



                if (!mascaras.has(pai)) {

                    mascaras.set(pai, []);

                    observadorPais.observe(pai);

                }



                mascaras.get(pai).push(el);

                return;

            }



            observador.observe(el);

        });

    }



    // -----------------------------------------

    // CONTADORES ANIMADOS (números iniciados por dígitos)

    // -----------------------------------------

    function iniciarContadores() {

        if (reduzMovimento || !("IntersectionObserver" in window)) {

            return;

        }



        const alvos = $$(".faixa-numeros strong, .indicador h3, .indicador strong").filter(function (el) {

            return /^\d+/.test(el.textContent.trim());

        });



        if (!alvos.length) {

            return;

        }



        function animar(el) {

            const original = el.dataset.final;

            const partes = original.match(/^(\d+)(.*)$/);



            if (!partes) {

                return;

            }



            const meta = parseInt(partes[1], 10);

            const casas = partes[1].length;

            const duracao = 1500;

            const inicio = performance.now();



            function quadro(agora) {

                const progresso = Math.min((agora - inicio) / duracao, 1);

                const suave = 1 - Math.pow(1 - progresso, 3);



                if (progresso < 1) {

                    el.textContent = String(Math.round(meta * suave)).padStart(casas, "0") + partes[2];

                    window.requestAnimationFrame(quadro);

                } else {

                    el.textContent = original;

                }

            }



            window.requestAnimationFrame(quadro);

        }



        const observador = new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    observador.unobserve(entrada.target);

                    animar(entrada.target);

                }

            });

        }, { threshold: 0.6 });



        alvos.forEach(function (el) {

            el.dataset.final = el.textContent;

            const partes = el.textContent.trim().match(/^(\d+)(.*)$/);

            el.textContent = "0".repeat(partes[1].length) + partes[2];

            observador.observe(el);

        });

    }



    // -----------------------------------------

    // BRILHO DOS CARTÕES QUE ACOMPANHA O MOUSE

    // -----------------------------------------

    function iniciarBrilhoCartoes() {

        $$(".card, .produto-destaque, .indicador").forEach(function (el) {

            el.addEventListener("pointermove", function (evento) {

                if (evento.pointerType !== "mouse") {

                    return;

                }



                const caixa = el.getBoundingClientRect();

                el.style.setProperty("--mx", (evento.clientX - caixa.left) + "px");

                el.style.setProperty("--my", (evento.clientY - caixa.top) + "px");

            });

        });

    }



    // -----------------------------------------

    // IMAGENS QUE NÃO CARREGAM: só ganham um visual

    // de reserva (o arquivo e o nome não mudam)

    // -----------------------------------------

    function iniciarImagensAusentes() {

        function marcar(img) {

            img.classList.add("img-falhou");



            const cartao = img.closest("[data-produto], .produto-destaque, .card");

            const titulo = cartao && (cartao.dataset.nome || (cartao.querySelector("h2, h3") || {}).textContent);



            if (titulo && titulo.trim()) {

                const letra = titulo.trim().charAt(0).toUpperCase();

                img.dataset.letra = letra;



                if (cartao.classList.contains("produto-destaque")) {

                    cartao.classList.add("foto-ausente");

                    cartao.dataset.letra = letra;

                }

            }

        }



        $$("img").forEach(function (img) {

            img.addEventListener("error", function () { marcar(img); });



            if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {

                marcar(img);

            }

        });

    }



    // -----------------------------------------

    // PRODUTOS: busca, filtro e janela nutricional

    // -----------------------------------------

    function iniciarProdutos() {

        const cartoes = $$("[data-produto]");



        if (!cartoes.length) {

            return;

        }



        const busca = $("#busca-produto");

        const categoria = $("#filtro-categoria");

        const vazio = $("#sem-produtos");



        function normalizar(texto) {

            return (texto || "")

                .toLowerCase()

                .normalize("NFD")

                .replace(/[̀-ͯ]/g, "")

                .trim();

        }



        let filtrar = function () {

            const termo = normalizar(busca ? busca.value : "");

            const cat = categoria ? categoria.value : "todos";

            let visiveis = 0;



            cartoes.forEach(function (cartao) {

                const nome = normalizar((cartao.dataset.nome || "") + " " + (cartao.dataset.categoria || ""));

                const mostrar =

                    (!termo || nome.indexOf(termo) !== -1) &&

                    (!cat || cat === "todos" || cartao.dataset.categoria === cat);

                const estavaOculto = cartao.hidden;



                cartao.hidden = !mostrar;



                if (mostrar) {

                    visiveis++;



                    if (estavaOculto && !reduzMovimento) {

                        cartao.classList.remove("filtrado-entra");

                        void cartao.offsetWidth;

                        cartao.classList.add("filtrado-entra");

                    }

                }

            });



            if (vazio) {

                vazio.hidden = visiveis > 0;

            }

        };



        // Chips de categoria e contador de resultados

        const contagem = document.createElement("p");

        contagem.className = "contagem-produtos";

        contagem.setAttribute("aria-live", "polite");



        const chips = document.createElement("div");

        chips.className = "chips-categorias";

        chips.setAttribute("role", "group");

        chips.setAttribute("aria-label", "Filtrar por categoria");



        if (categoria) {

            Array.from(categoria.options).forEach(function (opcao) {

                const total = opcao.value === "todos"

                    ? cartoes.length

                    : cartoes.filter(function (c) { return c.dataset.categoria === opcao.value; }).length;



                if (!total) {

                    return;

                }



                const chip = document.createElement("button");

                chip.type = "button";

                chip.className = "chip" + (categoria.value === opcao.value ? " ativo" : "");

                chip.dataset.valor = opcao.value;

                chip.innerHTML = "<span></span><em>" + total + "</em>";

                chip.firstChild.textContent = opcao.textContent.trim();

                chip.addEventListener("click", function () {

                    categoria.value = opcao.value;

                    filtrar();

                });

                chips.appendChild(chip);

            });



            const filtros = $(".filtros-produtos");



            if (filtros && filtros.parentNode) {

                filtros.parentNode.insertBefore(chips, filtros.nextSibling);

                filtros.parentNode.insertBefore(contagem, chips.nextSibling);

            }

        }



        function sincronizar(visiveis) {

            $$(".chip", chips).forEach(function (chip) {

                chip.classList.toggle("ativo", categoria && chip.dataset.valor === categoria.value);

            });



            contagem.textContent = "Mostrando " + visiveis + " de " + cartoes.length + " produtos";

        }



        const filtrarOriginal = filtrar;

        filtrar = function () {

            filtrarOriginal();

            sincronizar(cartoes.filter(function (c) { return !c.hidden; }).length);

        };



        if (busca) { busca.addEventListener("input", filtrar); }

        if (categoria) { categoria.addEventListener("change", filtrar); }

        filtrar();



        // Janela com as informações nutricionais

        const modal = $("#nutri-modal");



        if (!modal) {

            return;

        }



        const titulo = $("#nutri-titulo", modal);

        const texto = $("#nutri-texto", modal);

        const fechar = $(".fechar-modal", modal);

        let origem = null;



        function abrir(chave, botao) {

            const produto = informacoesNutricionais[chave];



            if (!produto) {

                return;

            }



            origem = botao;

            titulo.textContent = produto.nome;

            texto.textContent = produto.texto;

            modal.classList.add("aberto");

            modal.setAttribute("aria-hidden", "false");

            document.body.classList.add("sem-rolagem");



            if (fechar) {

                window.setTimeout(function () { fechar.focus(); }, 50);

            }

        }



        function fecharModal() {

            modal.classList.remove("aberto");

            modal.setAttribute("aria-hidden", "true");

            document.body.classList.remove("sem-rolagem");



            if (origem) {

                origem.focus();

            }

        }



        $$("[data-nutricao]").forEach(function (botao) {

            botao.addEventListener("click", function () {

                abrir(botao.dataset.nutricao, botao);

            });

        });



        if (fechar) { fechar.addEventListener("click", fecharModal); }



        modal.addEventListener("click", function (evento) {

            if (evento.target === modal) {

                fecharModal();

            }

        });



        document.addEventListener("keydown", function (evento) {

            if (!modal.classList.contains("aberto")) {

                return;

            }



            if (evento.key === "Escape") {

                fecharModal();

            } else if (evento.key === "Tab" && fechar) {

                evento.preventDefault();

                fechar.focus();

            }

        });

    }



    // -----------------------------------------

    // VÍDEOS: só um toca por vez

    // -----------------------------------------

    function iniciarVideos() {

        const videos = $$("video");



        videos.forEach(function (video) {

            video.addEventListener("play", function () {

                videos.forEach(function (outro) {

                    if (outro !== video && !outro.paused) {

                        outro.pause();

                    }

                });

            });

        });

    }



    // -----------------------------------------

    // CONTATO: máscara, validação e WhatsApp

    // -----------------------------------------

    function iniciarFormulario() {

        const numero = WHATSAPP_NUMERO.replace(/\D/g, "");



        function montarUrl(mensagem) {

            return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

        }



        const linkWhatsapp = $("[data-whatsapp]");



        if (linkWhatsapp) {

            linkWhatsapp.href = montarUrl(WHATSAPP_SAUDACAO);

        }



        const form = $("#form-contato");



        if (!form) {

            return;

        }



        form.noValidate = true;



        const regras = {

            nome: function (v) {

                return v.trim().length >= 3 ? "" : "Informe seu nome completo.";

            },

            telefone: function (v) {

                const digitos = v.replace(/\D/g, "");

                return digitos.length === 10 || digitos.length === 11 ? "" : "Informe um telefone com DDD.";

            },

            assunto: function (v) {

                return v ? "" : "Selecione um assunto.";

            },

            mensagem: function (v) {

                return v.trim().length >= 10 ? "" : "Escreva uma mensagem com pelo menos 10 caracteres.";

            }

        };



        function mostrar(campo, erro) {

            const bloco = campo.closest(".campo");



            if (!bloco) {

                return;

            }



            let aviso = $(".campo-msg", bloco);



            bloco.classList.toggle("erro", Boolean(erro));

            bloco.classList.toggle("ok", !erro && campo.value.trim() !== "");

            campo.setAttribute("aria-invalid", erro ? "true" : "false");



            if (erro) {

                if (!aviso) {

                    aviso = document.createElement("small");

                    aviso.className = "campo-msg";

                    aviso.setAttribute("role", "alert");

                    bloco.appendChild(aviso);

                }



                aviso.textContent = erro;

            } else if (aviso) {

                aviso.remove();

            }

        }



        function validar(campo) {

            const regra = regras[campo.name];

            const erro = regra ? regra(campo.value) : "";

            mostrar(campo, erro);

            return !erro;

        }



        const telefone = $("#telefone", form);



        if (telefone) {

            telefone.addEventListener("input", function () {

                const d = telefone.value.replace(/\D/g, "").slice(0, 11);

                let saida = d;



                if (d.length > 10) {

                    saida = "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);

                } else if (d.length > 6) {

                    saida = "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);

                } else if (d.length > 2) {

                    saida = "(" + d.slice(0, 2) + ") " + d.slice(2);

                } else if (d.length > 0) {

                    saida = "(" + d;

                }



                telefone.value = saida;

            });

        }



        $$("input, select, textarea", form).forEach(function (campo) {

            if (!regras[campo.name]) {

                return;

            }



            campo.addEventListener("blur", function () { validar(campo); });

            campo.addEventListener("input", function () {

                if (campo.closest(".campo.erro")) {

                    validar(campo);

                }

            });

            campo.addEventListener("change", function () { validar(campo); });

        });



        form.addEventListener("submit", function (evento) {

            evento.preventDefault();



            const campos = $$("input, select, textarea", form).filter(function (c) { return regras[c.name]; });

            const invalidos = campos.filter(function (c) { return !validar(c); });



            if (invalidos.length) {

                invalidos[0].focus();

                return;

            }



            const dados = new FormData(form);

            const mensagem =

                "Olá! Meu nome é " + dados.get("nome").trim() + ".\n" +

                "Telefone: " + dados.get("telefone").trim() + "\n" +

                "Assunto: " + dados.get("assunto") + "\n\n" +

                dados.get("mensagem").trim();



            window.open(montarUrl(mensagem), "_blank", "noopener");



            let status = $(".form-status", form);



            if (!status) {

                status = document.createElement("p");

                status.className = "form-status";

                status.setAttribute("role", "status");

                form.appendChild(status);

            }



            status.textContent = numero

                ? "Mensagem preparada! O WhatsApp foi aberto em uma nova aba para você concluir o envio."

                : "Mensagem preparada! O WhatsApp foi aberto em uma nova aba. Escolha o contato da empresa para concluir o envio.";

        });

    }



    // -----------------------------------------

    // LINKS "#" não devem levar a página ao topo

    // -----------------------------------------

    function iniciarLinksVazios() {

        $$('a[href="#"]').forEach(function (link) {

            link.addEventListener("click", function (evento) {

                evento.preventDefault();

            });

        });

    }





    // -----------------------------------------

    // CAPA: partículas douradas, luz que segue o mouse

    // e leve parallax

    // -----------------------------------------

    function iniciarCapa() {

        const capa = $(".capa");



        if (!capa || reduzMovimento) {

            return;

        }



        const fundo = $(".capa-fundo", capa);

        const tela = document.createElement("canvas");

        tela.className = "capa-particulas";

        tela.setAttribute("aria-hidden", "true");

        capa.insertBefore(tela, capa.firstChild.nextSibling);



        const ctx = tela.getContext("2d");

        let largura = 0, altura = 0, particulas = [], ativa = true, rodando = false;



        function medir() {

            const dpr = Math.min(window.devicePixelRatio || 1, 2);

            largura = capa.clientWidth;

            altura = capa.clientHeight;

            tela.width = largura * dpr;

            tela.height = altura * dpr;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);



            const total = Math.round(Math.min(largura / 28, 46));

            particulas = Array.from({ length: total }, function () {

                return {

                    x: Math.random() * largura,

                    y: Math.random() * altura,

                    r: Math.random() * 2.2 + .6,

                    v: Math.random() * .35 + .12,

                    f: Math.random() * Math.PI * 2,

                    a: Math.random() * .5 + .25

                };

            });

        }



        function desenhar(t) {

            if (!ativa) {

                rodando = false;

                return;

            }



            ctx.clearRect(0, 0, largura, altura);



            particulas.forEach(function (p) {

                p.y -= p.v;

                p.x += Math.sin(t / 1800 + p.f) * .28;



                if (p.y < -10) { p.y = altura + 10; p.x = Math.random() * largura; }



                const brilho = p.a * (.6 + .4 * Math.sin(t / 900 + p.f));

                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);

                grad.addColorStop(0, "rgba(240, 223, 180, " + brilho + ")");

                grad.addColorStop(1, "rgba(240, 223, 180, 0)");

                ctx.fillStyle = grad;

                ctx.beginPath();

                ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);

                ctx.fill();

            });



            window.requestAnimationFrame(desenhar);

        }



        function iniciar() {

            if (!rodando) {

                rodando = true;

                window.requestAnimationFrame(desenhar);

            }

        }



        medir();

        iniciar();

        window.addEventListener("resize", medir);



        if ("IntersectionObserver" in window) {

            new IntersectionObserver(function (entradas) {

                ativa = entradas[0].isIntersecting;



                if (ativa) {

                    iniciar();

                }

            }).observe(capa);

        }



        capa.addEventListener("pointermove", function (evento) {

            if (evento.pointerType !== "mouse") {

                return;

            }



            const caixa = capa.getBoundingClientRect();

            const rx = (evento.clientX - caixa.left) / caixa.width;

            const ry = (evento.clientY - caixa.top) / caixa.height;



            capa.style.setProperty("--lx", (rx * 100).toFixed(1) + "%");

            capa.style.setProperty("--ly", (ry * 100).toFixed(1) + "%");



            if (fundo) {

                fundo.style.setProperty("--px", ((.5 - rx) * 26).toFixed(1) + "px");

            }

        });

    }



    // -----------------------------------------

    // BOTÕES MAGNÉTICOS

    // -----------------------------------------

    function iniciarMagneticos() {

        if (reduzMovimento || !window.matchMedia("(pointer: fine)").matches) {

            return;

        }



        $$(".capa .botao, .faixa-comercial .botao, .centro .botao").forEach(function (el) {

            el.addEventListener("pointermove", function (evento) {

                const c = el.getBoundingClientRect();

                const dx = evento.clientX - (c.left + c.width / 2);

                const dy = evento.clientY - (c.top + c.height / 2);



                el.style.setProperty("--tx", (dx * .22).toFixed(1) + "px");

                el.style.setProperty("--ty", (dy * .32).toFixed(1) + "px");

            });



            el.addEventListener("pointerleave", function () {

                el.style.removeProperty("--tx");

                el.style.removeProperty("--ty");

            });

        });

    }



    // -----------------------------------------

    // INCLINAÇÃO 3D DOS CARTÕES

    // -----------------------------------------

    function iniciarInclinacao() {

        if (reduzMovimento || !window.matchMedia("(pointer: fine)").matches) {

            return;

        }



        $$(".produto-destaque, .produto-card, .card-equipe").forEach(function (el) {

            el.addEventListener("pointermove", function (evento) {

                const c = el.getBoundingClientRect();

                const x = (evento.clientX - c.left) / c.width - .5;

                const y = (evento.clientY - c.top) / c.height - .5;



                el.style.setProperty("--ry", (x * 7).toFixed(2) + "deg");

                el.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");

            });



            el.addEventListener("pointerleave", function () {

                el.style.setProperty("--rx", "0deg");

                el.style.setProperty("--ry", "0deg");

            });

        });

    }



    // -----------------------------------------

    // FAIXA DE PRODUTOS EM MOVIMENTO (repete para o loop)

    // -----------------------------------------

    function iniciarTicker() {

        $$(".ticker-trilha").forEach(function (trilha) {

            trilha.innerHTML += trilha.innerHTML;

        });

    }



    // -----------------------------------------

    // DO PLANTIO AO MERCADO (abas interativas)

    // -----------------------------------------

    function iniciarJornada() {

        const secao = $(".jornada");



        if (!secao) {

            return;

        }



        const trilha = $(".jornada-trilha", secao);

        const abas = $$(".jornada-no", secao);

        const paineis = $$(".jornada-painel", secao);

        let atual = 0;

        let temporizador = null;

        let usouManual = false;



        function ir(indice, foco) {

            atual = (indice + abas.length) % abas.length;



            abas.forEach(function (aba, i) {

                const ativa = i === atual;

                aba.classList.toggle("ativo", ativa);

                aba.classList.toggle("feito", i < atual);

                aba.setAttribute("aria-selected", ativa ? "true" : "false");

                aba.tabIndex = ativa ? 0 : -1;

                paineis[i].classList.toggle("ativo", ativa);

            });



            trilha.style.setProperty("--prog", (atual / (abas.length - 1)).toFixed(3));



            if (foco) {

                abas[atual].focus();

            }

        }



        function parar() {

            window.clearInterval(temporizador);

            temporizador = null;

        }



        function tocar() {

            if (reduzMovimento || usouManual || temporizador) {

                return;

            }



            temporizador = window.setInterval(function () { ir(atual + 1); }, 4800);

        }



        abas.forEach(function (aba, i) {

            aba.addEventListener("click", function () {

                usouManual = true;

                parar();

                ir(i);

            });



            aba.addEventListener("keydown", function (evento) {

                const teclas = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };



                if (teclas[evento.key]) {

                    evento.preventDefault();

                    usouManual = true;

                    parar();

                    ir(atual + teclas[evento.key], true);

                }

            });

        });



        secao.addEventListener("pointerenter", parar);

        secao.addEventListener("pointerleave", tocar);



        if ("IntersectionObserver" in window) {

            new IntersectionObserver(function (entradas) {

                if (entradas[0].isIntersecting) { tocar(); } else { parar(); }

            }, { threshold: 0.4 }).observe(secao);

        }



        ir(0);

    }



    // -----------------------------------------

    // TÍTULOS DOS BANNERS: palavra por palavra

    // -----------------------------------------

    function iniciarTitulos() {

        if (reduzMovimento) {

            return;

        }



        $$(".capa-pagina h1, .pagina-topo h1, .conteudo-capa h1").forEach(function (h1) {

            if (h1.children.length) {

                return;

            }



            const texto = h1.textContent.trim();

            h1.setAttribute("aria-label", texto);

            h1.textContent = "";



            texto.split(/\s+/).forEach(function (palavra, i) {

                const caixa = document.createElement("span");

                const interno = document.createElement("span");



                caixa.className = "pal";

                caixa.setAttribute("aria-hidden", "true");

                interno.style.setProperty("--i", i);

                interno.textContent = palavra;

                caixa.appendChild(interno);

                h1.appendChild(caixa);

                h1.appendChild(document.createTextNode(" "));

            });

        });

    }



    // -----------------------------------------

    // WHATSAPP FLUTUANTE

    // -----------------------------------------

    function iniciarWhatsapp() {

        const numero = WHATSAPP_NUMERO.replace(/\D/g, "");

        const link = document.createElement("a");



        link.className = "whatsapp-flutuante";

        link.href = numero ? ("https://wa.me/" + numero + "?text=" + encodeURIComponent(WHATSAPP_SAUDACAO)) : ("https://wa.me/?text=" + encodeURIComponent(WHATSAPP_SAUDACAO));

        link.target = "_blank";

        link.rel = "noopener";

        link.setAttribute("aria-label", "Conversar pelo WhatsApp");

        link.innerHTML =

            '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +

            '<path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.3 14.96l-.3-.19-3.1.82.83-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8zM8.6 7.5c-.2 0-.5.07-.75.35-.26.28-1 .98-1 2.4s1.03 2.78 1.17 2.97c.15.2 2 3.2 4.9 4.36 2.4.95 2.9.76 3.42.7.52-.05 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.33-.28-.14-1.68-.83-1.94-.92-.26-.1-.45-.14-.64.14-.19.28-.73.92-.9 1.11-.16.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.64-1.55-.88-2.12-.23-.55-.47-.48-.64-.49z"/></svg>' +

            "<span>Fale conosco</span>";



        document.body.appendChild(link);

    }



    // -----------------------------------------

    // TRANSIÇÃO SUAVE ENTRE PÁGINAS

    // -----------------------------------------

    function iniciarTransicoes() {

        if (reduzMovimento) {

            return;

        }



        window.addEventListener("pageshow", function () {

            document.body.classList.remove("saindo");

        });



        document.addEventListener("click", function (evento) {

            const a = evento.target.closest("a[href]");



            if (!a || evento.defaultPrevented || evento.button !== 0 ||

                evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey ||

                a.target === "_blank" || a.hasAttribute("download")) {

                return;

            }



            const url = new URL(a.href, location.href);



            if (url.origin !== location.origin || url.pathname === location.pathname && url.hash) {

                return;

            }



            if (!/\.html?$|\/$/.test(url.pathname)) {

                return;

            }



            evento.preventDefault();

            document.body.classList.add("saindo");

            window.setTimeout(function () { location.href = a.href; }, 220);

        });

    }



    // -----------------------------------------

    // INICIALIZAÇÃO (um recurso com erro não derruba os outros)

    // -----------------------------------------

    [

        iniciarImagensAusentes,

        iniciarMenu,

        iniciarRolagem,

        iniciarEntradas,

        iniciarContadores,

        iniciarBrilhoCartoes,

        iniciarProdutos,

        iniciarVideos,

        iniciarFormulario,

        iniciarLinksVazios,

        iniciarCapa,

        iniciarMagneticos,

        iniciarInclinacao,

        iniciarTicker,

        iniciarJornada,

        iniciarTitulos,

        iniciarWhatsapp,

        iniciarTransicoes

    ].forEach(function (funcao) {

        try {

            funcao();

        } catch (erro) {

            console.error("[Grupo BB] Erro em " + funcao.name + ":", erro);

        }

    });

})();