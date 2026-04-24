import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// 未ログインの場合はログイン画面にリダイレクトするガード
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="loading">読み込み中...</div>
  }

  return user ? children : <Navigate to="/login" replace />
}
