export default {
  permissions: {
    'user-team-management': 'Manage users and teams',
    'desktop-client-management': 'Manage desktop client'
  },
  backend: {
    datasets: {
      types: {
        dataset: 'dataset',
        directory: 'directory'
      }
    }
  },
  breadcrumb: {
    home: {
      label: 'Home',
      projects: {
        label: 'Projects',
        create: {
          label: 'Create project'
        }
      }
    },
    datasets: {
      label: 'Datasets'
    },
    help: {
      label: 'Help'
    }
  },
  vuelidate: {
    required: '{field} is required',
    email: '{field} is not a valid email format',
    minLength: '{field} should be at least {length} characters',
    sameAs: '{field} must match {target}'
  },
  form: {
    submit: {
      create: 'Create',
      update: 'Update'
    }
  },
  utils: {
    stepper: {
      back: 'Back',
      continue: 'Continue',
      complete: 'Complete'
    }
  },
  admin: {
    home: {
      title: 'Admin home page',
      subtitle: 'Work in progress'
    },
    users: {
      title: 'Admin user management',
      table: {
        empty: 'There are no users',
        name: {
          label: 'Name'
        },
        email: {
          label: 'Email'
        },
        teams: {
          label: 'Teams'
        },
        permissions: {
          label: 'Permissions',
          empty: 'No permissions'
        },
        createdAt: {
          label: 'Created At'
        }
      },
      actions: {
        create: 'Create user'
      }
    },
    usersCreate: {
      title: 'Create new user',
      form: {
        name: {
          label: 'Name',
          validation: {
            field: 'The name'
          }
        },
        email: {
          label: 'Email',
          validation: {
            field: 'The email'
          }
        },
        permissions: {
          label: 'Permissions'
        },
        teamsAdmin: {
          label: 'Teams as admin',
          placeholder: 'Select the administrating teams'
        },
        teams: {
          label: 'Teams',
          placeholder: 'Select the affiliated teams'
        },
        cancel: 'Cancel',
        toastr: {
          invitationSent: 'An invitation email has been sent to'
        }
      },
      titles: {
        pending_invitations: 'Pending invitations'
      },
      actions: {
        new_invitation: {
          label: 'Send new invitation'
        }
      }
    },
    teams: {
      title: 'Admin team management',
      table: {
        empty: 'There are no teams',
        name: {
          label: 'Name'
        },
        admins: {
          label: 'Admins'
        },
        users: {
          label: 'Users'
        },
        createdAt: {
          label: 'Created At'
        }
      },
      actions: {
        create: 'Create team'
      },
      swal: {
        remove: {
          title: 'Remove team',
          text: 'Are you sure you want to remove {team}?',
          confirm: 'Remove',
          cancel: 'Keep'
        },
        error: {
          title: 'Oops...',
          text: 'An error occurred while trying to remove the team {team}. Please try again later.'
        },
        success: {
          title: 'Team removed',
          text: 'The team {team} has been removed'
        }
      }
    },
    teamsCreate: {
      title: 'Create new team',
      form: {
        name: {
          label: 'Name',
          validation: {
            field: 'The name'
          }
        },
        create: 'Create',
        cancel: 'Cancel',
        toastr: {
          complete: 'Team has been created'
        }
      }
    }
  },
  index: {
    login: 'Login',
    register: 'register',
    home: 'Home',
    title: 'Pillar Science',
    subtitle: 'Your All-In-One Research Data Solution'
  },
  login: {
    form: {
      email: {
        label: 'Email',
        validation: {
          field: 'The email'
        }
      },
      password: {
        label: 'Password',
        validation: {
          field: 'The password'
        }
      },
      toastr: {
        loginFailed: 'Login failed'
      },
      actions: {
        login: 'Login'
      },
      haveAccount: 'Don\'t have account?',
      signup: 'Signup'
    }
  },
  register: {
    form: {
      email: {
        label: 'Your Email',
        validation: {
          field: 'The email'
        }
      },
      password: {
        label: 'Password',
        validation: {
          field: 'The password'
        }
      },
      firstName: {
        label: 'First name',
        validation: {
          field: 'First name'
        }
      },
      lastName: {
        label: 'Last name',
        validation: {
          field: 'Last name'
        }
      },
      company: {
        label: 'Institution/Company'
      },
      phone: {
        label: 'Phone number'
      },
      toastr: {
        registerFailed: 'Register failed'
      },
      actions: {
        register: 'Register'
      },
      haveAccount: 'Already have an account?',
      signin: 'Sign in',
      signupwith: 'Sign up with'
    }
  },
  resetpassword: {
    form: {
      email: {
        label: 'Your Email',
        validation: {
          field: 'The email'
        }
      },
      password: {
        label: 'Password',
        validation: {
          field: 'The password'
        }
      },
      password_confirmation: {
        label: 'Confirm Password',
        validation: {
          field: 'Confirm Password'
        }
      },
      submit: 'Submit',
      backsignin: '<- Back to signin',
      toastr: {
        resetFailed: 'Register failed'
      }
    }
  },
  home: {
    title: 'Home page',
    subtitle: 'Projects'
  },
  join: {
    title: 'Welcome',
    form: {
      header: 'Please fill out some basic information to finish your account setup',
      expiration: 'This invitation expires {expires_at}',
      password: {
        label: 'Set your password'
      },
      passwordConfirm: {
        label: 'Confirm your password'
      },
      continue: 'Continue',
      termsOfService: {
        label: 'Check here to indicate that you have read and agree to the {0}.',
        link: 'Software as a Service Agreement'
      },
      validation: {
        password: {
          field: 'The password'
        },
        passwordConfirm: {
          field: 'The confirmation password',
          target: 'the password'
        },
        errors: {
          invalidPassword: 'Invalid password'
        }
      }
    }
  },
  p404: {
    title: '404 - Page not found',
    subtitle: 'The resource your are looking for is missing or not available',
    actions: {
      back: 'Back',
      home: 'Home'
    }
  },
  p403: {
    title: '403 - Forbidden access',
    subtitle: 'Access to this resource is forbidden',
    actions: {
      back: 'Back',
      home: 'Home'
    }
  },
  appNavbar: {
    actions: {
      gettingStarted: {
        label: 'Getting Started'
      },
      projects: {
        label: 'Projects'
      },
      main: {
        admin: 'Admin',
        logout: 'Logout'
      }
    }
  },
  adminNavbar: {
    actions: {
      main: {
        back: 'Back to site',
        logout: 'Logout'
      },
      management: {
        label: 'Management',
        children: {
          users: 'Users',
          teams: 'Teams'
        }
      },
      desktopClient: {
        label: 'Desktop Application',
        releases: {
          label: 'Releases'
        }
      }
    }
  },
  staticCollections: {
    userTeam: {
      role: {
        admin: 'Administrator',
        user: 'Member'
      }
    },
    projectRoles: {
      role: {
        viewer: 'Viewer',
        contributor: 'Contributor',
        manager: 'Manager'
      }
    }
  },
  projectSettings: {
    fields: {
      name: {
        label: 'Project name',
        validation: {
          field: 'The project name'
        }
      }
    },
    actions: {
      rename: {
        label: 'Rename'
      },
      delete: {
        label: 'Delete this project'
      }
    },
    swal: {
      delete: {
        title: 'Delete project',
        text: 'Are you sure you want to delete this project and all related resources (data, analyses, dashboards and methods)?',
        confirm: 'Delete',
        cancel: 'Keep'
      },
      error: {
        title: 'Oops...',
        text: 'An error occurred while trying to delete the project {project}. Please try again later.'
      }
    },
    toast: {
      success: 'The project {project} has been deleted',
      renameFailed: 'Project rename failed'
    }
  },
  projectCreateWizard: {
    steps: {
      information: {
        title: 'Information'
      },
      confirmation: {
        title: 'Confirmation'
      }
    }
  },
  projectInformationStep: {
    fields: {
      team: {
        placeholder: 'Select a team',
        label: 'Team',
        validation: {
          field: 'The team'
        }
      },
      name: {
        label: 'Project name',
        validation: {
          field: 'The project name'
        }
      }
    },
    messages: {
      noteam: 'You need to be part of a team to create a project.'
    }
  },
  projectConfirmationStep: {
    fields: {
      name: {
        label: 'Project name'
      },
      team: {
        label: 'Team'
      },
      members: {
        label: 'Members'
      }
    }
  },
  projects: {
    actions: {
      createProject: {
        label: 'Create project'
      }
    }
  },
  projectCard: {
    updated: 'Updated {time}',
    actions: {
      open: {
        label: 'Open'
      },
      settings: {
        label: 'Settings'
      }
    }
  },
  datasetView: {
    navbar: {
      home: {
        label: 'Home'
      },
      parent: {
        label: 'Parent Directory'
      },
      create: {
        label: 'Create directory'
      },
      move: {
        label: 'Move a dataset or directory'
      },
      addData: {
        label: 'Add data from many sources'
      },
      rename: {
        label: 'Rename dataset'
      },
      delete: {
        label: 'Delete dataset'
      }
    },
    directory: {
      empty: 'This directory is empty'
    },
    table: {
      empty: {
        label: 'Drop your files here or click to upload'
      },
      fields: {
        name: {
          label: 'Name'
        },
        size: {
          label: 'Size'
        },
        created: {
          label: 'Created'
        },
        updated: {
          label: 'Updated'
        },
        protocol: {
          label: 'Methods'
        },
        metadata: {
          label: 'Metadata'
        }
      }
    },
    swal: {
      createDirectory: {
        title: 'Create new directory',
        confirm: 'Create',
        cancel: 'Cancel'
      },
      renameDataset: {
        title: 'Rename {type}',
        confirm: 'Rename',
        cancel: 'Cancel'
      },
      upload: {
        title: 'Upload datasets',
        confirm: 'Upload',
        cancel: 'Cancel'
      }
    }
  },
  projectMenu: {
    menu: {
      general: {
        label: 'General',
        overview: {
          label: 'Overview'
        },
        data: {
          label: 'Data'
        }
      },
      settings: {
        label: 'Settings',
        settings: {
          label: 'Settings'
        },
        sharing: {
          label: 'Sharing'
        }
      }
    }
  },
  teamMenu: {
    menu: {
      general: {
        label: 'General',
        devices: {
          label: 'Computers'
        }
      }
    }
  },
  teamComputers: {
    card: {
      content: {
        lastActivity: 'Last activity',
        remoteDirectories: 'remote directories'
      },
      actions: {
        view: 'View',
        edit: 'Edit'
      }
    }

  },
  teamDevicesSave: {
    fields: {
      name: {
        label: 'Remote directory name',
        validation: 'The remote directory name'
      }
    },
    toast: {
      success: 'The remote directory {device} has been updated'
    },
    actions: {
      save: {
        label: 'Save'
      }
    }
  },
  backButton: {
    actions: {
      back: {
        label: 'Back'
      }
    }
  },
  unhandledFormatRenderer: {
    unknownFormat: 'This format is not currently handled by Pillar Science.'
  },
  richTextRenderer: {
    actions: {
      save: {
        label: 'Save'
      }
    },
    swal: {
      leaveWithoutSaving: {
        title: 'Unsaved changes',
        text: 'Do you wish to leave without saving your changes?',
        confirm: 'Leave',
        cancel: 'Stay on the page'
      }
    }
  },
  protocolForm: {
    messages: {
      inheritedProtocol: 'You are viewing an inherited methods for this dataset. This method is bound to {boundDataset} dataset. Any changes made to this method will affect all child dataset of {parentDataset}.'
    },
    fields: {
      name: {
        label: 'Name',
        validation: {
          required: {
            field: 'The method name'
          }
        }
      },
      author: {
        label: 'Author'
      },
      dataset: {
        label: 'Target dataset'
      },
      content: {
        label: 'Content'
      }
    },
    actions: {
      create: {
        label: 'Create'
      },
      update: {
        label: 'Update'
      },
      detach: {
        label: 'Detach'
      },
      back: {
        label: 'Back'
      }
    },
    swal: {
      removeInherited: {
        title: 'Removing inherited method',
        text: 'This action will remove the method from a parent dataset ({protocolDataset}). This will affect all datasets that are located under this dataset including this one ({dataset}). Are you sure you want to do this action?',
        confirm: 'OK',
        cancel: 'Cancel'
      }
    }
  },
  datasetSidePanel: {
    tabs: {
      protocols: {
        label: 'methods'
      },
      metadata: {
        label: 'Metadata'
      }
    },
    messages: {
      datasetNotAssociated: 'This dataset is not associated to any methods'
    },
    actions: {
      addProtocol: 'Add method',
      editMetadata: 'Edit metadata'
    }
  },
  metadata: {
    table: {
      empty: 'This dataset has no metadata',
      value: {
        empty: 'No value'
      }
    },
    actions: {
      edit: {
        label: 'Edit'
      },
      remove: {
        label: 'Remove'
      },
      add: {
        label: 'Add metadata'
      }
    },
    form: {
      key: {
        label: 'Key',
        validation: {
          field: 'The key'
        }
      },
      value: {
        label: 'Value'
      }
    }
  },
  infoTab: {
    messages: {
      subtitle: 'File information'
    }
  },
  metadataTab: {
    table: {
      empty: 'This dataset does not have any metadata'
    },
    messages: {
      metadata: 'Metadata',
      subtitle: 'Add metadata tags to easily retrieve your data.',
      metadataEmpty: 'No value'
    }
  },
  protocolsTab: {
    fields: {
      name: {
        label: 'Name'
      },
      edit: {
        label: 'Edit'
      },
      detach: {
        label: 'Detach'
      }
    },
    tabs: {
      attach: {
        label: 'Attach existing'
      },
      new: {
        label: 'New'
      }
    },
    messages: {
      methods: 'Methods',
      from: 'from',
      subtitle: 'Add the methology used to create the data'
    }
  },
  search: {
    messages: {
      searchEverywhere: 'Search everywhere',
      noResults: 'No results',
      unknownResource: 'Unknown resource type'
    }
  },
  datasetRenderer: {
    actions: {
      download: {
        label: 'Download'
      }
    }
  },
  datasetResultType: {
    messages: {
      updated: 'Updated',
      created: 'Created at'
    }
  },
  protocolResultType: {
    messages: {
      updated: 'Updated',
      created: 'Created at'
    }
  },
  projectOverview: {
    fields: {
      description: {
        label: 'Project description',
        emptyEditable: 'Click here to set a description.',
        empty: 'No description available'
      }
    },
    actions: {
      save: 'Save',
      cancel: 'Cancel'
    }
  },
  protocolFormInline: {
    fields: {
      name: {
        label: 'Name',
        placeholder: 'Type in your method name',
        validation: {
          required: {
            field: ''
          }
        }
      }
    },
    actions: {
      save: 'Create method'
    }
  },
  protocolLookup: {
    fields: {
      query: {
        label: 'Search for methods',
        placeholder: 'Search for methods'
      },
      results: {
        label: 'Results',
        empty: 'No methods found',
        fields: {
          name: {
            label: 'Name'
          },
          attach: {
            label: 'Attach'
          }
        }
      }
    }
  },
  protocol: {
    actions: {
      edit: {
        label: 'Edit'
      }
    },
    fields: {
      name: {
        label: 'Name'
      },
      author: {
        label: 'Author'
      },
      dataset: {
        label: 'Target dataset'
      },
      content: {
        label: 'Content'
      }
    }
  },
  projectSharing: {
    fields: {
      query: {
        placeholder: 'Search for a platform member'
      }
    },
    messages: {
      users: {
        empty: 'This project is not shared with anyone yet'
      }
    },
    results: {
      fields: {
        name: {
          label: 'Name'
        },
        role: {
          label: 'Role'
        },
        shared: {
          label: 'Shared Since'
        },
        remove: {
          label: 'Remove'
        }
      }
    },
    actions: {
      add: {
        label: 'Add'
      }
    },
    swal: {
      confirmSelf: {
        title: 'Remove yourself',
        text: 'Removing yourself will cause you to have no more access to this project. Do you wish to continue?',
        confirmButtonText: 'Yes, remove me',
        cancelButtonText: 'No, I still need access'
      }
    }
  },
  help: {
    categories: {
      general: {
        label: 'General',
        items: {
          gettingStarted: {
            label: 'Getting Started'
          }
        }
      },
      metadata: {
        label: 'Metadata',
        items: {
          metadata: {
            label: 'Metadata'
          }
        }
      }
    }
  },
  searchPage: {
    categories: {
      datasets: 'Datasets',
      protocols: 'Protocols'
    }
  }
}
