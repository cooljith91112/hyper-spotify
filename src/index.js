import { HyperSpotifyHeaderFactory } from './components/HyperSpotifyHeader'
import { HyperSpotifyFooterFactory } from './components/HyperSpotifyFooter'

export function decorateConfig (config) {
  return {
    ...config
  }
}

export function reduceUI (state, {type, config}) {
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD': {
      return state.set('hyperSpotify', config.hyperSpotify)
    }
  }

  return state
}

export function mapHyperState ({ ui: { hyperSpotify } }, map) {
  // console.log({map})

  const position = hyperSpotify.position || 'bottom'
  const hyperStatuslineCompatibleMode = hyperSpotify.hyperStatuslineCompatibleMode || false

  return {
    ...map,
    hyperSpotify: {
      position,
      controlsPosition: 'default',
      hyperStatuslineCompatibleMode,
      ...hyperSpotify
    },
    customCSS: `
      ${map.customCSS}

      .terms_terms {
        margin-bottom: ${(position === 'bottom' && hyperStatuslineCompatibleMode) ? '60' : '30'}px;
      }
    `
  }
}

export function decorateHyper (Hyper, { React }) {
  const { Component } = React

  const HyperSpotifyHeader = HyperSpotifyHeaderFactory(React) // eslint-disable-line no-unused-vars
  const HyperSpotifyFooter = HyperSpotifyFooterFactory(React) // eslint-disable-line no-unused-vars

  return class extends Component {
    render () {
      const { customChildrenBefore, customChildren, hyperSpotify } = this.props

      let existingChildrenBefore = customChildrenBefore ? customChildrenBefore instanceof Array ? customChildrenBefore : [customChildrenBefore] : []
      let existingChildren = customChildren ? customChildren instanceof Array ? customChildren : [customChildren] : []

      const position = hyperSpotify.position || 'bottom'
      if (position === 'top') {
        existingChildrenBefore = existingChildrenBefore.concat(<HyperSpotifyHeader pluginConfig={hyperSpotify} />)
      }

      if (position === 'bottom') {
        existingChildren = existingChildren.concat(<HyperSpotifyFooter pluginConfig={hyperSpotify} />)
      }

      return (
        <Hyper
          {...this.props}
          customChildrenBefore={existingChildrenBefore}
          customChildren={existingChildren}
        />
      )
    }
  }
}
