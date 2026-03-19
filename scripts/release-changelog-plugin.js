import changelog from '@changesets/cli/changelog'

export default {
  getDependencyReleaseLine: changelog.getDependencyReleaseLine,
  getReleaseLine: changeset => {
    // Keep summary content as-is to avoid the default extra "- " prefix.
    return changeset.summary
  },
}
