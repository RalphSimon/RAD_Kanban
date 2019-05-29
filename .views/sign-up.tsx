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
  Welcome
} from '../components/Auth'
import { Button } from '../components/Buttons'
import { FieldBase } from '../components/Inputs'
import { LoginDrawing, DrawingTransition } from '../components/Drawings'
import { FirebaseDatabase } from '../firebase/context'
import { validateEmail, validatePassword, validateUserName } from '../utils'

const newUserSchema = {
  userName: '',
  email: '',
  password: ''
}

const SignIn = props => {
  const { db, auth } = useContext(FirebaseDatabase)
  const [userName, setUserName] = useState('RalphSimon')
  const [email, setEmail] = useState('ralph.simon2008@gmail.com')
  const [password, setPassword] = useState('Kanban2018')
  const [error, setError] = useState()
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
        const isValid = validateUserName(value, 8, 24)
        validate({
          type: 'VALIDATE_FIELD',
          payload: {
            field: name,
            value,
            error: !isValid ? 'Username needs between 8 and 24 characters' : '',
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

        Router.push('/')
      } catch (error) {
        console.log(error)
        setError(error)
      }
    })()
  }

  return (
    <Container>
      <Welcome>Sign up to get started</Welcome>
      <AuthForm onSubmit={handleSubmit}>
        <FieldBase
          value={userName}
          helperText={validation.errors.userName}
          label="Username"
          name="userName"
          onChange={e => setUserName(e.target.value)}
          onBlur={handleValidation}
        />
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
          <Button type="submit" disabled={!userName && !email && !password}>
						Sign Up
          </Button>
        </footer>
      </AuthForm>
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
