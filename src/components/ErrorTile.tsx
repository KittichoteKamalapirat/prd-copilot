import React from 'react'

interface Props {
  title?: string
  subtitle?: string
}
const ErrorTile = ({ title = 'Error', subtitle = 'Please try again' }: Props) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4">{title}</h1>
      <p className="text-lg text-gray-700">{subtitle}</p>
    </div>
  )
}
export default ErrorTile
