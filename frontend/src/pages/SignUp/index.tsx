import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />

    <Content>
      <img src={logoImg} alt="GoBarber" />

      <form>
        <h1>Faz o teu registo</h1>

        <Input name="name" icon={FiUser} placeholder="E-Mail" />
        <Input name="email" icon={FiMail} placeholder="E-Mail" />
        <Input
          name="password"
          icon={FiLock}
          type="password"
          placeholder="Senha"
        />

        <Button type="submit">Registar</Button>
      </form>

      <a href="login">
        <FiArrowLeft />
        Voltar para login
      </a>
    </Content>
  </Container>
);

export default SignUp;
