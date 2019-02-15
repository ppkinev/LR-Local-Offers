import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { MenuItemSearch, SearchField } from 'components'

const Wrapper = styled.div`
  display: block;
`

const MenuSearch = ({ isOpened, onClick, value, onChange, searchItem }) => {
  const inputField = isOpened
    && <SearchField value={value} onChange={onChange} />
  return (
    <Wrapper innerRef={searchItem}>
      <MenuItemSearch onClick={onClick} />
      {inputField}
    </Wrapper>
  )
}

MenuSearch.propTypes = {
  searchItem: PropTypes.func,
  isOpened: PropTypes.bool,
  value: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
}

export default MenuSearch
