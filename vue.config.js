publicPath: process.env.NODE_ENV === 'production'
module.exports = {
  lintOnSave: false,
  //publicPath: process.env.NODE_ENV === 'production' ? '/crm/' : '/'
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
};
