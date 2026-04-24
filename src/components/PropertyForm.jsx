import { useState } from 'react'

// 物件の新規登録・編集で共用するフォームコンポーネント
// initialData がある場合は編集モード、ない場合は新規登録モード
export default function PropertyForm({ initialData, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    name:   initialData?.name   ?? '',
    rent:   initialData?.rent   ?? '',
    area:   initialData?.area   ?? '',
    layout: initialData?.layout ?? '',
  })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // 家賃を数値に変換してから親コンポーネントに渡す
    const errorMessage = await onSubmit({ ...form, rent: parseInt(form.rent, 10) })
    if (errorMessage) setError(errorMessage)

    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      {/* クリックイベントの伝播を止めてモーダル外クリックで閉じる */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">
          {initialData ? '物件を編集' : '物件を登録'}
        </h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">物件名</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="例：ハイツ青山"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="rent">家賃（円）</label>
            <input
              id="rent"
              name="rent"
              type="number"
              value={form.rent}
              onChange={handleChange}
              placeholder="例：120000"
              min={0}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="area">エリア名</label>
            <input
              id="area"
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="例：港区青山"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="layout">間取り</label>
            <input
              id="layout"
              name="layout"
              value={form.layout}
              onChange={handleChange}
              placeholder="例：1LDK"
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              キャンセル
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? '保存中...' : '保存する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
