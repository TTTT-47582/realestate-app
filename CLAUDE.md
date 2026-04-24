# realestate-app

不動産情報管理アプリ。

## 技術スタック

| 役割 | 技術 |
|------|------|
| フロントエンド | React |
| バックエンド / DB | Supabase (PostgreSQL) |
| 認証 | Supabase Auth |
| ストレージ | Supabase Storage |

## セットアップ

```bash
npm install
npm run dev
```

## 環境変数

`.env` ファイルに以下を設定する（`.env` は Git にコミットしない）:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## ディレクトリ構成（予定）

```
src/
  components/   # 再利用可能なUIコンポーネント
  pages/        # ページ単位のコンポーネント
  lib/          # Supabaseクライアント等のユーティリティ
  hooks/        # カスタムフック
```

## Supabase 利用上の注意

- `supabase/` ディレクトリにマイグレーションファイルを管理する
- Row Level Security (RLS) を必ず有効にする
- 秘密鍵（service_role key）はサーバーサイドのみで使用し、フロントエンドに含めない

## Git 運用ルール

**コードを変更するたびに、必ず GitHub にプッシュすること。**

### 手順

1. 変更をステージング・コミット
2. `git push` で GitHub にプッシュ

```bash
git add <変更ファイル>
git commit -m "変更内容を端的に説明するメッセージ"
git push
```

### コミットメッセージ規則

- 日本語または英語どちらでも可
- 変更の「なぜ」を重視する（何をしたかはコードが示す）
- 末尾に以下を付与する（Claude が作業した場合）:
  ```
  Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
  ```

### 禁止事項

- `git push --force` を main/master ブランチへ使用しない
- `--no-verify` でフックをスキップしない（やむを得ない場合はユーザーに確認）
- 未コミットの変更を `git reset --hard` や `git checkout .` で破棄しない（ユーザー確認必須）

## 開発の基本方針

- 余分な機能追加・リファクタリングはしない（指示された範囲のみ実装）
- コメントはコードから読み取れないことのみ書く（書かないのがデフォルト）
- セキュリティ脆弱性（XSS・SQLインジェクション等）を混入しない
