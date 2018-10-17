import Entity from './entity'
import RolesEnum from '@/staticCollections/userTeamRoles'

export default class UserTeam extends Entity {
  get fillable () {
    return [
      'role',
      'created_at',
      'updated_at'
    ]
  }

  get staticCollections () {
    return [
      {
        name: 'roleStructure',
        Type: RolesEnum,
        field: 'role'
      }
    ]
  }
}
