'use client';

import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { ErrorPopup, SuccessPopup } from '@/components/Common';
import { Button, Card, Header, RegisterLink, StyledErrorMessage, StyledField, StyledSelect, Wrapper,  } from '@/components/LoginComp';
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
    ocupacaoid: Yup.number().moreThan(0, 'ocupacao é obrigatório').required('ocupacao é obrigatório'),
  });

  const handleSubmit = async (
    values: {
      nome: string;
      password: string;
      email: string;
      ocupacaoid: number;
    },
    { setSubmitting }: any
  ) => {
    setEmailExists(false);
    setEmailError(null);
    setErrorMessage(null);

    try {
      // 1. Tentar criar credencial
      const credRes = await axios.post('/api/createCredencial', {
        username: values.email,
        password: values.password,
      });

      const credencialId = credRes.data.id;

      // 2. Logar e obter token
      const signinResp = await axios.post('/api/login', {
        username: values.email,
        password: values.password,
      });

      const token = signinResp.data.token;
      localStorage.setItem('token', token);

      // 3. Criar usuário
      await axios.post(
        '/api/createUsuario',
        {
          nome: values.nome,
          ocupacaoid: values.ocupacaoid,
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

      // Se o erro for de e-mail duplicado (credencial existente)
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
      <Card>
        <Header>
          <Image src="/icons/login.svg" alt="Login Icon" width={36} height={36} />
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
        initialValues={{ nome: '', password: '', email: '', ocupacaoid: 0 }}
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
                  setEmailExists(false); // Resetando estado ao alterar e-mail
                  setEmailError(null); 
                }}
              />
              <StyledErrorMessage>
                <ErrorMessage name="email" />
                {emailError && <div>{emailError}</div>}
              </StyledErrorMessage>

              <StyledSelect
                name="ocupacaoid"
                as="select"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setFieldValue('ocupacaoid', parseInt(e.target.value, 10))
                }
              >
                <option value={0}>Selecione o ocupacao</option>
                <option value={1}>Aluno</option>
                <option value={2}>Professor</option>
              </StyledSelect>
              <StyledErrorMessage><ErrorMessage name="ocupacaoid" /></StyledErrorMessage>

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

