import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification) return null;
  if (!notification.message) return null;

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { notification: state.notifications }
}

export default connect(mapStateToProps)(Notification)