import Button from 'components/Button'
import Column from 'components/Column'
import Image from 'components/Image'
import Input from 'components/Input'
import Row from 'components/Row'
import { useUser } from 'context/user-context'
import { loginResolver } from 'helpers/yup-schemas'
import React from 'react'
import { useForm } from 'react-hook-form'

import Logo from '../../assets/logo.svg'

const Login = () => {
  const { login } = useUser()

  const { register, handleSubmit, errors, formState } = useForm({ resolver: loginResolver })

  return (
    <Row justifyContent='center' alignItems='center' height='100vh'>
      <Column
        as='form'
        onSubmit={handleSubmit(login)}
        width={450}
        border='1px solid #212121'
        alignItems='center'
        display='flex'
        justifyContent='center'
        p={40}
      >
        <Image src={Logo} alt='nave.rs Logo' marginBottom={40} />

        <Input name='email' ref={register} label='E-mail' placeholder='E-mail' error={errors.email?.message} />

        <Input
          name='password'
          ref={register}
          label='Senha'
          placeholder='Senha'
          error={errors.password?.message}
          type='password'
        />

        <Button isLoading={formState.isSubmitting}>Entrar</Button>
      </Column>
    </Row>
  )
}

export default Login
