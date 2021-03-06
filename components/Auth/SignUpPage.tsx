import { useState } from 'react'

import { AuthForm } from './AuthForm'
import { Container } from './Container'
import { Redirect, RedirectLink } from './Redirect'
import { Welcome } from './Welcome'
import { Button } from '../Buttons'
import { FieldBase } from '../Inputs'
import { LoginDrawing, DrawingTransition } from '../Drawings'

export const SignUpPage = () => {
  const [userName, setUserName] = useState('')
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
      <DrawingTransition>
        <LoginDrawing />
      </DrawingTransition>

      <Welcome>Sign up to get started</Welcome>
      <AuthForm onSubmit={handleSubmit}>
        <FieldBase
          value={userName}
          label="Username"
          name="userName"
          onChange={e => setUserName(e.target.value)}
        />
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
          <Button type="submit">Sign Up</Button>
        </footer>
      </AuthForm>
      <Redirect message="Already have an account?">
        <RedirectLink href="/login">Login</RedirectLink>
      </Redirect>
    </Container>
  )
}
