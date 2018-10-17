import Entity from './entity'
import User from './user'

export default class JoinInvitation extends Entity {
  get fillable () {
    return [
      'expires_at',
      'token'
    ]
  }

  get relations () {
    return [
      {
        name: 'user',
        Type: User,
        is_collection: false
      }
    ]
  }
}
