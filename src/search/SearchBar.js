import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function SearchBox({ queryString, setQueryString }) {
  const [selection, setSelection] = useState([queryString])
  const [isLoading, setIsLoading] = useState(false)
  const [searchSuggestion, setSearchSuggestion] = useState([])

  const onSearch = async (query) => {
    setIsLoading(true)
    setQueryString(query)
    try {
      const response = await fetch(`/api/suggest.jsp?q=${query}`).then((x) =>
        x.json()
      )
      setSearchSuggestion(response)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AsyncTypeahead
      id="search-box"
      isLoading={isLoading}
      options={[queryString].concat(searchSuggestion)}
      onSearch={() => console.log('overridden by onInputChange')}
      onChange={(selection) => {
        setSelection(selection)
        if (selection.length > 0) setQueryString(selection[0])
      }}
      onInputChange={onSearch}
      selected={selection}
      useCache={false}
      minLength={0}
    />
  )
}

export default function SearchBar({ defaultQuery }) {
  const [queryString, setQueryString] = useState(defaultQuery)
  return (
    <InputGroup>
      <InputGroup.Prepend>
        <InputGroup.Text>
          <BsSearch />
        </InputGroup.Text>
      </InputGroup.Prepend>
      <SearchBox queryString={queryString} setQueryString={setQueryString} />
      <InputGroup.Append>
        <Button
          variant="primary"
          as={Link}
          to={`/search?q=${encodeURIComponent(queryString)}`}>
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  )
}
