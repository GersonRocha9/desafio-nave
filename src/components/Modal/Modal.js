import Column from 'components/Column'
import Row from 'components/Row'
import React from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'

const Modal = ({ isOpen, children, ...props }) => {
  const portalRef = document.body

  return createPortal(
    <ModalBackground
      top={0}
      left={0}
      position='fixed'
      width='100%'
      height='100vh'
      isOpen={isOpen}
      alignItems='center'
      justifyContent='center'
      backgroundColor='rgba(0,0,0,0.35)'
      p={15}
    >
      <Column backgroundColor='white' {...props}>
        {children}
      </Column>
    </ModalBackground>,
    portalRef
  )
}

const ModalBackground = styled(Row)(
  ({ isOpen }) => css`
    visibility: ${isOpen ? 'visible' : 'hidden'};
    opacity: ${isOpen ? 1 : 0};
  `
)

export default Modal
