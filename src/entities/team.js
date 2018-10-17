import Entity from './entity'
import User from './user'
import UserTeamRoles from '@/staticCollections/userTeamRoles'
import UserTeam from './userTeam'

export default class Team extends Entity {
  get fillable () {
    return [
      'id',
      'name',
      'pivot',
      'created_at',
      'updated_at'
    ]
  }

  get relations () {
    return [
      {
        name: 'members',
        Type: User,
        is_collection: true
      }, {
        name: 'pivot',
        Type: UserTeam,
        is_collection: false
      }
    ]
  }

  get dates () {
    return ['created_at', 'updated_at']
  }

  get adminUsers () {
    return this.members.filter(user => user.pivot.role === UserTeamRoles.get('admin').value)
  }

  get users () {
    return this.members.filter(user => user.pivot.role === UserTeamRoles.get('user').value)
  }
}
