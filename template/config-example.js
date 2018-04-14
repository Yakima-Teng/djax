module.exports = {
  appName: '{{ name }}',
  defaultSiteTitle: '{{ name }}',
  defaultSiteDescription: '{{ description }}',
  deployConfigurationForTestServer: {
    hostname: '111.22.33.44',
    username: 'username',
    password: 'password',
    dest: '/var/path/'
  },
  deployConfigurationForProductionServer: {
    hostname: '111.22.33.44',
    username: 'username',
    password: 'password',
    dest: '/var/path/'
  }
}
