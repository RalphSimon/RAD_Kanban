import { useState } from 'react'

import { AuthForm } from './AuthForm'
import { Container } from './Container'
import { Redirect, RedirectLink } from './Redirect'
import { Welcome } from './Welcome'
import { Button } from '../Buttons'
import { FieldBase } from '../Inputs'
import { SignUpDrawing, DrawingTransition } from '../Drawings'

export const LoginPage = () => {
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
