import AV from 'leancloud-storage'

const APP_ID = 'GWqFQNkQfWegSMxrMYROFHAQ-gzGzoHsz'
const APP_KEY = 'TRdnAjwtHo7c1TjQwm9Ck8Yp'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

export {
  AV
}
