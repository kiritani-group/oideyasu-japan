export const normalizeString = (val: unknown): string | null => {
  if (typeof val !== "string") {
    return ""
  }

  let s = val

  // 全角 → 半角変換
  s = s
    .replace(/\u3000/g, " ") // 全角スペース → 半角
    .replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0)) // 全角数字 → 半角
    .replace(/[－―ー]/g, "-") // 全角ハイフン → 半角

  // 複数スペース → 1つに
  s = s.replace(/\s+/g, " ")

  // 前後の空白を削除
  s = s.trim()
  return s || null
}
