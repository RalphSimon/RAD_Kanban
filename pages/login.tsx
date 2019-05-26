import Router from 'next/router'
import { useState, useEffect, useContext, useReducer } from 'react'
import posed, { PoseGroup } from 'react-pose'

import {
  AuthForm,
  AuthReducer,
  Container,
  InitAuthSchema,
  Redirect,
  RedirectLink,
  Welcome
} from '../components/Auth'

import { Button } from '../components/Buttons'
import { FieldBase } from '../components/Inputs'
import { DrawingTransition, SignUpDrawing } from '../components/Drawings'
import { FirebaseDatabase } from '../firebase/context'
import { validateEmail, validatePassword } from '../utils'

const userSchema = {
  email: '',
  password: ''
}

const ErrorTransition = posed.div({
  enter: {
    y: 0,
    opacity: 1
  },
  preEnter: {
    y: -20,
    opacity: 0
  },
  exit: {
    y: -20,
    opacity: 0
  }
})

const ErrorMessage = ({ message, ...poseGroupProps }) => {
  const msg = JSON.stringify(message, null, 2)
  return (
    <ErrorTransition {...poseGroupProps}>
      <div className="error">{msg}</div>
      <style jsx>{`
				.error {
					width: 100%;
					padding: 16px;
					color: white;
					background-color: var(--color-red-base);
				}
			`}</style>
    </ErrorTransition>
  )
}

const Login = props => {
  const { db, auth } = useContext(FirebaseDatabase)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isVisible, setVisibility] = useState(false)
  const [validation, validate] = useReducer(
    AuthReducer,
    userSchema,
    InitAuthSchema
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(true)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  const handleValidation = event => {
    const { name, value } = event.target
    event.persist()

    switch (name) {
      case 'email': {
        const isValid = validateEmail(value)
        validate({
          type: 'VALIDATE_FIELD',
          payload: {
            field: name,
            value,
            error: !isValid ? 'Your email is not correct' : '',
            isValid
          }
        })
        console.log(validation.isValid.email)
        break
      }
      case 'password': {
        const isValid = validatePassword(value, 8)
        validate({
          type: 'VALIDATE_FIELD',
          payload: {
            field: name,
            value,
            error: !isValid ? 'Your password is not complex enough' : '',
            isValid
          }
        })

        break
      }
      default:
        break
    }
  }

  const handleSubmit = event => {
    event.preventDefault()

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Router.push('/')
      })
      .catch(err => setError(err))
  }

  return (
    <Container>
      <Welcome>Sign in to continue where you left off</Welcome>
      <AuthForm onSubmit={handleSubmit}>
        <FieldBase
          value={email}
          helperText={validation.errors['email']}
          name="email"
          label="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
          onBlur={handleValidation}
        />
        <FieldBase
          value={password}
          helperText={validation.errors['password']}
          name="password"
          label="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
          onBlur={handleValidation}
        />
        <footer>
          <Button type="submit" disabled={!email && !password}>
						Login
          </Button>
        </footer>
      </AuthForm>
      <Redirect message="Don't have an account yet?">
        <RedirectLink href="/sign-up">Sign Up</RedirectLink>
      </Redirect>
      <PoseGroup>
        {error && <ErrorMessage message={error} key="error-message" />}
      </PoseGroup>
      <PoseGroup>
        {isVisible && (
          <DrawingTransition yOffset={-20} key="login-drawing">
            <SignUpDrawing />
          </DrawingTransition>
        )}
      </PoseGroup>
    </Container>
  )
}

export default Login
