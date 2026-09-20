export const dataSources = {
  household: {
    label: 'Daily Household Transactions',
    files: ['/data/daily-household-transactions.csv'],
    safeFields: ['Date', 'Mode', 'Category', 'Subcategory', 'Note', 'Amount', 'Income/Expense', 'Currency'],
  },
  spotify: {
    label: 'Spotify History',
    files: ['/data/spotify-history-part1.csv', '/data/spotify-history-part2.csv'],
    safeFields: ['spotify_track_uri', 'ts', 'platform', 'ms_played', 'track_name', 'artist_name', 'album_name', 'reason_start', 'reason_end', 'shuffle', 'skipped'],
  },
  indiaTransactions: {
    label: 'India Transactions',
    files: ['/data/india-transactions.csv'],
    safeFields: ['trans_date_trans_time', 'merchant', 'category', 'amt', 'city', 'state', 'lat', 'long', 'merch_lat', 'merch_long', 'is_fraud'],
  },
} as const

export type DataSourceKey = keyof typeof dataSources

export const sensitiveIndiaFields = [
  'cc_num',
  'first',
  'last',
  'street',
  'dob',
  'customer_id',
] as const

export function isSafeIndiaField(field: string): boolean {
  return dataSources.indiaTransactions.safeFields.includes(field as never)
}

export function getDataSource(key: DataSourceKey) {
  return dataSources[key]
}
