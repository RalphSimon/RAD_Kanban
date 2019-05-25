import { useState } from 'react'

import { AuthForm } from './AuthForm'
import { Container } from './Container'
import { Redirect, RedirectLink } from './Redirect'
import { Welcome } from './Welcome'
import { Button } from '../Buttons'
import { FieldBase } from '../Inputs'
import { SignInDrawing } from '../Drawings'

export const SignIn = () => {
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
      <SignInDrawing opacity="0.25" />
      <Welcome>Sign in to continue where you left off</Welcome>
      <AuthForm onSubmit={handleSubmit}>
        <FieldBase
          value={email}
          name="email"
          label="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
          autoComplete
        />
        <FieldBase
          value={password}
          name="password"
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          autoComplete
        />
        <footer>
          <Button type="submit">Sign In</Button>
        </footer>
      </AuthForm>
      <Redirect message="Don't have an account yet?">
        <RedirectLink href="/">Sign Up</RedirectLink>
      </Redirect>
    </Container>
  )
}
