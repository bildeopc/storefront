import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"
import CustomCursor from "../components/custom-cursor"
import CustomCursorManager from "../components/custom-cursor/context/manager"

const Layout: React.FC = ({ children }) => {
  return (
    <CustomCursorManager>
    <div>
      <CustomCursor />
      <Nav />
      <main className="relative">{children}</main>
      <Footer />
    </div>
    </CustomCursorManager>
  )
}

export default Layout
