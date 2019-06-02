import Router from 'next/router'
import { useState, useEffect, useContext, useReducer } from 'react'
import { PoseGroup } from 'react-pose'

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
import { LoginDrawing, DrawingTransition } from '../components/Drawings'
import { TextField } from '../components/Inputs/TextField'
import { StaggerContainer, SlideUp } from '../components/Transitions'
import { FirebaseDatabase } from '../firebase/context'
import { validateEmail, validatePassword, validateUserName } from '../utils'

const newUserSchema = {
  userName: '',
  email: '',
  password: ''
}

const SignIn = props => {
  const { db, auth } = useContext(FirebaseDatabase)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const [view, setView] = useState(0)
  const [userDoc, setUser] = useState({})
  const [isVisible, setVisibility] = useState(false)
  const [validation, validate] = useReducer(
    AuthReducer,
    newUserSchema,
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
      case 'userName': {
        const isValid = validateUserName(value, 3, 24)
        validate({
          type: 'VALIDATE_FIELD',
          payload: {
            field: name,
            value,
            error: !isValid ? 'Fill in at least 4 and max 24 characters' : '',
            isValid
          }
        })

        break
      }
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
    ;(async function signUp() {
      try {
        await auth.createUserWithEmailAndPassword(email, password)
        const newUser = await auth.currentUser
        await newUser.updateProfile({
          displayName: userName
        })

        const user = {
          name: newUser.displayName,
          email: newUser.email,
          photoUrl: newUser.photoUrl ? newUser.photoUrl : '',
          uid: newUser.uid,
          emailVerified: newUser.emailVerified
        }
        console.log(user)
        const userDocRef = await db.collection('USERS').doc(newUser.uid)
        await userDocRef.set(user)
        setView(0)
        Router.push('/')
      } catch (error) {
        console.log(error)
        setError(error)
      }
    })()
  }

  return (
    <Container>
      <SubmitLoader activeView={view}>
        <AuthForm onSubmit={handleSubmit}>
          <Welcome>Sign up to get started</Welcome>
          <StaggerContainer className="stagger-container">
            <SlideUp className="slide-up">
              <TextField
                value={userName}
                helperText={validation.errors.userName}
                error={validation.errors.userName}
                label="Username"
                minlength={4}
                maxlength={24}
                name="userName"
                onChange={e => setUserName(e.target.value)}
                onBlur={handleValidation}
              />
            </SlideUp>
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
              <Button type="submit" disabled={!userName && !email && !password}>
								Sign Up
              </Button>
            </SlideUp>
          </StaggerContainer>
        </AuthForm>
        <SubmitSpinner message="Loading your canvas..." />
      </SubmitLoader>
      <Redirect message="Already have an account?">
        <RedirectLink href="/login">Login</RedirectLink>
      </Redirect>
      <PoseGroup>
        {error && <ErrorMessage message={error} key="error-message" />}
      </PoseGroup>
      <PoseGroup>
        {isVisible && (
          <DrawingTransition key="sign-up-drawing">
            <LoginDrawing />
          </DrawingTransition>
        )}
      </PoseGroup>
    </Container>
  )
}

export default SignIn
