import propTypes from '@styled-system/prop-types'
import Loader from 'components/Loader'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { border, color, layout, space, typography } from 'styled-system'

const ButtonComponent = ({ children, disabled, isLoading, ...props }) => (
  <Button {...props} disabled={disabled || isLoading}>
    {isLoading ? <Loader /> : children}
  </Button>
)

const Button = styled.button(space, layout, typography, color, border)

ButtonComponent.defaultProps = {
  width: 'regular',
  height: 'small',
  color: 'white',
  backgroundColor: 'primary.main'
}

ButtonComponent.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  ...propTypes.space,
  ...propTypes.layout,
  ...propTypes.typography,
  ...propTypes.color,
  ...propTypes.border
}

export default ButtonComponent
