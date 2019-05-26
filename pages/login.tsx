import { useState } from 'react'

import {
  AuthForm,
  Container,
  Redirect,
  RedirectLink,
  Welcome
} from '../components/Auth'

import { Button } from '../components/Buttons'
import { FieldBase } from '../components/Inputs'
import { DrawingTransition, SignUpDrawing } from '../components/Drawings'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = event => {
    event.preventDefault()
    console.log('You have logged in: ', {
      email
    })
  }
  return (
    <Container>
      <DrawingTransition yOffset={-20}>
        <SignUpDrawing />
      </DrawingTransition>
      <Welcome>Sign in to continue where you left off</Welcome>
      <AuthForm onSubmit={handleSubmit}>
        <FieldBase
          value={email}
          name="email"
          label="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />
        <FieldBase
          value={password}
          name="password"
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
        <footer>
          <Button type="submit">Login</Button>
        </footer>
      </AuthForm>
      <Redirect message="Don't have an account yet?">
        <RedirectLink href="/sign-up">Sign Up</RedirectLink>
      </Redirect>
    </Container>
  )
}

export default SignIn
