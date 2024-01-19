import { useState } from "react"

import HeroBanner from "./HeroBanner"
import SearchResult from "./SearchResult"

function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <>
      <HeroBanner searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchResult searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </>
  )
}

export default Home
