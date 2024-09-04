const COMPANY_NAME = window?.appConfig.COMPANY_NAME_WITH_UNDERSCORE
const favicon = require(`../assets/company_${COMPANY_NAME}/favicon.ico`)

export const addFavicon = () => {
  const headNode = document.querySelector('head')
  const faviconNode = document.createElement('link')
  faviconNode.setAttribute('rel', 'shortcut icon')
  faviconNode.setAttribute('href', favicon)
  headNode.appendChild(faviconNode)
}
