"use client";

import Link from "next/link";

import { registerUserAction } from "@/data/actions/auth-actions";
import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export function RegisterForm() {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { username: '', password: '', email: '' },
    validate: {
      username: (value) => (value.length < 1 ? 'Digite um username' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'E-mail inválido'),
      password: (value) => (value.length < 1 ? 'Digite um password' : null),
    },
  });

  async function handlerSigon(values: {username: string; password: string; email: string;}) {
    registerUserAction(values);
  }

  return (
    <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-3/12">
      <h1 className="text-xl font-semibold text-content-emphasis">Cadastro</h1>
      <div className="flex justify-between"></div>
      <form onSubmit={form.onSubmit((values) => handlerSigon(values))}>
        <TextInput
          label="Username"
          placeholder="username"
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <TextInput
          label="E-mail"
          placeholder="your@email.com"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
        <TextInput
          type="password"
          label="Senha"
          placeholder="senha"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit">Cadastrar</Button>
        </Group>
      </form>
      <div className="mt-4 text-center text-sm">
        Você tem uma conta?
        <Link className="underline ml-2" href="/login">
          Entrar
        </Link>
      </div>
    </div>
  );
}