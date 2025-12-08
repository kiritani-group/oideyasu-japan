export const normalizePhoneNumber = (input: string) => {
  // 1. 全角数字 → 半角
  let num = input.replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 65248),
  )
  // 2. 数字以外を削除
  num = num.replace(/[^0-9]/g, "")
  // 3. +81 の国番号を国内形式に変換
  if (num.startsWith("81")) {
    num = "0" + num.slice(2)
  }
  return num
}
