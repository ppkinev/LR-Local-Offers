import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { closePopup, openPopupSingleLevel } from 'store/actions'
import { fromPopup } from 'store/selectors'
import { Popup, LevelColumn, Fetching, SingleLevelLayout } from 'components'

const PopupContainer = ({
                          isLevelPopup,
                          isSingleLevel,
                          popupContent,
                          closePopup,
                          openPopupSingleLevel,
                        }) => {
  let title = ''
  let content = null

  if (popupContent) {
    if (isLevelPopup) {
      title = 'Here\'s how you can increase your point\'s amount'
      content = popupContent.map(level => (
        <LevelColumn
          key={`level-column-${level.id}`}
          cashback={level.cashback}
          descriptionItems={level.descriptionItems}
          image={level.image}
          title={level.title}
          id={level.id}
          isActive={level.isActive}
          onClick={() => openPopupSingleLevel(level.id)}
        />
      ))
    }
    if (isSingleLevel) {
      title = 'Do something to get this level'
      content = (
        <SingleLevelLayout
          title={popupContent.title}
          image={popupContent.image}
          text={popupContent.description}
          ctaText={popupContent.ctaText}
          onClick={() => window.console.info('Something\'s happened here')}
        />
      )
    }
  } else {
    content = (<Fetching />)
  }

  return (
    <Popup title={title} onClose={closePopup} isLevelPopup={isLevelPopup}>
      {content}
    </Popup>
  )
}

PopupContainer.propTypes = {
  isLevelPopup: PropTypes.bool,
  isSingleLevel: PropTypes.bool,
  popupContent: PropTypes.any,
  closePopup: PropTypes.func,
  openPopupSingleLevel: PropTypes.func,
}

const mapStateToProps = state => ({
  isLevelPopup: fromPopup.isLevelsType(state),
  isSingleLevel: fromPopup.isSingleLevel(state),
  popupContent: fromPopup.popupContent(state),
})

const mapDispatchToProps = dispatch => ({
  closePopup: () => dispatch(closePopup()),
  openPopupSingleLevel: id => dispatch(openPopupSingleLevel(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PopupContainer)
