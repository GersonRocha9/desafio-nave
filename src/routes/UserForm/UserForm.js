import Button from 'components/Button'
import Column from 'components/Column'
import Input from 'components/Input'
import Row from 'components/Row'
import Text from 'components/Text'
import { getToken } from 'helpers'
import { loginResolver } from 'helpers/yup-schemas'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const UserForm = () => {
  const [name, setName] = useState('')
  const [job_role, setJobRole] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [admission_date, setAdmissionDate] = useState('')
  const [project, setProject] = useState('')
  const [url, setUrl] = useState('')

  const { errors } = useForm({ resolver: loginResolver })

  const createNaver = async data => {
    const response = await fetch('https://navedex-api.herokuapp.com/v1/navers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },

      body: JSON.stringify(data)
    })
    const json = await response.json()
  }

  return (
    <Column alignItems='center'>
      <Column as='form' width='100%' maxWidth='700px' marginTop={40} onSubmit={createNaver} position='relative'>
        <Text fontWeight='bold' mb={20} fontSize={24} textAlign='center'>
          Adicionar Naver
        </Text>

        <Row justifyContent='space-between' alignItems='center' width='100%'>
          <Input
            label='Nome'
            name='name'
            placeholder='Nome'
            type='text'
            width='100%'
            marginRight={20}
            value={name}
            onChange={e => setName(e.target.value)}
            error={errors.name?.message}
          />

          <Input
            label='Cargo'
            name='job_role'
            placeholder='Cargo'
            type='job_role'
            width='100%'
            value={job_role}
            onChange={e => setJobRole(e.target.value)}
            error={errors.job_role?.message}
          />
        </Row>

        <Row justifyContent='space-between' alignItems='center' width='100%'>
          <Input
            label='Data de Nascimento'
            name='birthdate'
            placeholder='Data de Nascimento'
            type='text'
            width='100%'
            marginRight={20}
            value={birthdate}
            onChange={e => setBirthdate(e.target.value)}
            error={errors.birthdate?.message}
          />

          <Input
            label='Data de Admissão'
            name='admission_date'
            placeholder='Data de Admissão'
            type='text'
            width='100%'
            value={admission_date}
            onChange={e => setAdmissionDate(e.target.value)}
            error={errors.admission_date?.message}
          />
        </Row>

        <Row justifyContent='space-between' alignItems='center' width='100%'>
          <Input
            label='Projetos que participou'
            name='project'
            placeholder='Projetos que participou'
            type='text'
            width='100%'
            marginRight={20}
            value={project}
            onChange={e => setProject(e.target.value)}
            error={errors.project?.message}
          />

          <Input
            label='URL da foto do Naver'
            name='url'
            placeholder='URL da foto do Naver'
            type='text'
            width='100%'
            value={url}
            onChange={e => setUrl(e.target.value)}
            error={errors.url?.message}
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
            onClick={() => createNaver({ name, job_role, birthdate, admission_date, project, url })}
          >
            Salvar
          </Button>
        </Row>
      </Column>
    </Column>
  )
}

export default UserForm
