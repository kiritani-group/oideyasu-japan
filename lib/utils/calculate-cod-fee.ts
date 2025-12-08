export function calculateCodFee(amount: number): number {
  if (amount < 0) {
    throw new Error("amount must be positive")
  }

  if (amount < 10000) {
    return 330
  }
  if (amount < 30000) {
    return 440
  }
  if (amount < 100000) {
    return 660
  }
  if (amount < 300000) {
    return 1100
  }

  // 上限を超える場合の扱いを自由に変更できる
  // return 2200 なども可能
  throw new Error("代引き対象外の金額です（30万円以上）")
}
