import styled from 'styled-components'
import SubmitButton from './SubmitButton'

const ButtonGroup = styled.div`
  ${SubmitButton} {
    border-radius: 0;
  }
  ${SubmitButton}:first-of-type {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  ${SubmitButton}:last-of-type {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

export default ButtonGroup
