'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { ErrorPopup, SuccessPopup } from '@/components/Common';
import { Button, Card, Header, Logo, RegisterLink, StyledErrorMessage, StyledField, StyledSelect, Wrapper,  } from '@/components/LoginComp';
import Image from 'next/image';

const RegisterPage = () => {
  const router = useRouter();
  const [emailExists, setEmailExists] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required('Nome é obrigatório'),
    password: Yup.string().min(4, 'Mínimo de 4 caracteres').required('Senha é obrigatória'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    //ocupacaoid: Yup.number().moreThan(0, 'ocupacao é obrigatório').required('ocupacao é obrigatório'),
  });

  const handleSubmit = async (
    values: {
      nome: string;
      password: string;
      email: string;
      //ocupacaoid: number;
    },
    { setSubmitting }: any
  ) => {
    setEmailExists(false);
    setEmailError(null);
    setErrorMessage(null);

    try {
      const credRes = await axios.post('/api/createCredencial', {
        username: values.email,
        password: values.password,
      });

      const credencialId = credRes.data.id;

      const signinResp = await axios.post('/api/login', {
        username: values.email,
        password: values.password,
      });

      const token = signinResp.data.token;
      localStorage.setItem('token', token);

      await axios.post(
        '/api/createUsuario',
        {
          nome: values.nome,
          ocupacaoid: 2,
          credencialId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage('Cadastro realizado com sucesso!');
      setTimeout(() => {
                  setSuccessMessage(null);
                  router.push("/login");
                }, 2000);      

    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao criar usuário.';
      
      if (message.toLowerCase().includes('username') || message.toLowerCase().includes('email')) {
        setEmailExists(true);
        setEmailError('Já existe uma conta com este e-mail. Cadastre outro e-mail.');
      } else {
        setErrorMessage(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Wrapper>
      <Logo src="/icons/logo-aulagen.png" alt="Logo AulaGen" />
      <Card>
        <Header>
          <Image src="/icons/login.png" alt="Login Icon" width={36} height={36} />
          <h1>Cadastro</h1>
          {successMessage && (
          <SuccessPopup>
            {successMessage}
              <button onClick={() => setSuccessMessage(null)}>✖</button>
          </SuccessPopup>
        )}
        {errorMessage && (
          <ErrorPopup>
            {errorMessage}
              <button onClick={() => setErrorMessage(null)}>✖</button>
          </ErrorPopup>
        )}
        </Header>
      <Formik
        initialValues={{ nome: '', password: '', email: ''}}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
           <Form style={{ width: '100%' }}>
            
              <StyledField name="nome" type="text" placeholder="Nome" />
              <StyledErrorMessage><ErrorMessage name="nome" /></StyledErrorMessage>

              <StyledField name="password" type="password" placeholder="Senha" />
              <StyledErrorMessage><ErrorMessage name="password" /></StyledErrorMessage>

              <StyledField
                name="email"
                type="email"
                placeholder="Email"
                //disabled={emailExists}
                onChange={(e: { target: { value: any; }; }) => {
                  setFieldValue('email', e.target.value);
                  setEmailExists(false); 
                  setEmailError(null); 
                }}
              />
              <StyledErrorMessage>
                <ErrorMessage name="email" />
                {emailError && <div>{emailError}</div>}
              </StyledErrorMessage>

              

              <Button type="submit" disabled={isSubmitting || emailExists}>
                Cadastrar
              </Button>

              <RegisterLink>
                  Já tem uma conta? <a onClick={() => router.push('/login')}>Faça login</a>
              </RegisterLink>
            
          </Form>
        )}
      </Formik>
      </Card>
    </Wrapper>
  );
};

export default RegisterPage;

