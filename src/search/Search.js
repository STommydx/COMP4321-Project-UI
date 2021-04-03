import React from 'react'
import { useLocation } from 'react-router-dom'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Search() {
  const query = useQuery()

  return <div>{query.get('q')}</div>
}

export default Search
