import { getDependencyReleaseLine } from '@changesets/cli/changelog'

export default {
  getDependencyReleaseLine,
  getReleaseLine: changeset => {
    const [firstLine, ...futureLines] = changeset.summary.split('\n').map(l => l.trimEnd())

    return `\n- ${firstLine}${futureLines.length > 0 ? `\n${futureLines.join('\n')}` : ''}`
  },
}
