import Entity from './entity'
import Team from './team'

export default class Project extends Entity {
  get fillable () {
    return [
      'id',
      'name',
      'created_at',
      'updated_at'
    ]
  }

  get relations () {
    return [
      {
        name: 'team',
        Type: Team,
        is_collection: false
      }
    ]
  }

  get dates () {
    return ['created_at', 'updated_at']
  }
}
