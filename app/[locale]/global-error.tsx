'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <head>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(180deg, #0a1628 0%, #050d18 100%);
            color: #e2e8f0;
            padding: 1.5rem;
          }
          .error-container {
            text-align: center;
            max-width: 420px;
            width: 100%;
          }
          .error-icon {
            width: 64px;
            height: 64px;
            border-radius: 16px;
            background: linear-gradient(135deg, #06b6d4, #0891b2);
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            box-shadow: 0 8px 24px rgba(6, 182, 212, 0.25);
          }
          .error-icon svg {
            width: 32px;
            height: 32px;
            color: white;
          }
          .error-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.75rem;
            letter-spacing: -0.025em;
          }
          .error-description {
            font-size: 0.875rem;
            color: rgba(226, 232, 240, 0.5);
            line-height: 1.6;
            margin-bottom: 2rem;
          }
          .error-actions {
            display: flex;
            gap: 0.75rem;
            justify-content: center;
            flex-wrap: wrap;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-size: 0.875rem;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
          }
          .btn-primary {
            background: #06b6d4;
            color: #0a1628;
          }
          .btn-primary:hover {
            background: #22d3ee;
            transform: translateY(-1px);
          }
          .btn-outline {
            background: rgba(255, 255, 255, 0.05);
            color: #e2e8f0;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }
          .btn-outline:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.25);
          }
        `}</style>
      </head>
      <body>
        <div className="error-container">
          <div className="error-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
          </div>
          <h1 className="error-title">Something went wrong</h1>
          <p className="error-description">
            An unexpected error occurred. Our team has been notified. Please try reloading the page.
          </p>
          <div className="error-actions">
            <button className="btn btn-primary" onClick={() => reset()}>
              Reload Page
            </button>
            <a href="/" className="btn btn-outline">
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
