import React from "react"
import { Link } from "gatsby"

import leftArrow from "../images/arrow-left-solid.svg"
import rightArrow from "../images/arrow-right-solid.svg"

const PrevNextProjectLink = ({ direction, linkUrl }) => {
  if (direction === 'previous') {
    return (
      <Link to={linkUrl} className="prevProject">
        <img src={leftArrow} alt="" />
        <span>Previous Project</span>
      </Link>
    )
  }
  return (
    <Link to={linkUrl} className="nextProject">
      <span>Next Project</span>
      <img src={rightArrow} alt="" />
    </Link>
  )
}

export default PrevNextProjectLink
