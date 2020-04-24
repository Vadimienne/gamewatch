module.exports = shipit => {
    // Load shipit-deploy tasks
    require('shipit-deploy')(shipit)
  
    shipit.initConfig({
      default: {
        deployTo: '/srv/apps/gamewatch',
        repositoryUrl: 'https://github.com/Vadimienne/gamewatch.git',
      },
      staging: {
        servers: 'root@194.87.236.179',
      },
    })
  }