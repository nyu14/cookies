// Helpers de cookie
function setCookie(name, value, days){
  const expires = days ? "; expires=" + new Date(Date.now() + days*864e5).toUTCString() : "";
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name){
  const pairs = document.cookie.split('; ').map(c=>c.split('='));
  for(const [k,v] of pairs){
    if(k === name) return decodeURIComponent(v);
  }
  return null;
}

function deleteCookie(name){ setCookie(name, '', -1); }

// Lógica de tema
const THEME_COOKIE = 'site_theme';
const select = document.getElementById('theme-select');
const clearBtn = document.getElementById('clear-cookie');
const cookieSpan = document.getElementById('cookie-value');

function applyTheme(theme){
  // 'light' == tema padrão (remover o atributo)
  if(!theme || theme === 'light'){
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', theme);
  }
  // atualiza select e display
  if(select) select.value = theme || 'light';
  cookieSpan.textContent = theme || 'nenhum';
}

function saveTheme(theme){
  if(theme && theme !== 'light') setCookie(THEME_COOKIE, theme, 365);
  else deleteCookie(THEME_COOKIE);
}

if(select){
  select.addEventListener('change', ()=>{
    const theme = select.value;
    // Helpers de cookie
    function setCookie(name, value, days){ // define um cookie com nome, valor e opcionalmente dias de validade
      const expires = days ? "; expires=" + new Date(Date.now() + days*864e5).toUTCString() : ""; // calcula string de expiração se dias for informado
      document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/"; // atribui o cookie ao document.cookie (escapa o valor)
    }

    function getCookie(name){ // recupera o valor de um cookie pelo nome
      const pairs = document.cookie.split('; ').map(c=>c.split('=')); // divide cookies em pares [nome,valor]
      for(const [k,v] of pairs){ // itera sobre cada par
        if(k === name) return decodeURIComponent(v); // se o nome bater, retorna o valor decodificado
      }
      return null; // retorna null se não encontrar
    }

    function deleteCookie(name){ setCookie(name, '', -1); } // remove um cookie definindo validade no passado

    // Lógica de tema
    const THEME_COOKIE = 'site_theme'; // nome do cookie usado para salvar o tema
    const select = document.getElementById('theme-select'); // referência ao <select> de temas
    const clearBtn = document.getElementById('clear-cookie'); // botão para limpar o cookie
    const cookieSpan = document.getElementById('cookie-value'); // elemento que mostra o valor atual do cookie

    function applyTheme(theme){ // aplica o tema na página conforme o valor recebido
      // 'light' == tema padrão (remover o atributo)
      if(!theme || theme === 'light'){ // se não houver tema ou for 'light'
        document.documentElement.removeAttribute('data-theme'); // remove o atributo data-theme do root
      } else {
        document.documentElement.setAttribute('data-theme', theme); // define o atributo data-theme para o tema escolhido
      }
      // atualiza select e display
      if(select) select.value = theme || 'light'; // sincroniza o select com o tema (ou 'light' por padrão)
      cookieSpan.textContent = theme || 'nenhum'; // exibe o nome do tema ou 'nenhum' se não houver
    }

    function saveTheme(theme){ // persiste ou remove o cookie de tema
      if(theme && theme !== 'light') setCookie(THEME_COOKIE, theme, 365); // salva cookie por 365 dias se tema diferente de 'light'
      else deleteCookie(THEME_COOKIE); // senão, remove o cookie (tema padrão não é salvo)
    }

    if(select){ // se o elemento select existe na página
      select.addEventListener('change', ()=>{ // ouve mudança de seleção
        const theme = select.value; // pega o valor selecionado
        applyTheme(theme); // aplica o tema escolhido
        saveTheme(theme); // salva a preferência no cookie quando necessário
      });
    }

    clearBtn.addEventListener('click', ()=>{ // quando o botão de limpar for clicado
      deleteCookie(THEME_COOKIE); // remove o cookie de tema
      applyTheme('light'); // aplica o tema padrão 'light'
    });

    document.addEventListener('DOMContentLoaded', ()=>{ // quando o DOM estiver carregado
      const pref = getCookie(THEME_COOKIE); // lê preferência de tema do cookie
      applyTheme(pref || 'light'); // aplica a preferência ou usa 'light' por padrão
    });
