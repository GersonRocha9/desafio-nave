import Button from 'components/Button'
import Column from 'components/Column'
import Input from 'components/Input'
import Loader from 'components/Loader'
import Row from 'components/Row'
import Text from 'components/Text'
import { useModal } from 'context/modal-context'
import { useUser } from 'context/user-context'
import { userFormResolver } from 'helpers/yup-schemas'
import React from 'react'
import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import { createUser, deleteUser, getUserById, updateUser } from 'services/users'

const UserForm = () => {
  const { handleOpenModal, handleCloseModal } = useModal()
  const { userRoles, isLoadingRoles } = useUser()

  const {
    handleSubmit,
    register,
    errors,
    reset,
    control,
    formState: { isSubmitting }
  } = useForm({
    resolver: userFormResolver
  })

  const { id } = useParams()
  const history = useHistory()

  const { isFetching: isLoadingUser, data: user } = useQuery(['userById', id], getUserById, {
    enabled: !!id
  })

  useEffect(() => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
      job_role: user?.job_role || '',
      role_id: user?.role?.id || '',
      age: user?.age || '',
      timeAsEmployee: user?.timeAsEmployee || '',
      project: user?.project || '',
      url: user?.url || ''
    })
  }, [user, reset])

  const isLoading = useMemo(() => isLoadingRoles || isLoadingUser, [isLoadingRoles, isLoadingUser])

  const onSubmit = async ({ confirmPassword, ...values }) => {
    try {
      id ? await updateUser(id, values) : await createUser(values)
      handleOpenModal({
        type: 'success',
        content: id ? 'Usuário atualizado com sucesso' : 'Usuário criado com sucesso',
        onClose: () => history.goBack()
      })
    } catch (err) {
      handleOpenModal({ type: 'error' })
    }
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id)
      handleCloseModal()
      history.goBack()
    } catch (err) {
      handleCloseModal()
      handleOpenModal({ type: 'error' })
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Column alignItems='center'>
      {!!id && (
        <Row width='100%' justifyContent='flex-end'>
          <Button
            backgroundColor='red'
            type='button'
            fontWeight='bold'
            onClick={() =>
              handleOpenModal({
                type: 'confirmation',
                title: 'Atenção',
                content: 'Tem certeza de que deseja excluir o usuário?',
                onConfirm: handleDeleteUser
              })
            }
          >
            Excluir
          </Button>
        </Row>
      )}
      <Column
        as='form'
        width='100%'
        maxWidth='700px'
        marginTop={40}
        onSubmit={handleSubmit(onSubmit)}
        position='relative'
      >
        <Text fontWeight='bold' mb={20} fontSize={24} textAlign='center'>
          {id ? 'Editar Naver' : 'Adicionar Naver'}
        </Text>

        <Row justifyContent='space-between' alignItems='center' width='100%'>
          <Input
            label='Nome'
            name='name'
            ref={register}
            placeholder='Nome'
            error={errors?.name?.message}
            type='text'
            width='100%'
            marginRight={20}
          />

          <Input
            label='Cargo'
            name='job_role'
            ref={register}
            placeholder='Cargo'
            error={errors?.job_role?.message}
            type='job_role'
            width='100%'
          />
        </Row>

        <Row justifyContent='space-between' alignItems='center' width='100%'>
          <Input
            label='Idade'
            name='age'
            ref={register}
            placeholder='Idade'
            error={errors?.age?.message}
            type='text'
            width='100%'
            marginRight={20}
          />

          <Input
            label='Tempo de Empresa'
            name='timeAsEmployee'
            ref={register}
            placeholder='Tempo de Empresa'
            error={errors?.timeAsEmployee?.message}
            type='text'
            width='100%'
          />
        </Row>

        <Row justifyContent='space-between' alignItems='center' width='100%'>
          <Input
            label='Projetos que participou'
            name='project'
            ref={register}
            placeholder='Projetos que participou'
            error={errors?.project?.message}
            type='text'
            width='100%'
            marginRight={20}
          />

          <Input
            label='URL da foto do Naver'
            name='url'
            ref={register}
            placeholder='URL da foto do Naver'
            error={errors?.url?.message}
            type='text'
            width='100%'
          />
        </Row>

        <Row mt={14} flexWrap='wrap' justifyContent='flex-end' alignItems='center'>
          <Button
            width={200}
            backgroundColor='primary.main'
            fontWeight='bold'
            ml={[0, 8]}
            mt={[8, 0]}
            type='submit'
            disabled={isSubmitting}
          >
            Salvar
          </Button>
        </Row>
      </Column>
    </Column>
  )
}

export default UserForm
