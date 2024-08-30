const NETWORK_CONFIG = window?.appConfig

export const setCssVariables = () => {
  const root = document.documentElement
  root.style.setProperty('--brand-primary', NETWORK_CONFIG.BRAND_COLOR)
  root.style.setProperty(
    '--brand-primary-light',
    NETWORK_CONFIG.BRAND_COLOR_LIGHT
  )
  root.style.setProperty('--brand-pop', NETWORK_CONFIG.BRAND_POP_COLOR)
}
