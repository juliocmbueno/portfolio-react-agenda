import {NextPage} from "next";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";

import styles from './login.module.scss';
import {useRouter} from "next/router";

const Login: NextPage<any> = () =>{

  const router = useRouter();
  const [isUsuarioLogado, setIsUsuarioLogado] = useState(true);
  const [formulario, setFormulario]:any = useState({email: '', senha: '', lembrarDeMim: false});

  const onSubmit = (event:FormEvent) => {
    event.preventDefault();
    localStorage.setItem('usuario-logado', JSON.stringify({nome: 'admin'}));
    router.push('/').then();
  };

  const onModelChange = (event:ChangeEvent<any>, model:any) => {

    if(event.target.type == 'checkbox'){
      formulario[model] = event.target.checked;

    } else {
      formulario[model] = event.target.value;

    }

    setFormulario(() => ({...formulario}));
  };

  useEffect(() => {
    const possuiUsuarioLogado = localStorage.getItem('usuario-logado') != null;

    if(possuiUsuarioLogado){
      router.push('/').then();

    } else if(isUsuarioLogado){
      setIsUsuarioLogado(false);

    }
  }, [isUsuarioLogado]);

  return (
    <>{!isUsuarioLogado &&
      <div className={styles.formSignContainer + ' text-center'}>
          <div className={styles.formSign}>
              <form onSubmit={onSubmit}>
                  <h1 className="h2 mb-3 fw-normal">Agenda</h1>

                  <div className={styles.formFloating+ ' form-floating'}>
                      <input
                          required
                          type="email"
                          className="form-control"
                          id="input-email"
                          placeholder="email@exemplo.com"
                          value={formulario.email}
                          onChange={(event) => onModelChange(event, 'email')}/>
                      <label htmlFor="input-email">Email</label>
                  </div>
                  <div className={styles.formFloating+ ' form-floating'}>
                      <input
                          required
                          type="password"
                          className="form-control"
                          id="input-senha"
                          placeholder="senha"
                          value={formulario.senha}
                          onChange={(event) => onModelChange(event, 'senha')}/>
                      <label htmlFor="input-senha">Senha</label>
                  </div>

                  <div className={styles.checkbox + ' checkbox mb-3'}>
                      <label>
                          <input
                              type="checkbox"
                              id="input-lembrar-de=mim"
                              value={formulario.lembrarDeMim}
                              onChange={(event) => onModelChange(event, 'lembrarDeMim')}/> Lembrar de mim
                      </label>
                  </div>
                  <button className="w-100 btn btn-lg btn-primary" type="submit">Entrar</button>
                  <p className="mt-3 mb-3 text-muted">&copy; {new Date().getFullYear()}</p>
              </form>
          </div>
      </div>

    }</>
  )
};

export default Login;
