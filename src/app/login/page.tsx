/*'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { Button, Card, Header, RegisterLink, StyledErrorMessage, StyledField, Wrapper } from '@/components/LoginComp';
import jwt from "jsonwebtoken";

const LoginPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
 
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const decodeToken = (token: string) => {
    try {
      const decoded = jwt.decode(token);
      const credencialId = (decoded as any).credencialId;
      return credencialId;
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      return null;
    }
  };
  
  const handleSubmit = async (values: { email: string; password: string }) => {
    setErrorMessage(null); // Limpa mensagem anterior ao tentar novo login
    setEmailError(null);
    try {
      const response = await axios.post(
        '/api/login',
        { username: values.email, password: values.password },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      localStorage.setItem('token', response.data.token);
      const credencialId = decodeToken(response.data.token);
      localStorage.setItem('credencialId', credencialId);
      
      const usuarioResponse = await axios.get(`/api/usuario/${credencialId}`, {
          headers: {
            Authorization: `Bearer ${response.data.token}`,
          },
      });

      if (usuarioResponse.data && usuarioResponse.data.length > 0) {
          const usuario = usuarioResponse.data[0];
          console.log("Usuário encontrado:", usuario);
         if (usuario?.nome) {
            localStorage.setItem('usuario', usuario.nome);            
          }
      }

      router.push('/admin');
       
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao autenticar.';
      setErrorMessage(message);
    }
  };

  return (
    <Wrapper>
      <Card>
        <Header>
          <img src="/icons/login.svg" alt="Login Icon" />
          <h1>Login</h1>
        </Header>

        <Formik 
          initialValues={{ email: '', password: '' }} 
          validationSchema={validationSchema} 
          onSubmit={handleSubmit}>
           {({ setFieldValue, isSubmitting, values }) => (
            <Form style={{ width: '100%' }}>
              <StyledField 
                name="email" 
                type="email" 
                placeholder="Email" 
                onChange={(e: { target: { value: any; }; }) => {
                  setFieldValue('email', e.target.value);
                  setEmailError(null); 
                }}/>
              <StyledErrorMessage><ErrorMessage name="email" /></StyledErrorMessage>

              <StyledField name="password" type="password" placeholder="Senha" />
              <StyledErrorMessage><ErrorMessage name="password" /></StyledErrorMessage>

              {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}

              <Button type="submit">Entrar</Button>

              <RegisterLink>
                Não tem uma conta? <a onClick={() => router.push('/registrar')}>Criar conta</a>
              </RegisterLink>
            </Form>
          )}
        </Formik>
      </Card>
    </Wrapper>
  );
};

export default LoginPage;

*/

'use client';

import { useRouter } from 'next/navigation';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import jwt from 'jsonwebtoken';
import {
  Button,
  Card,
  Header,
  RegisterLink,
  StyledErrorMessage,
  StyledField,
  Wrapper,
} from '@/components/LoginComp';
import styled from 'styled-components';

// Novo componente para o logo
const Logo = styled.img`
  width: 200px;
  margin-bottom: 24px;
`;

const LoginPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const decodeToken = (token: string) => {
    try {
      const decoded = jwt.decode(token);
      const credencialId = (decoded as any).credencialId;
      return credencialId;
    } catch (error) {
      console.error('Erro ao decodificar o token:', error);
      return null;
    }
  };

  const handleSubmit = async (values: { email: string; password: string }) => {
    setErrorMessage(null);
    setEmailError(null);
    try {
      const response = await axios.post(
        '/api/login',
        { username: values.email, password: values.password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      localStorage.setItem('token', response.data.token);
      const credencialId = decodeToken(response.data.token);
      localStorage.setItem('credencialId', credencialId);

      const usuarioResponse = await axios.get(`/api/usuario/${credencialId}`, {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      if (usuarioResponse.data && usuarioResponse.data.length > 0) {
        const usuario = usuarioResponse.data[0];
        if (usuario?.nome) {
          localStorage.setItem('usuario', usuario.nome);
        }
      }

      router.push('/admin');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao autenticar.';
      setErrorMessage(message);
    }
  };

  return (
    <Wrapper>
      <Logo src="/icons/logo-aulagen.png" alt="Logo AulaGen" />
      <Card>
        <Header>
          <img src="/icons/login.png" alt="Login Icon" />
          <h1>Login</h1>
        </Header>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form style={{ width: '100%' }}>
              <StyledField
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e: { target: { value: any } }) => {
                  setFieldValue('email', e.target.value);
                  setEmailError(null);
                }}
              />
              <StyledErrorMessage>
                <ErrorMessage name="email" />
              </StyledErrorMessage>

              <StyledField name="password" type="password" placeholder="Senha" />
              <StyledErrorMessage>
                <ErrorMessage name="password" />
              </StyledErrorMessage>

              {errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}

              <Button type="submit">Entrar</Button>

              <RegisterLink>
                Não tem uma conta?{' '}
                <a onClick={() => router.push('/registrar')}>Criar conta</a>
              </RegisterLink>
            </Form>
          )}
        </Formik>
      </Card>
    </Wrapper>
  );
};

export default LoginPage;
