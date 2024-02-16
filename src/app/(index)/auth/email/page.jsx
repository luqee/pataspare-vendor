'use client'
import { useState } from "react"
import { Container, Card, Button } from "react-bootstrap"
import { useRouter, useSearchParams } from "next/navigation"
import { getEmailResend } from "@/utils/api"

function EmailSent() {
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = () => {
    setLoading(true)
    getEmailResend(searchParams.toString())
    .then((response) => {
      setLoading(false)
      if (response.status === 200) {
        router.refresh()
      }
    })
    .catch((error) => {
      setLoading(false)
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
