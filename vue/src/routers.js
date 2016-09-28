import home from './views/home.vue'
import signin from './views/signin.vue'

export default (router) => {
  router.map({
    '/': {
      name: 'home',
      component: home
    },
    '/signin': {
      name: 'signin',
      component: signin
    }
  })

  router.redirect({
    '*': '/'
  })
}
