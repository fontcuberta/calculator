import React from "react"
import Links from "./Links"
const Navigator = () => {
  return (
    <div>
      <React.Fragment>
        <div className="banner-area">
          <Links />
        </div>
      </React.Fragment>

      <style jsx>{`
        .banner-area {
          font-weight: 300;
          color: #fff;
          z-index: 999;
          min-height: 60px;
          background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
            linear-gradient(
              58deg,
              hsla(36.98275862068966, 92.8%, 49.02%, 0.2),
              hsla(0.9230769230769231, 73.03%, 34.9%, 0.35)
            ),
            linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5));
        }
      `}</style>
    </div>
  )
}

export default Navigator
