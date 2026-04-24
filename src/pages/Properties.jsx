import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import PropertyForm from '../components/PropertyForm'

export default function Properties() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [properties, setProperties]         = useState([])
  const [loading, setLoading]               = useState(true)
  const [showAddForm, setShowAddForm]       = useState(false)
  const [editingProperty, setEditingProperty] = useState(null) // 編集対象の物件

  // ログインユーザーの物件一覧を取得（created_at降順）
  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setProperties(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  // 物件を新規登録（INSERT）
  const handleAdd = async (formData) => {
    const { error } = await supabase
      .from('properties')
      .insert({ ...formData, user_id: user.id })

    if (error) return '登録に失敗しました'
    await fetchProperties()
    setShowAddForm(false)
  }

  // 物件を更新（UPDATE）
  const handleUpdate = async (formData) => {
    const { error } = await supabase
      .from('properties')
      .update(formData)
      .eq('id', editingProperty.id)

    if (error) return '更新に失敗しました'
    await fetchProperties()
    setEditingProperty(null)
  }

  // 物件を削除（DELETE）
  const handleDelete = async (id) => {
    if (!window.confirm('この物件を削除しますか？')) return

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (!error) setProperties(prev => prev.filter(p => p.id !== id))
  }

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
        {/* 物件登録ボタン */}
        <div className="properties-toolbar">
          <button onClick={() => setShowAddForm(true)} className="btn-add">
            ＋ 物件を登録する
          </button>
        </div>

        {/* 物件一覧 */}
        {loading ? (
          <p className="loading">読み込み中...</p>
        ) : properties.length === 0 ? (
          <p className="empty-message">登録されている物件がありません</p>
        ) : (
          <div className="properties-grid">
            {properties.map((property) => (
              <div key={property.id} className="property-card">
                <div className="property-card-body">
                  <h2 className="property-name">{property.name}</h2>
                  <div className="property-info">
                    <span className="property-area">📍 {property.area}</span>
                    <span className="property-layout">🏠 {property.layout}</span>
                    <span className="property-rent">
                      ¥{property.rent.toLocaleString()} / 月
                    </span>
                  </div>
                </div>
                <div className="property-card-actions">
                  <button
                    onClick={() => setEditingProperty(property)}
                    className="btn-edit"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="btn-delete"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 新規登録モーダル */}
      {showAddForm && (
        <PropertyForm
          onSubmit={handleAdd}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* 編集モーダル */}
      {editingProperty && (
        <PropertyForm
          initialData={editingProperty}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProperty(null)}
        />
      )}
    </div>
  )
}
