import { useEffect, useState } from 'react'
import { PoseGroup } from 'react-pose'

import { AppCanvas, PageHeader } from '../components/Layout'
import { SignUpDrawing, DrawingTransition } from '../components/Drawings'

const Avatar = ({ children }) => (
  <div className="avatar">
    {children}
    <style jsx>{`
			.avatar {
				grid-area: avatar;
				width: 72px;
				height: 72px;
				border-radius: 100%;
				background-color: var(--color-gray-base);
			}
		`}</style>
  </div>
)

const ProfileHead = ({ children }) => (
  <div className="profile-head">
    {children}
    <style jsx>{`
			.profile-head {
				display: grid;
				grid-template-areas:
					'avatar name'
					'avatar email';
				grid-gap: 0 16px;
			}
		`}</style>
  </div>
)

const UserName = ({ children }) => (
  <h2 className="text-preset-2">
    {children}
    <style jsx>{`
			h2 {
				grid-area: name;
			}
		`}</style>
  </h2>
)

const Email = ({ children }) => (
  <h4 className="text-preset-5">
    {children}
    <style jsx>{`
			h4 {
				grid-area: email;
			}
		`}</style>
  </h4>
)

const Profile = () => {
  const [isVisible, setVisibility] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibility(true)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AppCanvas>
      <PageHeader>
        <ProfileHead>
          <Avatar />
          <UserName>Paul Simon</UserName>
          <Email>paul.simon@music.com</Email>
        </ProfileHead>
      </PageHeader>
      <PoseGroup>
        {isVisible && (
          <DrawingTransition key="sign-up-drawing">
            <SignUpDrawing />
          </DrawingTransition>
        )}
      </PoseGroup>
    </AppCanvas>
  )
}

export default Profile
