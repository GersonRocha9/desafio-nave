import Row from 'components/Row'
import { MEDIADESKTOP } from 'helpers'
import React from 'react'
import styled from 'styled-components'

const ColumnComponent = props => <Row flexDirection='column' {...props} />

export const ColumnDesktop = styled(ColumnComponent)`
  display: none;
  background-color: tomato;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: flex;
  }
`

export const ColumnMobile = styled(ColumnComponent)`
  display: flex;
  @media (min-width: ${MEDIADESKTOP}px) {
    display: none;
  }
`

export default ColumnComponent
