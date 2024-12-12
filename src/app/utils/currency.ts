export const toDollars = (cents: number) => {
  return cents / 100
}

export type NumberFormatOptions = Intl.NumberFormatOptions & { isRoundedDown?: boolean }

export const formatCurrency = (value: number, options?: NumberFormatOptions) => {
  const isRoundedDown = options?.isRoundedDown === true
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    ...options,
  }).format(isRoundedDown ? Math.floor(value) : value)
}

export function formatCentsToDollars(cents: number, options?: NumberFormatOptions) {
  return formatCurrency(toDollars(cents), options)
}
