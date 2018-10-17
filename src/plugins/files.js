// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
export const filters = {
  humanFileSize (bytes, si = true) {
    if (!Number.isInteger(bytes)) {
      return bytes
    }

    const thresh = si ? 1000 : 1024
    if (Math.abs(bytes) < thresh) {
      return bytes + ' B'
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

    let u = -1

    do {
      bytes /= thresh
      ++u
    } while (Math.abs(bytes) >= thresh && u < units.length - 1)

    return bytes.toFixed(1) + ' ' + units[u]
  }
}

export default {
  install (Vue, options) {
    Vue.mixin({
      filters: filters
    })
  }
}
