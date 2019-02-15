import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette, size } from 'styled-theme'
import { Button } from 'components'
import { shadows } from '../../themes/extended'

const Wrapper = styled.div`
  background-color: ${palette('white', 0)};
  ${shadows.wide};
  margin: 5px 0;
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  
  @media ${size('mobile')} {
    padding-bottom: 10px;
  }
`

const Title = styled.h2`
  font-family: ${font('primary')};
  font-size: 16px;
  color: ${palette('brand', 0)};
  margin: 0;
  padding: 20px 10px;
  border-bottom: 1px solid ${palette('grayscale', 4)};
  
  @media ${size('mobile')} {
    font-size: 14px;
    padding: 10px;
  }
`

const Text = styled.p`
  font-family: ${font('primary')};
  font-size: 12px;
  color: ${palette('grayscale', 1)};
  margin: 0;
  padding: 20px 10px;
  
  @media ${size('mobile')} {
    padding: 10px;
  }
`

const ButtonHolder = styled.div`
  text-align: right;
  padding-right: 20px;
  
  @media ${size('mobile')} {
    padding: 0 10px;
  }
`

const EmptyListPanel = ({ title, description, ctaText, ctaClick }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Text>{description}</Text>
      <ButtonHolder><Button main onClick={ctaClick}>{ctaText}</Button></ButtonHolder>
    </Wrapper>
  )
}

EmptyListPanel.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ctaText: PropTypes.string,
  ctaClick: PropTypes.func,
}

export default EmptyListPanel
