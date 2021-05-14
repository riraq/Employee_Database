import React from "react"

function Header() {
  return (
  <header className="bg-dark text-white p-3 text-center">
    <h1 className="p-2 m-2">Employee Directory</h1>
    <p className="p-2 m-2">Click on "Name" column to sort alphabetically or use search to narrow results by first name.</p>
  </header>
  )
}

export default Header;