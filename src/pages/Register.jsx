import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setError(error.message)
    } else {
      // メール確認が必要な場合はメッセージを表示、不要な場合は物件一覧へ遷移
      setMessage('確認メールを送信しました。メールを確認してください。')
      setTimeout(() => navigate('/login'), 3000)
    }

    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">会員登録</h1>
        <p className="auth-subtitle">不動産管理アプリ</p>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}

        <form onSubmit={handleRegister} className="auth-form">
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
              placeholder="6文字以上のパスワード"
              minLength={6}
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? '登録中...' : '会員登録'}
          </button>
        </form>

        <p className="auth-link">
          すでにアカウントをお持ちの方は{' '}
          <Link to="/login">ログイン</Link>
        </p>
      </div>
    </div>
  )
}
