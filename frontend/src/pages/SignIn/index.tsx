import React from 'react';
import { FiLogIn } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faz o teu login</h1>

        <input placeholder="E-Mail" />
        <input type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>

        <a href="forgot">Esqueceste a password?</a>
      </form>

      <a href="login">
        <FiLogIn />
        Criar Conta
      </a>
    </Content>

    <Background />
  </Container>
);

export default SignIn;
