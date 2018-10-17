import Entity from './entity'
import Team from './team'
import UserTeamRoles from '@/staticCollections/userTeamRoles'

export const PERMISSION_USER_TEAM_MANAGEMENT = 'user-team-management'
export const PERMISSION_DESKTOP_CLIENT_MANAGEMENT = 'desktop-client-management'

export default class User extends Entity {
  get fillable () {
    return [
      'id',
      'name',
      'email',
      'permissions',
      'pivot',
      'created_at',
      'updated_at'
    ]
  }

  get relations () {
    return [
      {
        name: 'teams',
        Type: Team,
        is_collection: true
      }
    ]
  }

  get adminTeams () {
    return this.teams.filter(team => team.pivot.role === UserTeamRoles.get('admin').value)
  }

  get userTeams () {
    return this.teams.filter(team => team.pivot.role === UserTeamRoles.get('user').value)
  }

  hasAdminDashboardAccess () {
    return [PERMISSION_USER_TEAM_MANAGEMENT, PERMISSION_DESKTOP_CLIENT_MANAGEMENT].some(p => this.permissions.includes(p))
  }

  get dates () {
    return ['created_at', 'updated_at']
  }
}
