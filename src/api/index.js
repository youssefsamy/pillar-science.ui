import $http from '@/services/http'

export class Api {
  constructor (prefix) {
    this.prefix = prefix || '/api'
  }
  me () {
    return $http.get(`${this.prefix}/auth/me`)
  }
  search (query, limit = null) {
    return $http.get(`${this.prefix}/search?query=${query}${(limit) ? `&limit=${limit}` : ''}`)
  }
  login (credentials) {
    return $http.post(`${this.prefix}/auth/login`, credentials)
  }
  logout () {
    return $http.post(`${this.prefix}/auth/logout`)
  }

  register (credentials) {
    return $http.post(`${this.prefix}/auth/signup`, credentials)
  }

  socialLogin (social) {
    return $http.get(`${this.prefix}/auth/login/` + social)
  }

  forgotPassword (data) {
    return $http.post(`${this.prefix}/auth/recovery`, data)
  }

  resetPassword (data) {
    return $http.post(`${this.prefix}/auth/resetpassword`, data)
  }

  authRefresh () {
    return $http.post(`${this.prefix}/auth/refresh`)
  }
  datasetMetadata (datasetId) {
    return $http.get(`${this.prefix}/datasets/${datasetId}/metadata`)
  }
  datasetMetadataCreate (datasetId, data) {
    return $http.post(`${this.prefix}/datasets/${datasetId}/metadata`, data)
  }
  datasetVersionCreate (datasetId, file, config = {}) {
    const formData = new FormData()

    formData.append('file', file)

    return $http.post(`${this.prefix}/datasets/${datasetId}/dataset-versions`, formData, config)
  }
  metadataDelete (metadataId) {
    return $http.delete(`${this.prefix}/metadata/${metadataId}`)
  }
  dataset (datasetId) {
    return $http.get(`${this.prefix}/datasets/${datasetId}`)
  }
  datasetDescendants (datasetId) {
    return $http.get(`${this.prefix}/datasets/${datasetId}/tree`)
  }
  datasetPreview (datasetId) {
    return $http.get(`${this.prefix}/datasets/${datasetId}/preview`)
  }
  datasetVersionPreview (datasetId, versionId) {
    return $http.get(`${this.prefix}/datasets/${datasetId}/dataset-versions/${versionId}/preview`)
  }
  datasetUpdate (datasetId, data) {
    return $http.post(`${this.prefix}/datasets/${datasetId}/update`, data)
  }
  datasetUpload (datasetId, data, config = {}) {
    return $http.post(`${this.prefix}/datasets/${datasetId}/upload`, data, config)
  }
  datasetCreateDirectory (datasetId, data) {
    return $http.post(`${this.prefix}/datasets/${datasetId}/create-directory`, data)
  }
  datasetDelete (datasetId) {
    return $http.delete(`${this.prefix}/datasets/${datasetId}`)
  }
  datasetAncestors (datasetId) {
    return $http.get(`${this.prefix}/datasets/${datasetId}/ancestors`)
  }
  datasetProtocol (datasetId, protocolId) {
    return $http.get(`${this.prefix}/datasets/${datasetId}/protocols/${protocolId}`)
  }
  datasetProtocolCreate (datasetId, data) {
    return $http.post(`${this.prefix}/datasets/${datasetId}/protocols`, data)
  }
  datasetProtocolAttach (datasetId, protocolId) {
    return $http.put(`${this.prefix}/datasets/${datasetId}/protocols/${protocolId}`)
  }
  datasetMoveTo (sourceDatasetId, targetDatasetId) {
    return $http.put(`${this.prefix}/datasets/${sourceDatasetId}/move-to/${targetDatasetId}`)
  }
  datasetMapTo (sourceDatasetId, targetDatasetId) {
    return $http.post(`${this.prefix}/datasets/${sourceDatasetId}/map-to/${targetDatasetId}`)
  }
  protocols () {
    return $http.get(`${this.prefix}/protocols`)
  }
  protocolUpdate (protocolId, data) {
    return $http.put(`${this.prefix}/protocols/${protocolId}`, data)
  }
  protocol (protocolId) {
    return $http.get(`${this.prefix}/protocols/${protocolId}`)
  }
  datasetProtocolRemove (datasetId, protocolId) {
    return $http.delete(`${this.prefix}/datasets/${datasetId}/protocols/${protocolId}`)
  }
  project (projectId) {
    return $http.get(`${this.prefix}/projects/${projectId}`)
  }
  projects () {
    return $http.get(`${this.prefix}/projects`)
  }
  projectDataset (projectId) {
    return $http.get(`${this.prefix}/projects/${projectId}/dataset`)
  }
  projectUpdate (projectId, data) {
    return $http.put(`${this.prefix}/projects/${projectId}`, data)
  }
  projectUsers (projectId) {
    return $http.get(`${this.prefix}/projects/${projectId}/users`)
  }
  projectUsersAttach (projectId, userId, data) {
    return $http.put(`${this.prefix}/projects/${projectId}/users/${userId}`, data)
  }
  projectUsersDelete (projectId, userId) {
    return $http.delete(`${this.prefix}/projects/${projectId}/users/${userId}`)
  }
  userProject (userId, projectId) {
    return $http.get(`${this.prefix}/users/${userId}/projects/${projectId}`)
  }
  team (teamId) {
    return $http.get(`${this.prefix}/teams/${teamId}`)
  }
  teams () {
    return $http.get(`${this.prefix}/teams`)
  }
  teamSearch (query) {
    return $http.get(`${this.prefix}/teams/search`)
  }
  teamCreate (data) {
    return $http.post(`${this.prefix}/teams`, data)
  }
  teamDelete (teamId) {
    return $http.delete(`${this.prefix}/teams/${teamId}`)
  }
  teamProjectCreate (teamId, data) {
    return $http.post(`${this.prefix}/teams/${teamId}/projects`, data)
  }
  teamRemoteDirectories (teamId, computerId) {
    return $http.get(`${this.prefix}/teams/${teamId}/remote-directories${computerId ? `?computer=${computerId}` : ''}`)
  }
  remoteDirectory (deviceId) {
    return $http.get(`${this.prefix}/remote-directories/${deviceId}`)
  }
  remoteDirectoryUpdate (deviceId, data) {
    return $http.put(`${this.prefix}/remote-directories/${deviceId}`, data)
  }
  teamComputers (teamId) {
    return $http.get(`${this.prefix}/teams/${teamId}/computers`)
  }
  user (userId) {
    return $http.get(`${this.prefix}/users/${userId}`)
  }
  users () {
    return $http.get(`${this.prefix}/users`)
  }
  userUpdate (userId, data) {
    return $http.put(`${this.prefix}/users/${userId}`, data)
  }
  userPermissions () {
    return $http.get(`${this.prefix}/users/permissions`)
  }
  userInvitationRenew (userId) {
    return $http.post(`${this.prefix}/users/${userId}/invitations`)
  }
  invitation (token) {
    return $http.get(`${this.prefix}/invitations/${token}`)
  }
  invitationConsume (token, data) {
    return $http.post(`${this.prefix}/invitations/${token}/consume`, data)
  }
  searchAvailableProtocols (datasetId, searchQuery) {
    if (!searchQuery) {
      searchQuery = ''
    }

    return $http.get(`${this.prefix}/datasets/${datasetId}/protocols-available?query=${searchQuery}`)
  }
  searchProjectAvailableUsers (projectId, searchQuery) {
    if (!searchQuery) {
      searchQuery = ''
    }

    return $http.get(`${this.prefix}/projects/${projectId}/users-available?query=${searchQuery}`)
  }
  desktopClientUploadRelease (file, config = {}) {
    const formData = new FormData()

    formData.append('application', file)

    return $http.post(`${this.prefix}/desktop-clients`, formData, config)
  }
  desktopClients () {
    return $http.get(`${this.prefix}/desktop-clients`)
  }
}

const client = new Api()

export default client
