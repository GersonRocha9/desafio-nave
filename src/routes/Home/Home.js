import Button from 'components/Button'
import Column from 'components/Column'
import Image from 'components/Image'
import Loader from 'components/Loader'
import Modal from 'components/Modal'
import Row from 'components/Row'
import Text from 'components/Text'
import { getToken } from 'helpers'
import { fetchNavers } from 'helpers/fetch'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory } from 'react-router-dom'

import CloseIcon from '../../assets/close.svg'
import EditIcon from '../../assets/edit.svg'
import TrashIcon from '../../assets/trash.svg'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isLoading, isError, data } = useQuery('navers', fetchNavers)

  const history = useHistory()
  window.redirect = history.push

  if (isLoading) {
    return <Loader />
  }

  if (isError) {
    return <div>Error: {data.message}</div>
  }

  const handleAddNaver = () => {
    history.push('/usuarios/criar')
  }

  const handleEditNaver = event => {
    event.stopPropagation()
    history.push(`/usuarios/editar/${user.id}`)
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <Row justifyContent='space-between' alignItems='center' marginTop={64}>
        <Text fontSize={40} fontWeight={600}>
          Navers
        </Text>

        <Button width={176} fontSize={14} onClick={handleAddNaver}>
          Adicionar Naver
        </Button>
      </Row>

      <Row alignItems='center' marginTop={40} overflow='auto' onClick={openModal}>
        {isLoading ? (
          <div>
            <Loader />
          </div>
        ) : (
          data.map(naver => (
            <Column key={naver.id} marginRight={30} cursor='pointer'>
              <Image border='1px solid black' src={naver.url} width={280} height={280} marginBottom={16} />
              <Text variant='regular' fontWeight={600} marginBottom={4}>
                {naver.name}
              </Text>
              <Text variant='regular' fontWeight={400}>
                {naver.job_role}
              </Text>

              <Row alignItems='center' marginTop={16} marginBottom={16} cursor={'pointer'}>
                <Image
                  src={TrashIcon}
                  width={14}
                  height={18}
                  marginRight={16}
                  onClick={event => {
                    event.stopPropagation()
                    const token = getToken()
                    fetch(`${process.env.REACT_APP_API_URL}v1/navers/${naver.id}`, {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                      }
                    })
                      .then(response => response.json())
                      .then(data => {
                        location.reload()
                        if (data.error) {
                          throw new Error(data.message)
                        }
                        return data
                      })
                      .catch(error => {
                        console.log(error)
                      })
                  }}
                />

                <Image src={EditIcon} width={18} height={18} marginRight={16} onClick={handleEditNaver} />
              </Row>
            </Column>
          ))
        )}
      </Row>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} width={'80%'} maxWidth={'800px'}>
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
                Data de Nascimento
              </Text>
              <Text variant='regular' fontWeight={400}>
                28/06/1997
              </Text>
            </Column>
            <Column marginBottom={30}>
              <Text variant='regular' fontWeight={600} marginBottom={4}>
                Data de admissão
              </Text>
              <Text variant='regular' fontWeight={400}>
                18/07/2022
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
    </>
  )
}

export default Home
