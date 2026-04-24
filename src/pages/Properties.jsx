import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

// ダミーの物件データ
const DUMMY_PROPERTIES = [
  { id: 1, name: 'ハイツ青山', rent: 120000, area: '港区青山' },
  { id: 2, name: 'グランドマンション渋谷', rent: 180000, area: '渋谷区渋谷' },
  { id: 3, name: 'パークハウス新宿', rent: 95000, area: '新宿区新宿' },
  { id: 4, name: 'ライオンズマンション池袋', rent: 85000, area: '豊島区池袋' },
  { id: 5, name: 'コスモポリス品川', rent: 145000, area: '品川区大崎' },
  { id: 6, name: 'シティハウス千代田', rent: 200000, area: '千代田区丸の内' },
]

export default function Properties() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="properties-container">
      <header className="properties-header">
        <h1>物件一覧</h1>
        <div className="header-right">
          <span className="user-email">{user?.email}</span>
          <button onClick={handleLogout} className="btn-logout">
            ログアウト
          </button>
        </div>
      </header>

      <main className="properties-main">
        <div className="properties-grid">
          {DUMMY_PROPERTIES.map((property) => (
            <div key={property.id} className="property-card">
              <div className="property-card-body">
                <h2 className="property-name">{property.name}</h2>
                <div className="property-info">
                  <span className="property-area">📍 {property.area}</span>
                  <span className="property-rent">
                    ¥{property.rent.toLocaleString()} / 月
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
