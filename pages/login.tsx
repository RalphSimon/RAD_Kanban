import Router from 'next/router'
import { useState, useEffect, useContext, useReducer } from 'react'
import posed, { PoseGroup } from 'react-pose'

import {
  AuthForm,
  AuthReducer,
  Container,
  ErrorMessage,
  InitAuthSchema,
  Redirect,
  RedirectLink,
  SubmitLoader,
  SubmitSpinner,
  Welcome
} from '../components/Auth'

import { Button } from '../components/Buttons'
import { DrawingTransition, SignUpDrawing } from '../components/Drawings'
import { TextField } from '../components/Inputs/TextField'
import { StaggerContainer, SlideUp } from '../components/Transitions'
import { FirebaseDatabase } from '../firebase/context'
import { validateEmail, validatePassword } from '../utils'

const userSchema = {
  email: '',
  password: ''
}

const Login = props => {
  const { auth } = useContext(FirebaseDatabase)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [isVisible, setVisibility] = useState(false)
  const [view, setView] = useState(0)
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
            error: !validateEmail(value) ? 'Your email is not correct' : '',
            isValid: validateEmail(value)
          }
        })
        console.log(validateEmail(value))
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
    setView(1)
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Router.push('/')
        setView(0)
      })
      .catch(err => setError(err))
  }

  return (
    <Container>
      <SubmitLoader activeView={view}>
        <AuthForm onSubmit={handleSubmit}>
          <Welcome>Sign in to continue where you left off</Welcome>
          <StaggerContainer className="stagger-container">
            <SlideUp className="slide-up">
              <TextField
                value={email}
                helperText={validation.errors.email}
                error={validation.errors.email}
                name="email"
                label="Email"
                type="email"
                onChange={e => setEmail(e.target.value)}
                onBlur={handleValidation}
                autoComplete="on"
              />
            </SlideUp>
            <SlideUp className="slide-up">
              <TextField
                value={password}
                helperText={validation.errors.password}
                error={validation.errors.password}
                minlength={8}
                name="password"
                label="Password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                onBlur={handleValidation}
                autoComplete="on"
              />
            </SlideUp>
            <SlideUp className="slide-up">
              <Button type="submit" disabled={!email && !password}>
								Login
              </Button>
            </SlideUp>
          </StaggerContainer>
        </AuthForm>
        <SubmitSpinner message="Loading your projects..." />
      </SubmitLoader>
      <Redirect message="Don't have an account yet?">
        <RedirectLink href="/sign-up">Sign Up</RedirectLink>
      </Redirect>
      <PoseGroup>
        {error && (
          <ErrorMessage
            message={error.message}
            key="error-message"
            dismiss={() => setError(null)}
          />
        )}
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
