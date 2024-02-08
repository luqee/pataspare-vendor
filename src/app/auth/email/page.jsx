'use client'
import { useState } from "react"
import { Container, Card, Button } from "react-bootstrap"
import { useRouter } from "next/navigation"
import { resendEmail } from "@/utils/api"

function EmailSent() {
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const email = router.query.email

  const handleClick = () => {
    setLoading(true)
    resendEmail(email)
    .then((response) => {
      setLoading(false)
      if (response.status === 200) {
        router.push(`/auth/email?email=${email}`)
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }
  return (
    <Container>
      <Card>
        <Card.Header as="h5">Verify Your Email Address</Card.Header>
        <Card.Body>
          <Card.Text>
            <p>
              Before proceeding , please check your email for a verification
              link. If you did not receive the email click below to request
              another.
            </p>
            <Button
              onClick={!isLoading ? handleClick : null}
              disabled={isLoading}
            >
              {isLoading ? "Loading…" : "Request another"}
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default EmailSent
