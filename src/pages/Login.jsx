import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('メールアドレスまたはパスワードが正しくありません')
    } else {
      navigate('/properties')
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">ログイン</h1>
        <p className="auth-subtitle">不動産管理アプリ</p>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'ログイン中...' : 'ログイン'}
          </button>
        </form>

        <p className="auth-link">
          アカウントをお持ちでない方は{' '}
          <Link to="/register">会員登録</Link>
        </p>
      </div>
    </div>
  )
}
