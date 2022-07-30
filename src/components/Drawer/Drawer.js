import Button from 'components/Button'
import Image from 'components/Image'
import { useUser } from 'context/user-context'
import React, { useState } from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'

import Logo from '../../assets/logo.svg'

const NAV_BAR_HEIGHT = 60
const SIDE_BAR_WIDTH = 200

const ROUTES = [
  {
    path: '/usuarios',
    label: 'Usuários'
  },
  {
    path: '/usuarios/criar',
    label: 'Criar usuário'
  }
]

const DrawerComponent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const { logout } = useUser()

  const history = useHistory()
  window.redirect = history.push

  const handleHomePage = () => {
    history.push('/')
  }

  return (
    <Container>
      <NavBar>
        <Image src={Logo} alt='nave.rs Logo' width={145} onClick={handleHomePage} cursor='pointer' />

        <Button onClick={logout} backgroundColor='#fff' width={30} color='black' fontWeight={600}>
          Sair
        </Button>
      </NavBar>

      <Content isOpen={isOpen}>{children}</Content>
    </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`

const Content = styled.div`
  padding: 20px;
  padding-top: ${NAV_BAR_HEIGHT + 20}px;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  transition: all 0.3s ease-in-out;
`

const Link = styled(RouterLink)`
  color: black;
  text-decoration: none;
`

const NavBar = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  height: ${NAV_BAR_HEIGHT}px;
  justify-content: space-between;
  width: 100%;
  z-index: 2;
  padding: 24px 32px;
  background-color: ${({ theme }) => theme.colors.background};
`

const BurgerMenu = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`

const SideBar = styled.div`
  ${({ isOpen, theme }) => css`
    position: absolute;
    height: 100%;
    background-color: white;
    border-right: 1px solid lightgray;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    ${isOpen
      ? css`
          width: ${SIDE_BAR_WIDTH}px;
          padding: 20px;
          padding-top: ${NAV_BAR_HEIGHT + 20}px;
        `
      : css`
          width: 0px;
        `};
  `}
`

export default DrawerComponent
