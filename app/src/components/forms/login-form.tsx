"use client";

import Link from "next/link";
import { loginUserAction } from "@/data/actions/auth-actions";

import { Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export function LoginForm() {

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { username: '', password: '' },
    validate: {
      username: (value) => (value.length < 1 ? 'Digite um username' : null),
      password: (value) => (value.length < 1 ? 'Digite um password' : null),
    },
  });

  function handdlerLogin(values: { username: string; password: string; }): void | Promise<any> {
    const resp = loginUserAction(values)

  }

  return (
    <div className="space-y-4 rounded-md bg-white p-6 shadow-md border border-gray-200 mt-4 w-3/12">
      <h1 className="text-xl font-semibold text-content-emphasis">Entrar</h1>
      <div className="flex justify-between"></div>
        <form onSubmit={form.onSubmit((values) => handdlerLogin(values))}>
          <TextInput
            label="Username"
            placeholder="username"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <TextInput
            type="password"
            label="Senha"
            placeholder="senha"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <Group justify="flex-end" mt="md">
            <Button type="submit">Entrar</Button>
          </Group>
        </form>
        <div className="mt-4 text-center text-sm">
          Não possui uma conta?
          <Link className="underline ml-2" href="signup">
            Cadastrar
          </Link>
        </div>
      </div>
    
  );
}