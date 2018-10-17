import iconMappingData from '../../data/mimeTypeIconMapping'
import rendererMappingData from '../../data/mimeTypeRendererMapping'

import UnhandledFormatRenderer from '../components/datasets/renderers/UnhandledFormatRenderer'

class MimeTypeResolver {
  iconCache = new Map()
  rendererCache = new Map()

  getRendererForMimeType (mimeType) {
    if (!mimeType) {
      return UnhandledFormatRenderer
    }

    if (this.rendererCache.has(mimeType)) {
      return this.rendererCache.get(mimeType)
    }

    const mappings = rendererMappingData()

    for (const index in mappings) {
      const block = mappings[index]
      for (const j in block.mimeTypes) {
        const pattern = block.mimeTypes[j]
        if (this.match(mimeType, pattern)) {
          this.rendererCache.set(mimeType, block.renderer)

          return block.renderer
        }
      }
    }

    return UnhandledFormatRenderer
  }

  getIconForMimeType (mimeType) {
    if (!mimeType) {
      return 'file'
    }

    if (this.iconCache.has(mimeType)) {
      return this.iconCache.get(mimeType)
    }

    const mappings = iconMappingData()

    for (const icon in mappings) {
      const mimes = mappings[icon]

      for (const n in mimes) {
        const pattern = mimes[n]

        if (this.match(mimeType, pattern)) {
          this.iconCache.set(mimeType, icon)

          return icon
        }
      }
    }

    this.iconCache.set(mimeType, 'file')

    return 'file'
  }

  match (mimeType, pattern) {
    if (typeof pattern === 'string') {
      if (pattern === mimeType) {
        return true
      }
    } else {
      if (pattern.test(mimeType)) {
        return true
      }
    }

    return false
  }
}

export default new MimeTypeResolver()
