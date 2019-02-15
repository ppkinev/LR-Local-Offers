/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  MenuWrapper,
  MenuDropdown,
  MenuItem,
  MenuItemFavorites,
  MenuSearch,
  MenuItemsWrapper,
  MenuItemMap,
} from 'components'

const ALL = { name: 'All categories', id: 'all' }
const FAVORITES = { name: 'Favorites', id: 'favorites' }
const MORE = { name: 'More', id: 'more' }

const getWidth = elem => elem ? elem.getBoundingClientRect().width : 0

const getSubMenusCount = (menus, area) => {
  const CHR_WIDTH = 12
  let index = 0

  if (menus.length > 0) {
    /* eslint-disable no-plusplus */
    let fullLength = 0
    for (let i = 0; i < menus.length; i++) {
      fullLength += menus[i].name.length
      if ((fullLength * CHR_WIDTH) > area) {
        index = i
        break
      }
    }
    if (index === 0) index = menus.length
    if (area < (menus[0].name.length * CHR_WIDTH) + (4 * CHR_WIDTH)) index = 0
  }

  return index
}

class Menu extends Component {
  constructor(props) {
    super(props)
    this.restructureMenu = this.restructureMenu.bind(this)
    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onSubCategoryChange = this.onSubCategoryChange.bind(this)
    this.onSearchOpen = this.onSearchOpen.bind(this)
    this.onSearchClose = this.onSearchClose.bind(this)
    this.onFavoritesClick = this.onFavoritesClick.bind(this)
  }

  state = {
    subMenusFitCount: 0,
    subMenusCount: 0,
    searchOpened: false,
  }

  componentDidMount() {
    this.restructureMenu()
    window.addEventListener('resize', this.restructureMenu)
  }

  componentWillReceiveProps(newProps) {
    this.restructureMenu()

    if (newProps.isAllSelected && this.mainItem) this.mainItem.selectedIndex = 0
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.restructureMenu)
  }

  onCategoryChange(ev) {
    const { onCategoryChange } = this.props
    onCategoryChange(ev.currentTarget.value)

    window.setTimeout(() => {
      this.restructureMenu()
    }, 0)
  }

  onSubCategoryChange(ev) {
    const { onSubCategoryChange, onCategoryChange, isAllSelected } = this.props
    const menuId = ev.currentTarget.getAttribute('value')
    if (!isAllSelected) onSubCategoryChange(ev.currentTarget.value || menuId)
    else onCategoryChange(ev.currentTarget.value || menuId)

    if (!ev.currentTarget.value && menuId && isAllSelected) {
      const correspondingDropdown = Array.from(this.mainItem.options).find(opt => opt.value === menuId)
      if (correspondingDropdown) this.mainItem.selectedIndex = correspondingDropdown.index
    }
  }

  onSearchClose(ev) {
    if (ev.target.parentNode !== this.searchItem
      && ev.target.parentNode.parentNode !== this.searchItem
    ) {
      this.setState({ searchOpened: false })
      document.body.removeEventListener('click', this.onSearchClose)
    }
  }

  onSearchOpen() {
    this.setState({ searchOpened: true })
    document.body.addEventListener('click', this.onSearchClose)
  }

  onFavoritesClick() {
    this.props.onFavoritesClick()
    window.setTimeout(() => {
      this.mainItem.selectedIndex = 0
    }, 0)
  }

  restructureMenu() {
    const { submenuArea } = this
    const { subMenus, menus, isAllSelected } = this.props
    const { subMenusFitCount, subMenusCount } = this.state

    const subMenuSplitIndex = getSubMenusCount(subMenus, getWidth(submenuArea))

    if (isAllSelected) {
      this.setState({
        subMenusFitCount: getSubMenusCount(menus, getWidth(submenuArea)),
        subMenusCount: menus.length + 1,
      })
    } else if ((subMenuSplitIndex !== subMenusFitCount) || (subMenusCount !== subMenus.length)) {
      this.setState({
        subMenusFitCount: subMenuSplitIndex,
        subMenusCount: subMenus.length,
      })
    }
  }

  getMenuItems(items) {
    const { selectedSubCategoryId } = this.props
    return items.map((menu) => {
      return (
        <MenuItem
          key={`mid-menu-${menu.id}`}
          value={menu.id}
          onClick={this.onSubCategoryChange}
          isActive={selectedSubCategoryId === menu.id}
        >{menu.name}</MenuItem>)
    })
  }

  render() {
    const {
      menus,
      subMenus,
      isFavoritesSelected,
      isAllSelected,
      onSearchChange,
      onMobileMapToggle,
      searchValue,
    } = this.props

    const { subMenusFitCount, subMenusCount, searchOpened } = this.state
    const mainMenus = isFavoritesSelected ? [FAVORITES, ALL, ...menus] : [ALL, ...menus]
    const subMenusItems = subMenusFitCount > 0 ? subMenus.slice(0, subMenusFitCount) : null
    const moreMenusItems = subMenusFitCount < subMenusCount ? [MORE, ...subMenus.slice(subMenusFitCount, subMenus.length)] : null

    const isMoreShown = !isFavoritesSelected && !isAllSelected

    const mainMenusRender = mainMenus.map(menu => (
      <option
        value={menu.id}
        key={`main-menu-${menu.id}`}
      >{menu.name}
      </option>
    ))
    const subMenuRenderItems = !isAllSelected
      ? (subMenusItems && !isFavoritesSelected) && this.getMenuItems(subMenusItems)
      : this.getMenuItems(mainMenus.slice(1, subMenusFitCount + 1))

    const moreMenuRender = (isMoreShown && moreMenusItems)
      && moreMenusItems.map(menu => (
        <option
          value={menu.id}
          key={`more-menu-${menu.id}`}
        >{menu.name}
        </option>
      ))

    const linkMainItemToDOM = (elem) => {
      this.mainItem = elem
    }
    const linkSearchItemToDOM = (elem) => {
      this.searchItem = elem
    }
    const linkSubmenuAreaToDOM = (elem) => {
      this.submenuArea = elem
    }

    return (
      <MenuWrapper>
        <MenuItemFavorites onClick={this.onFavoritesClick} />
        <MenuDropdown innerRef={linkMainItemToDOM} onChange={this.onCategoryChange}>{mainMenusRender}</MenuDropdown>
        <MenuItemsWrapper innerRef={linkSubmenuAreaToDOM}>
          {subMenuRenderItems}
        </MenuItemsWrapper>
        {moreMenuRender && <MenuDropdown
          oneSided
          onChange={this.onSubCategoryChange}
        >{moreMenuRender}</MenuDropdown>}
        <MenuItemMap onClick={onMobileMapToggle} />
        <MenuSearch
          searchItem={linkSearchItemToDOM}
          onClick={this.onSearchOpen}
          onChange={onSearchChange}
          value={searchValue}
          isOpened={searchOpened}
        />
      </MenuWrapper>
    )
  }
}

Menu.propTypes = {
  menus: PropTypes.array.isRequired,
  subMenus: PropTypes.array,

  selectedSubCategoryId: PropTypes.string,
  isFavoritesSelected: PropTypes.bool,
  isAllSelected: PropTypes.bool,

  onFavoritesClick: PropTypes.func,
  onSubCategoryChange: PropTypes.func,
  onCategoryChange: PropTypes.func,
  onMobileMapToggle: PropTypes.func,

  onSearchChange: PropTypes.func,
  searchValue: PropTypes.string,
}

export default Menu
