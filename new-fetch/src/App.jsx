import Navbar from "./Componenst/Navbar"
import NewsBoard from "./Componenst/NewsBoard"
import { useState } from "react"

function App() {
  const [category, setCategory] =useState("general");

  return (
    <>
      <Navbar  setCategory={setCategory} />
      <NewsBoard   category={category} />

    </>
  )
}

export default App
