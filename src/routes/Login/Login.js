import axios from 'axios'
import Button from 'components/Button'
import Column from 'components/Column'
import Image from 'components/Image'
import Input from 'components/Input'
import Row from 'components/Row'
import { setAccessToken } from 'helpers'
import { loginResolver } from 'helpers/yup-schemas'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

import Logo from '../../assets/logo.svg'

// import { useUser } from 'context/user-context'
const Login = () => {
  // const { login } = useUser()

  const queryClient = useQueryClient()

  const onLoginHandler = async data => {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}v1/users/login`, {
      email: data.email,
      password: data.password
    })

    //localStorage.setItem('userToken', result.data.token)
    setAccessToken(result.data.token)
    queryClient.setQueryData('user', result.data)
  }

  const { isLoading: isLoggingIn, isError, error, data, isSuccess, mutate } = useMutation(data => onLoginHandler(data))

  const { register, handleSubmit, errors, formState } = useForm({ resolver: loginResolver })

  return (
    <Row justifyContent='center' alignItems='center' height='100vh'>
      <Column
        as='form'
        onSubmit={handleSubmit(data => {
          mutate(data)
        })}
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
