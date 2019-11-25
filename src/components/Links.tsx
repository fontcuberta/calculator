import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Link from "@material-ui/core/Link"
import Typography from "@material-ui/core/Typography"

const useStyles = makeStyles(theme => ({
  link: {
    margin: theme.spacing(3),
  },
}))

export default function Links() {
  const classes = useStyles()
  const preventDefault = (event: any) => event.preventDefault()

  return (
    <div className="header">
      <div className="custom-logo">
        <a href="/index">
          <img src="logo-white.png" alt="cuantix" />
        </a>
      </div>
      <div className="menu">
        <Typography>
          <Link
            href="#"
            onClick={preventDefault}
            color="inherit"
            underline="none"
            className={classes.link}
          >
            {"Nuestro Equipo"}
          </Link>
          <Link
            href="#"
            onClick={preventDefault}
            color="inherit"
            underline="none"
            className={classes.link}
          >
            {"Noticias"}
          </Link>
          <Link
            href="#"
            onClick={preventDefault}
            color="inherit"
            underline="none"
            className={classes.link}
          >
            {"Recursos"}
          </Link>
          <Link
            href="#"
            onClick={preventDefault}
            color="inherit"
            underline="none"
            className={classes.link}
          >
            {"Blog"}
          </Link>
          <Link
            href="#"
            onClick={preventDefault}
            color="inherit"
            underline="none"
            className={classes.link}
          >
            {"Login"}
          </Link>
        </Typography>
      </div>

      <style jsx>{`
        .header {
          width: 100%;
        }
        .custom-logo {
          float: left;
        }
        .custom-logo img {
          margin-left: 20px;
          padding-top: 10px;
          max-width: 109px;
        }
        .menu {
          float: right;
          margin-right: 20px;
          min-height: 60px;
          padding: 18px;
        }
        .last-child {
          border: 2px solid #fff;
        }
      `}</style>
    </div>
  )
}
