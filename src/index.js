import { HyperSpotifyHeaderFactory } from './components/HyperSpotifyHeader'
import { HyperSpotifyFooterFactory } from './components/HyperSpotifyFooter'

export function reduceUI (state, {type, config}) {
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD': {
      return state.set('hyperSpotify', config.hyperSpotify)
    }
  }

  return state
}

export function mapTermsState ({ ui: { hyperSpotify } }, map) {
  return { ...map, hyperSpotify: { position: 'bottom', ...hyperSpotify } }
}

export function decorateTerms (Terms, { React }) {
  const { Component } = React

  const HyperSpotifyHeader = HyperSpotifyHeaderFactory(React) // eslint-disable-line no-unused-vars
  const HyperSpotifyFooter = HyperSpotifyFooterFactory(React) // eslint-disable-line no-unused-vars

  return class extends Component {
    render () {
      const { customChildrenBefore, customChildren, hyperSpotify: { position } } = this.props

      let existingChildrenBefore = customChildrenBefore ? customChildrenBefore instanceof Array ? customChildrenBefore : [customChildrenBefore] : []
      let existingChildren = customChildren ? customChildren instanceof Array ? customChildren : [customChildren] : []

      if (position === 'top') {
        existingChildrenBefore = existingChildrenBefore.concat(<HyperSpotifyHeader />)
      }

      if (position === 'bottom') {
        existingChildren = existingChildren.concat(<HyperSpotifyFooter />)
      }

      return (
        <Terms
          {...this.props}
          customChildrenBefore={existingChildrenBefore}
          customChildren={existingChildren}
        />
      )
    }
  }
}
