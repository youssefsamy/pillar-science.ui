import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import auth from '@/services/auth'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Register from '@/components/Register'
import ForgotPassword from '@/components/ForgotPassword'
import ResetPassword from '@/components/ResetPassword'
import Home from '@/components/Home'
import DatasetMetadata from '@/components/datasets/Metadata'
import DatasetProtocol from '@/components/Protocol'
import DatasetProtocolEdit from '@/components/ProtocolForm'
import Protocols from '@/components/Protocols'
import Dataset from '@/components/Dataset'
import ProjectCreateWizard from '@/components/ProjectCreateWizard'
import Projects from '@/components/Projects'
import Project from '@/components/Project'
import ProjectOverview from '@/components/ProjectOverview'
import ProjectData from '@/components/ProjectData'
import ProjectSettings from '@/components/ProjectSettings'
import ProjectSharing from '@/components/ProjectSharing'
import Team from '@/components/Team'
import TeamComputer from '@/components/TeamComputer'
import TeamDevicesSave from '@/components/TeamRemoteDirectoriesSave'
import TeamComputers from '@/components/TeamComputers'
import AdminHome from '@/components/admin/Home'
import AdminUsers from '@/components/admin/Users'
import AdminUsersSave from '@/components/admin/UsersSave'
import AdminTeams from '@/components/admin/Teams'
import AdminTeamsCreate from '@/components/admin/TeamsCreate'
import DesktopClientReleases from '@/components/admin/DesktopClientReleases'
import FirstLogin from '@/components/FirstLogin'
import Device from '@/components/Device'
import NotFound from '@/components/special/404'
import Help from '@/components/Help'
import MetadataExplainer from '@/components/help/MetadataExplainer'
import GettingStarted from '@/components/help/GettingStarted'
import Search from '@/components/Search'
import {PERMISSION_DESKTOP_CLIENT_MANAGEMENT, PERMISSION_USER_TEAM_MANAGEMENT} from '../entities/user'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'index',
    component: Index
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/register',
    name: 'register',
    component: Register
  }, {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: ForgotPassword
  }, {
    path: '/resetpassword/:token',
    name: 'resetpassword',
    component: ResetPassword
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      auth: true
    }
  }, {
    path: '/search/:query',
    name: 'search',
    component: Search,
    meta: {
      auth: true
    }
  }, {
    path: '/help',
    name: 'help',
    component: Help,
    meta: {
      auth: true
    },
    children: [{
      path: 'getting-started',
      name: 'help_getting_started',
      component: GettingStarted,
      meta: {
        title: 'help.categories.general.items.gettingStarted.label',
        auth: true
      }
    }, {
      path: 'metadata',
      name: 'help_metadata',
      component: MetadataExplainer,
      meta: {
        title: 'help.categories.metadata.items.metadata.label',
        auth: true
      }
    }]
  }, {
    path: '/datasets/:dataset_id/metadata',
    name: 'dataset_metadata',
    component: DatasetMetadata,
    meta: {
      auth: true
    }
  }, {
    path: '/datasets/:dataset_id/protocols/create',
    name: 'dataset_protocol_create',
    component: DatasetProtocolEdit,
    meta: {
      auth: true
    }
  }, {
    path: '/datasets/:dataset_id/protocols/:protocol_id',
    name: 'dataset_protocol',
    component: DatasetProtocol,
    meta: {
      auth: true
    }
  }, {
    path: '/datasets/:dataset_id/protocols/:protocol_id/edit',
    name: 'dataset_protocol_edit',
    component: DatasetProtocolEdit,
    meta: {
      auth: true
    }
  }, {
    path: '/protocols',
    name: 'protocols',
    component: Protocols,
    meta: {
      auth: true
    }
  }, {
    path: '/protocols/:protocol_id',
    name: 'protocol',
    component: DatasetProtocol,
    meta: {
      auth: true
    }
  }, {
    path: '/protocols/:protocol_id/edit',
    name: 'protocol_edit',
    component: DatasetProtocolEdit,
    meta: {
      auth: true
    }
  }, {
    path: '/datasets/:id',
    name: 'dataset',
    component: Dataset,
    meta: {
      auth: true
    }
  }, {
    path: '/projects/create',
    name: 'project_create_wizard',
    component: ProjectCreateWizard,
    meta: {
      auth: true
    }
  }, {
    path: '/projects/:id',
    name: 'project',
    component: Project,
    meta: {
      auth: true
    },
    children: [
      {
        path: 'overview',
        name: 'project_overview',
        component: ProjectOverview,
        meta: {
          auth: true
        }
      }, {
        path: 'data',
        name: 'project_data',
        component: ProjectData,
        meta: {
          auth: true
        }
      }, {
        path: 'settings',
        name: 'project_settings',
        component: ProjectSettings,
        meta: {
          auth: true
        }
      }, {
        path: 'sharing',
        name: 'project_sharing',
        component: ProjectSharing,
        meta: {
          auth: true
        }
      }
    ]
  }, {
    path: '/projects',
    name: 'projects',
    component: Projects,
    meta: {
      auth: true
    }
  }, {
    path: '/teams/:id',
    name: 'team',
    component: Team,
    meta: {
      auth: true
    },
    children: [
      {
        path: 'computers',
        name: 'team_computers',
        component: TeamComputers,
        meta: {
          auth: true
        }
      },
      {
        path: 'computer/:computer_id',
        name: 'team_computer',
        component: TeamComputer,
        meta: {
          auth: true
        }
      }, {
        path: 'remote-directories/:device_id',
        name: 'team_device',
        component: Device,
        meta: {
          auth: true
        }
      }, {
        path: 'remote-directories/:device_id/edit',
        name: 'team_device_edit',
        component: TeamDevicesSave,
        meta: {
          auth: true
        }
      }
    ]
  }, {
    path: '/admin',
    name: 'admin_home',
    component: AdminHome,
    meta: {
      auth: true,
      admin: true
    }
  }, {
    path: '/admin/users',
    name: 'admin_users',
    component: AdminUsers,
    meta: {
      auth: true,
      admin: true,
      permissions: [
        PERMISSION_USER_TEAM_MANAGEMENT
      ]
    }
  }, {
    path: '/admin/users/create',
    name: 'admin_users_create',
    component: AdminUsersSave,
    meta: {
      auth: true,
      admin: true,
      permissions: [
        PERMISSION_USER_TEAM_MANAGEMENT
      ]
    }
  }, {
    path: '/admin/users/:id',
    name: 'admin_users_edit',
    component: AdminUsersSave,
    meta: {
      auth: true,
      admin: true,
      permissions: [
        PERMISSION_USER_TEAM_MANAGEMENT
      ]
    }
  }, {
    path: '/admin/teams',
    name: 'admin_teams',
    component: AdminTeams,
    meta: {
      auth: true,
      admin: true,
      permissions: [
        PERMISSION_USER_TEAM_MANAGEMENT
      ]
    }
  }, {
    path: '/admin/teams/create',
    name: 'admin_teams_create',
    component: AdminTeamsCreate,
    meta: {
      auth: true,
      admin: true,
      permissions: [
        PERMISSION_USER_TEAM_MANAGEMENT
      ]
    }
  }, {
    path: '/admin/desktop-client',
    name: 'admin_desktop_client_releases',
    component: DesktopClientReleases,
    meta: {
      auth: true,
      admin: true,
      permissions: [
        PERMISSION_DESKTOP_CLIENT_MANAGEMENT
      ]
    }
  }, {
    path: '/join/:token',
    name: 'app_invitation',
    component: FirstLogin
  }, {
    path: '*',
    name: 'not_found',
    component: NotFound
  }]
})

router.beforeEach(async (to, from, next) => {
  store.dispatch('http/setStatusOk')

  if ((to.meta.auth || false) && auth.isSessionExpired()) {
    next({name: 'login'})
    return
  }

  await auth.refreshUser()

  const hasAdminDashboardAccess = store.getters['user/hasAdminDashboardAccess']
  const user = store.getters['user/user']

  if ((to.meta.admin || false) && !hasAdminDashboardAccess) {
    next({name: 'projects'})
    return
  }

  if ((to.meta.permissions || false) && !to.meta.permissions.every(p => user.permissions.includes(p))) {
    next({name: 'projects'})
  }

  next()
})

export default router
