import styled from 'styled-components'

const sharedStyles = {
  padding: '10px',
  fontFamily: "'Open Sans', sans-serif",
  fontWeight: '400',
  minWidth: '300px',
}

const FormInput = styled.input(sharedStyles)

const FormTextArea = styled.textarea({
  ...sharedStyles,
  width: '50%',
})

export { FormInput, FormTextArea }
