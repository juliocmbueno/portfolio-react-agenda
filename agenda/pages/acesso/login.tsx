import {NextPage} from "next";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";

import styles from './login.module.scss';

import {useRouter} from "next/router";
import useUsuarioLogado from "agenda/app/core/util/use-usuario-logado";

const Login: NextPage<any> = () =>{

  const usuarioLogado = useUsuarioLogado();
  const router = useRouter();
  const [formulario, setFormulario]:any = useState({email: '', senha: '', lembrarDeMim: false});

  const onSubmit = (event:FormEvent) => {
    event.preventDefault();
    localStorage.setItem('usuario-logado', JSON.stringify({nome: 'admin'}));
    usuarioLogado.setIsLogado(true);
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
    if(usuarioLogado.isLogado){
      const urlAcessada = localStorage.getItem('url-acessada');
      router.push(urlAcessada ? urlAcessada : '/').then(() => localStorage.removeItem('url-acessada'));
    }
  }, [usuarioLogado.isLogado]);


  if(usuarioLogado.isLogado == false){
    return (
      <div className={styles.formSignContainer}>
        <div className={styles.formSign}>
          <div className="card">
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="d-flex flex-column align-items-center justify-content-center mb-3">
                  <i className={'fas fa-user fa-5x ' + styles.iconeTop}/>
                </div>

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
          <div className="row justify-content-center">
            <div className="col-auto"><button type="button" className={'btn btn-sm btn-link '+styles.btnNovoPorAqui}>Novo por aqui</button></div>
          </div>
        </div>
      </div>
    );

  } else {
    return <div/>

  }
};

export default Login;
