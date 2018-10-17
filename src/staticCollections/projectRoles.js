import Dict from './dict'

const items = {
  viewer: {
    order: 1,
    value: 'viewer',
    translationKey: 'staticCollections.projectRoles.role.viewer'
  },
  contributor: {
    order: 2,
    value: 'contributor',
    translationKey: 'staticCollections.projectRoles.role.contributor'
  },
  manager: {
    order: 3,
    value: 'manager',
    translationKey: 'staticCollections.projectRoles.role.manager'
  }
}

export default new Dict(items)
