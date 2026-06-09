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
    applyTheme(theme);
    saveTheme(theme);
  });
}

clearBtn.addEventListener('click', ()=>{
  deleteCookie(THEME_COOKIE);
  applyTheme('light');
});

document.addEventListener('DOMContentLoaded', ()=>{
  const pref = getCookie(THEME_COOKIE);
  applyTheme(pref || 'light');
});
