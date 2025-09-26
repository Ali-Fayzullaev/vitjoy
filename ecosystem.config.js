module.exports = {
  apps: [{
    name: 'vitjoy',
    cwd: '/var/www/vitjoy',
    script: 'node_modules/.bin/next',
    args: 'start -p 3030 -H 127.0.0.1',
    env: { NODE_ENV: 'production' }
  }]
};
