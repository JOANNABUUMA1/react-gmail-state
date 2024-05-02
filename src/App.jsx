import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  console.log(initialEmails)

  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [showInbox, setShowInbox] = useState(true)
  const [showStarred, setShowStarred] = useState(false)

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

  function list() {
    return emails.map(email => {
      let emailClassName;
      if (email.read) {
        emailClassName = "email read"
      } else {
        emailClassName = "email unread"
      }

      if (hideRead && email.read) return
      if (showStarred && !email.starred) return

      return <li key={email.id} className={emailClassName}>
        <div className="select">
          <input
            className="select-checkbox"
            type="checkbox"
            checked={email.read}
            onChange={() => { toggleRead(email.id) }} />
        </div>
        <div className="star">
          <input
            className="star-checkbox"
            type="checkbox"
            checked={email.starred}
            onChange={() => { toggleStar(email.id) }}
          />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
      </li>
    })
  }

  function toggleRead(id) {
    setEmails(emails.map(email => {
      if (id === email.id) {
        email.read = !email.read
      }
      return email
    }))
  }

  function toggleStar(id) {
    setEmails(emails.map(email => {
      if (id === email.id) {
        email.starred = !email.starred
      }
      return email
    }))
  }

  function handleHideRead() {
    setHideRead(!hideRead)
  }

  function handleShowInbox() {
    setShowInbox(true)
    setShowStarred(false)
    setHideRead(false)
  }

  function handleShowStarred() {
    setShowStarred(!showStarred)
    setShowInbox(false)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className={"item " + (showInbox ? "active" : "")}
            onClick={handleShowInbox}
          >
            <span className="label">Inbox</span>
            <span className="count">{unreadEmails.length}</span>
          </li>
          <li
            className={"item " + (showStarred ? "active" : "")}
            onClick={handleShowStarred}
          >
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={handleHideRead}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>{list()}</ul>
      </main>
    </div>
  )
}

export default App
