-- =========================================
-- 物件テーブルの作成
-- =========================================
CREATE TABLE properties (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT        NOT NULL,               -- 物件名
  rent       INTEGER     NOT NULL CHECK (rent >= 0), -- 家賃（円）
  area       TEXT        NOT NULL,               -- エリア名
  layout     TEXT        NOT NULL,               -- 間取り（例：1LDK）
  user_id    UUID        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- 登録ユーザー
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================
-- Row Level Security（RLS）を有効化
-- =========================================
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- 自分が登録した物件のみ閲覧できる
CREATE POLICY "自分の物件のみ閲覧可能" ON properties
  FOR SELECT
  USING (auth.uid() = user_id);

-- 自分のuser_idで物件を登録できる
CREATE POLICY "自分の物件のみ登録可能" ON properties
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
CREATE POLICY "自分の物件のみ更新可能" ON properties
  FOR UPDATE
  USING (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
CREATE POLICY "自分の物件のみ削除可能" ON properties
  FOR DELETE
  USING (auth.uid() = user_id);
