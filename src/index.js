import { HyperSpotifyFooterFactory } from './containers/HyperSpotifyFooter'

export function reduceUI (state, { type, config }) {
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD': {
      return state.set('hyperSpotify', config.hyperSpotify)
    }
  }

  return state
}

export function mapHyperState ({ ui: { colors, fontFamily, hyperSpotify } }, map) {
  return Object.assign({}, map, {
    colors,
    fontFamily,
    hyperSpotify
  })
}

export function decorateTerms (Terms, { React }) {
  const { Component } = React

  const HyperSpotifyFooter = HyperSpotifyFooterFactory(React) // eslint-disable-line no-unused-vars

  return class extends Component {
    render () {
      const { customChildren } = this.props

      const existingChildren = customChildren ? customChildren instanceof Array ? customChildren : [customChildren] : []

      return (
        <Terms
          {...this.props}
          customChildren={existingChildren.concat(<HyperSpotifyFooter />)}
        />
      )
    }
  }
}
