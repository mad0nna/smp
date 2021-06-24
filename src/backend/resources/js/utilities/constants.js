export const interactivePages = [
  '/company/dashboard'
  // '/admin/dashboard'
]

export const showMoveButton = interactivePages.includes(location.pathname)
  ? 'group-hover:block'
  : ''

export const isPageCustomizable = interactivePages.includes(location.pathname)

export const findMissingWidget = (arraytosearch, key, valuetosearch) => {
  for (var i = 0; i < arraytosearch.length; i++) {
    if (arraytosearch[i][key] == valuetosearch) {
      return i
    }
  }
  return null
}
