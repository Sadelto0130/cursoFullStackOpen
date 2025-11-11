import { useEffect } from "react"

const Notification = ({notification, clearNotification}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  useEffect(() => {
    if(notification) {
      const timer = setTimeout(() => {
        clearNotification()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [notification, clearNotification])

  if (!notification) return null

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
