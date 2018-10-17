import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
// import {} from '@fortawesome/free-regular-svg-icons'
// import {} from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faLevelUpAlt,
  faFolder,
  faPlusCircle,
  faUpload,
  faArrowsAlt,
  faICursor,
  faTrashAlt,
  faMinusCircle,
  faEdit,
  faArrowLeft,
  faDesktop,
  faFlask,
  faEllipsisH,
  faUsers,
  faCheckCircle,
  faTimesCircle,
  faDownload,
  faFile,
  faFileAlt,
  faFileArchive,
  faFileAudio,
  faFileCode,
  faFileExcel,
  faFileImage,
  faFilePdf,
  faFilePowerpoint,
  faFileVideo,
  faFileWord,
  faTimes,
  faInfoCircle,
  faCaretDown,
  faQuestionCircle,
  faProjectDiagram,
  faUser,
  faExternalLinkAlt,
  faSave
} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'

library.add([faHome, faLevelUpAlt, faFolder, faPlusCircle, faUpload, faArrowsAlt, faICursor, faTrashAlt, faMinusCircle, faEdit, faArrowLeft, faDesktop, faFlask, faEllipsisH, faUsers, faCheckCircle, faTimesCircle, faDownload, faFile, faFileAlt, faFileArchive, faFileAudio, faFileCode, faFileExcel, faFileImage, faFilePdf, faFilePowerpoint, faFileVideo, faFileWord, faTimes, faInfoCircle, faCaretDown, faQuestionCircle, faProjectDiagram, faUser, faExternalLinkAlt, faSave])

export default {
  install (Vue, options) {
    Vue.component('fa-icon', FontAwesomeIcon)
  }
}
