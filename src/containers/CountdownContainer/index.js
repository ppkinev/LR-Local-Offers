/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Countdown } from 'components'

const notNumbersOnlyRXP = /\D/
const fixN = num => num > 9 ? num : `0${num}`
const expDate = date => notNumbersOnlyRXP.test(date) ? date : Number(date)

class CountdownContainer extends Component {
  state = {
    time: '',
    interval: window.setInterval(() => {
      this.updateTime()
    }, 1000),
  }

  componentWillUnmount() {
    if (this.state.interval) window.clearInterval(this.state.interval)
  }

  updateTime() {
    const { expirationDate } = this.props
    const second = 1000
    const minute = second * 60
    const hour = minute * 60
    const day = hour * 24

    const distance = (new Date(expDate(expirationDate))) - new Date()

    const days = Math.floor(distance / day)
    const hours = Math.floor((distance % day) / hour)
    const minutes = Math.floor((distance % hour) / minute)
    // const seconds = Math.floor((distance % minute) / second)
    if (distance < 0) {
      this.setState({
        time: 'EXPIRED',
      })
    } else {
      this.setState({
        time: `Expires in ${days}d, ${fixN(hours)}hrs, ${fixN(minutes)}mins`,
      })
    }
  }

  render() {
    return <Countdown>{this.state.time}</Countdown>
  }
}

CountdownContainer.propTypes = {
  expirationDate: PropTypes.string,
}

export default CountdownContainer
