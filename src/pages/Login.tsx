import { useState } from 'react'
import type { FormEvent } from 'react'
import type { AuthUser } from '../types/auth'

type LoginProps = {
  onLogin: (user: AuthUser) => void
}

type LoginAccount = {
  email: string
  password: string
  user: AuthUser
}

const accounts: LoginAccount[] = [
  {
    email: 'admin@cybercare.cc',
    password: 'coordinator',
    user: {
      email: 'admin@cybercare.cc',
      name: 'Mantas',
      role: 'admin',
    },
  },
  {
    email: 'user@cybercare.cc',
    password: 'analyst',
    user: {
      email: 'user@cybercare.cc',
      name: 'QA Analyst',
      role: 'reviewer',
    },
  },
]

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [forgotMessage, setForgotMessage] = useState('')

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    setError('')
    setForgotMessage('')

    const normalizedEmail = email
      .trim()
      .toLowerCase()

    const account = accounts.find(
      (item) =>
        item.email.toLowerCase() === normalizedEmail &&
        item.password === password,
    )

    if (!account) {
      setError(
        'The email or password you entered is incorrect.',
      )
      return
    }

    onLogin(account.user)
  }

  const handleForgotPassword = () => {
    setError('')
    setForgotMessage(
      'Password recovery is not available in this demo.',
    )
  }

  return (
    <div className="login-page">
      <div className="login-background-shape login-shape-one" />
      <div className="login-background-shape login-shape-two" />

      <div className="login-layout">
        <section className="login-brand-panel">
          <div className="login-brand-panel-inner">
            <div className="login-logo">
              <span>c</span>
            </div>

            <div className="login-brand-title">
              CyberCare <span>QA</span>
            </div>

            <div className="login-brand-copy">
              <div className="login-eyebrow">
                QUALITY MANAGEMENT
              </div>

              <h1>
                Turn every feedback
                <br />S
                into better support.
              </h1>

              <p>
                Review conversations, measure quality,
                and give your support teams feedback that
                actually helps them improve.
              </p>
            </div>

            <div className="login-feature-list">
              <div className="login-feature">
                <div className="login-feature-icon">
                  ✓
                </div>

                <div>
                  <strong>Consistent QA reviews</strong>
                  <span>
                    Your feedback and evaluations support CyberCare.
                  </span>
                </div>
              </div>

              <div className="login-feature">
                <div className="login-feature-icon">
                  ✓
                </div>

                <div>
                  <strong>Conversation insights</strong>
                  <span>
                    See what CSMs are doing well and where they can improve.
                  </span>
                </div>
              </div>

              <div className="login-feature">
                <div className="login-feature-icon">
                  ✓
                </div>

                <div>
                  <strong>Quality at scale</strong>
                  <span>
                    Build a clearer picture of support quality
                    across your squad.
                  </span>
                </div>
              </div>
            </div>

            <div className="login-brand-footer">
              <span>CyberCare QA</span>
              <span>Quality Management Workspace</span>
            </div>
          </div>
        </section>

        <section className="login-form-panel">
          <div className="login-form-container">
            <div className="login-mobile-brand">
              <div className="login-logo">
                <span>c</span>
              </div>

              <div className="login-brand-title">
                CyberCare <span>QA</span>
              </div>
            </div>

            <div className="login-card-header">
              <h2>Welcome back</h2>

              <p>
                Sign in to continue to your QA workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="login-field">
                <label htmlFor="email">
                  Email address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setError('')
                    setForgotMessage('')
                  }}
                  placeholder="you@cybercare.cc"
                  autoComplete="email"
                  autoFocus
                />
              </div>

              <div className="login-field">
                <div className="login-password-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="login-password-wrapper">
                  <input
                    id="password"
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value)
                      setError('')
                      setForgotMessage('')
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current,
                      )
                    }
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  className="login-message login-error"
                  role="alert"
                >
                  <span className="login-message-icon">
                    !
                  </span>

                  <span>{error}</span>
                </div>
              )}

              {forgotMessage && (
                <div className="login-message login-info">
                  <span className="login-message-icon">
                    i
                  </span>

                  <span>{forgotMessage}</span>
                </div>
              )}

              <button
                type="submit"
                className="login-submit"
              >
                Sign in
                <span className="login-submit-arrow">
                  →
                </span>
              </button>
            </form>

            <div className="login-security-note">
              <span className="login-lock-icon">
                ◇
              </span>

              <span>
                Your workspace is protected by CyberCare QA.
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}