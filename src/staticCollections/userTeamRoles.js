import Dict from './dict'

const items = {
  admin: {
    order: 1,
    value: 'admin',
    translationKey: 'staticCollections.userTeam.role.admin'
  },
  user: {
    order: 2,
    value: 'user',
    translationKey: 'staticCollections.userTeam.role.user'
  }
}

export default new Dict(items)
