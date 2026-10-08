// Cadastro demonstrativo: eventos, validação, armazenamento e depuração.
function inicializarCadastro() {
  const form = document.querySelector('#form-cadastro');
  if (!form) return;
  const aviso = document.querySelector('#alerta');
  const chave = 'revivendo_cadastro_rascunho_v1';
  const camposRascunho = ['nome', 'email', 'endereco', 'numero', 'bairro', 'cidade', 'estado'];
  const campos = [...form.querySelectorAll('input, select')];
  const log = (evento, detalhe) => console.info(`[Cadastro] ${evento}`, detalhe ?? '');

  function mostrarAviso(mensagem, tipo) {
    aviso.textContent = mensagem;
    aviso.className = `alerta ${tipo}`;
    aviso.hidden = false;
  }
  function mensagemErro(campo) {
    if (campo.validity.valueMissing) return 'Este campo é obrigatório.';
    if (campo.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value.trim())) return 'Digite um e-mail válido.';
    if (campo.validity.patternMismatch) return campo.title || 'Confira o formato informado.';
    if (campo.validity.tooShort) return `Digite pelo menos ${campo.minLength} caracteres.`;
    if (campo.validity.typeMismatch) return 'Formato inválido.';
    return campo.validity.valid ? '' : 'Confira este campo.';
  }
  function validarCampo(campo) {
    if (!campo.matches('input, select')) return true;
    const erro = mensagemErro(campo);
    const mensagem = document.getElementById(`erro-${campo.id}`);
    campo.classList.toggle('campo-invalido', Boolean(erro));
    campo.setAttribute('aria-invalid', String(Boolean(erro)));
    if (mensagem) mensagem.textContent = erro;
    return !erro;
  }
  campos.forEach(campo => {
    const mensagem = document.createElement('small');
    mensagem.id = `erro-${campo.id}`;
    mensagem.className = 'mensagem-campo';
    mensagem.setAttribute('aria-live', 'polite');
    campo.insertAdjacentElement('afterend', mensagem);
    campo.setAttribute('aria-describedby', mensagem.id);
  });
  function salvar() {
    const rascunho = Object.fromEntries(camposRascunho.map(id => [id, form.elements.namedItem(id).value]));
    try {
      localStorage.setItem(chave, JSON.stringify(rascunho));
      mostrarAviso('Rascunho salvo neste navegador. Dados sensíveis não foram armazenados.', 'sucesso');
      log('Rascunho salvo', Object.keys(rascunho));
    } catch (erro) {
      mostrarAviso('Não foi possível salvar o rascunho neste navegador.', 'erro');
      console.error('[Cadastro] Falha ao salvar', erro);
    }
  }
  function restaurar() {
    try {
      const texto = localStorage.getItem(chave);
      if (!texto) return;
      const dados = JSON.parse(texto);
      if (!dados || typeof dados !== 'object' || Array.isArray(dados)) return;
      camposRascunho.forEach(id => {
        if (typeof dados[id] === 'string') form.elements.namedItem(id).value = dados[id];
      });
      mostrarAviso('Rascunho restaurado. Confira e complete os campos restantes.', 'sucesso');
      log('Rascunho restaurado');
    } catch (erro) {
      console.error('[Cadastro] Falha ao restaurar', erro);
      mostrarAviso('Não foi possível recuperar o rascunho salvo.', 'erro');
    }
  }
  form.addEventListener('submit', evento => {
    evento.preventDefault();
    const invalidos = campos.filter(campo => !validarCampo(campo));
    if (invalidos.length) {
      mostrarAviso(`Corrija ${invalidos.length} campo(s) destacado(s) antes de continuar.`, 'erro');
      invalidos[0].focus();
      log('Validação falhou', invalidos.map(c => c.id));
      return;
    }
    mostrarAviso('Cadastro validado com sucesso! Demonstração: nenhum dado foi enviado ao servidor.', 'sucesso');
    log('Validação concluída com sucesso');
  });
  form.addEventListener('input', evento => {
    const campo = evento.target;
    if (campo.matches('input, select')) {
      if (campo.value || campo.classList.contains('campo-invalido')) validarCampo(campo);
    }
  });
  form.addEventListener('change', evento => {
    if (evento.target.matches('input, select')) validarCampo(evento.target);
  });
  form.addEventListener('reset', () => {
    try { localStorage.removeItem(chave); } catch (erro) { console.error('[Cadastro] Falha ao limpar', erro); }
    requestAnimationFrame(() => {
      campos.forEach(campo => {
        campo.classList.remove('campo-invalido');
        campo.removeAttribute('aria-invalid');
        document.getElementById(`erro-${campo.id}`).textContent = '';
      });
      mostrarAviso('Formulário e rascunho limpos.', 'sucesso');
    });
    log('Formulário limpo');
  });
  document.querySelector('#salvar-rascunho').addEventListener('click', salvar);
  document.querySelector('#editar-cadastro').addEventListener('click', () => {
    form.elements.namedItem('nome').focus();
    mostrarAviso('Modo de edição: altere os campos e salve novamente.', 'sucesso');
    log('Edição iniciada');
  });
  restaurar();
}
document.addEventListener("DOMContentLoaded", inicializarCadastro);

