export const interactivePages = ['/company/dashboard']

export const showMoveButton = interactivePages.includes(location.pathname)
  ? 'group-hover:block'
  : ''

export const isPageCustomizable = interactivePages.includes(location.pathname)

export const findMissingWidget = (arrayToSearch, key, valueToSearch) => {
  for (let i = 0; i < arrayToSearch.length; i++) {
    if (arrayToSearch[i][key] === valueToSearch) {
      return i
    }
  }
  return null
}
