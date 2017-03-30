
import React from 'react'
import {Link} from 'react-router'

import './style.css'

const docs = [
  {
    path: '/docs',
    title: 'Getting Started',
    html: require('./getting-started.md')
  }, {
    path: '/docs/tutorial',
    title: 'Tutorial',
    html: require('./tutorial.md')
  }, {
    path: '/docs/framework',
    title: 'Framework',
    html: require('./framework.md')
  }, {
    path: '/docs/framework#objectives',
    title: 'Objectives',
    level: 1
  }, {
    path: '/docs/framework#architecture',
    title: 'Architecture',
    level: 1
  }, {
    path: '/docs/framework#adopting-the-framework',
    title: 'Adopting the framework',
    level: 1
  }, {
    path: '/docs/framework#define-your-protocols',
    title: 'Protocol',
    level: 1
  }, {
    path: '/docs/framework#encapsulate-your-environment',
    title: 'Dockerize',
    level: 1
  }, {
    path: '/docs/framework#separate-your-data',
    title: 'Datasets',
    level: 1
  }, {
    path: '/docs/framework#save-your-results',
    title: 'Results',
    level: 1
  }, {
    path: '/docs/framework#run',
    title: 'Run',
    level: 1
  }, {
    path: '/docs/gpu-support',
    title: 'GPU support',
    html: require('./gpu-support.md')
  }, {
    path: '/docs/data',
    title: 'Data',
    html: require('./data.md')
  }
]

const MenuButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },
  render () {
    return (
      <div className='menu-button' onClick={this.props.onClick}>
        <span className='octicon octicon-three-bars'></span>
      </div>
    )
  }
})

const DocsMenu = React.createClass({
  propTypes: {
    location: React.PropTypes.object,
    open: React.PropTypes.bool
  },
  render () {
    const {pathname, hash} = this.props.location
    if (!this.props.open) return null
    return (
      <div className='docs-menu'>
        <h4>Documentation</h4>
        {
          docs.map(function (doc) {
            let selected = doc.path === `${pathname}${hash}` ? 'doc-selected' : undefined
            let classes = `doc-level-${doc.level} ${selected}`
            return (
              <Link key={doc.path} to={doc.path} className={classes}>
                {doc.title}
              </Link>
            )
          })
        }
      </div>
    )
  }
})

let not_found = require('./404.md')
function getDocsHTML (pathname) {
  let html
  docs.forEach(function (doc) {
    if (pathname === doc.path) html = doc.html
  })
  if (!html) html = not_found
  return html
}

// TODO: Open source docs.
// Users can submit issues if there are any questions
export default React.createClass({
  propTypes: {
    location: React.PropTypes.object
  },
  mobileClose () {
    if (window.matchMedia('(max-width: 600px)').matches) {
      this.setState({open: false})
    }
  },
  render: function () {
    const {pathname} = this.props.location
    return (
      <div className='flex-row'>
        <DocsMenu open={this.state.open} location={this.props.location}/>
        <div onClick={this.mobileClose} className='documentation' dangerouslySetInnerHTML={{__html: getDocsHTML(pathname)}}/>
        <MenuButton onClick={this.toggleMenuOpen}/>
      </div>
    )
  },
  componentWillMount () {
    this.configure()
    window.addEventListener('resize', this.configure)
  },
  getInitialState () {
    return {open: true}
  },
  toggleMenuOpen () {
    this.setState({open: !this.state.open})
  },
  configure () {
    if (!window.matchMedia('(max-width: 600px)').matches) {
      this.setState({open: true})
    }
  },
  componentDidMount () {
    const {hash} = this.props.location
    if (!hash) return
    // Scroll to element
    // FIXME: Doesn't go to offset on refresh
    let elem = document.getElementById(hash.replace('#', ''))
    if (elem) window.scrollTo(0, elem.offsetTop - 70)
  },
  componentWillUnmount () {
    window.removeEventListener('resize', this.configure)
  },
  componentDidUpdate (prevProps) {
    const {hash} = this.props.location
    if (prevProps && prevProps.location.hash === hash) return
    if (!hash) return window.scrollTo(0, 0)
    // Scroll to element
    let elem = document.getElementById(hash.replace('#', ''))
    if (elem) window.scrollTo(0, elem.offsetTop - 70)
  }
})

