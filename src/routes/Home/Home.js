import Button from 'components/Button'
import Column from 'components/Column'
import Image from 'components/Image'
import Modal from 'components/Modal'
import Row from 'components/Row'
import Text from 'components/Text'
import { useUser } from 'context/user-context'
import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'

import CloseIcon from '../../assets/close.svg'
import EditIcon from '../../assets/edit.svg'
import TrashIcon from '../../assets/trash.svg'

const Home = () => {
  const { logout } = useUser()

  const history = useHistory()
  window.redirect = history.push

  const [isOpen, setIsOpen] = useState(false)

  const navers = [
    {
      id: 1,
      name: 'Gerson Rocha',
      email: 'johndoe@gmail.com',
      role: 'Front-end Developer',
      phone: '+5511999999999',
      createdAt: '2020-01-01',
      avatarUrl: 'https://avatars.githubusercontent.com/u/38770302?v=4'
    },

    {
      id: 2,
      name: 'Gerson Rocha',
      email: 'johndoe@gmail.com',
      role: 'Front-end Developer',
      phone: '+5511999999999',
      createdAt: '2020-01-01',
      avatarUrl: 'https://avatars.githubusercontent.com/u/38770302?v=4'
    },

    {
      id: 3,
      name: 'Gerson Rocha',
      email: 'johndoe@gmail.com',
      role: 'Front-end Developer',
      phone: '+5511999999999',
      createdAt: '2020-01-01',
      avatarUrl: 'https://avatars.githubusercontent.com/u/38770302?v=4'
    },

    {
      id: 4,
      name: 'Gerson Rocha',
      email: 'johndoe@gmail.com',
      role: 'Front-end Developer',
      phone: '+5511999999999',
      createdAt: '2020-01-01',
      avatarUrl: 'https://avatars.githubusercontent.com/u/38770302?v=4'
    },

    {
      id: 5,
      name: 'Gerson Rocha',
      email: 'johndoe@gmail.com',
      role: 'Front-end Developer',
      phone: '+5511999999999',
      createdAt: '2020-01-01',
      avatarUrl: 'https://avatars.githubusercontent.com/u/38770302?v=4'
    },

    {
      id: 6,
      name: 'Gerson Rocha',
      email: 'johndoe@gmail.com',
      role: 'Front-end Developer',
      phone: '+5511999999999',
      createdAt: '2020-01-01',
      avatarUrl: 'https://avatars.githubusercontent.com/u/38770302?v=4'
    }
  ]

  const handleAddUser = () => {
    history.push('/usuarios/criar')
  }

  const handleDeleteUser = event => {
    event.stopPropagation()
    alert('Deletar usuário')
  }

  const handleEditUser = event => {
    event.stopPropagation()
    alert('Editar usuário')
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Fragment>
      <Row justifyContent='space-between' alignItems='center' marginTop={64}>
        <Text fontSize={40} fontWeight={600}>
          Navers
        </Text>

        <Button width={176} fontSize={14} onClick={handleAddUser}>
          Adicionar Naver
        </Button>
      </Row>

      <Row alignItems='center' marginTop={40} justifyContent='space-between' overflow='auto' onClick={openModal}>
        {/* Iteração com o array estático de navers */}
        {navers.map(naver => (
          <Column key={naver.id} marginRight={30} cursor='pointer'>
            <Image border='1px solid black' src={naver.avatarUrl} width={280} height={280} marginBottom={16} />
            <Text variant='regular' fontWeight={600} marginBottom={4}>
              {naver.name}
            </Text>
            <Text variant='regular' fontWeight={400}>
              {naver.role}
            </Text>

            <Row alignItems='center' marginTop={16} marginBottom={16} cursor={'pointer'}>
              <Image src={TrashIcon} width={14} height={18} marginRight={16} onClick={handleDeleteUser} />
              <Image src={EditIcon} width={18} height={18} marginRight={16} onClick={handleEditUser} />
            </Row>
          </Column>
        ))}
      </Row>

      {/* Modal Component */}
      <Modal isOpen={isOpen} width={'80%'} maxWidth={'800px'}>
        <Row>
          <Column>
            <Image src='https://avatars.githubusercontent.com/u/38770302?v=4' width={'100%'} />
          </Column>

          <Column padding={'0 0 0 30px'} width={'100%'} maxWidth={'400px'}>
            <Row
              align={'flex-end'}
              justifyContent={'flex-end'}
              marginRight={'30px'}
              marginTop={'20px'}
              cursor='pointer'
            >
              <Image src={CloseIcon} onClick={closeModal} width={14} height={14} alignSelf={'flex-end'} />
            </Row>

            <Column marginBottom={30} marginTop={20}>
              <Text variant='big' fontWeight={600} marginBottom={4}>
                Gerson Rocha
              </Text>
              <Text variant='regular' fontWeight={400}>
                Desenvolvedor Front-end
              </Text>
            </Column>
            <Column marginBottom={30}>
              <Text variant='regular' fontWeight={600} marginBottom={4}>
                Idade
              </Text>
              <Text variant='regular' fontWeight={400}>
                25 anos
              </Text>
            </Column>
            <Column marginBottom={30}>
              <Text variant='regular' fontWeight={600} marginBottom={4}>
                Tempo de Empresa
              </Text>
              <Text variant='regular' fontWeight={400}>
                1 semana
              </Text>
            </Column>
            <Column marginBottom={30}>
              <Text variant='regular' fontWeight={600} marginBottom={4}>
                Projetos que participou
              </Text>
              <Text variant='regular' fontWeight={400}>
                Atlas
              </Text>
            </Column>
          </Column>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Home
