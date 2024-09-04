

export const openNewTabWindow = (link: string) => {
  if (link.trim().length > 0) {
    window.open(link)
  }
};
