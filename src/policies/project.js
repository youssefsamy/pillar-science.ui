import projectRoles from '@/staticCollections/projectRoles'

const roles = projectRoles.getAsEnum()

export default {
  before ({project}) {
    if (!project || !project.pivot || !project.pivot.role) {
      console.log(project)
      console.warn('Project role undefined. Cannot evaluate project policies')
      return false
    }
  },
  editOverview ({project}) {
    return [
      roles.contributor,
      roles.manager
    ].includes(project.pivot.role)
  },
  editData ({project}) {
    return [
      roles.contributor,
      roles.manager
    ].includes(project.pivot.role)
  },
  viewSharing ({project}) {
    return [
      roles.viewer,
      roles.contributor,
      roles.manager
    ].includes(project.pivot.role)
  },
  editSharing ({project}) {
    return [
      roles.contributor,
      roles.manager
    ].includes(project.pivot.role)
  },
  viewSettings ({project}) {
    return [
      roles.manager
    ].includes(project.pivot.role)
  },
  editSettings ({project}) {
    return [
      roles.manager
    ].includes(project.pivot.role)
  }
}
