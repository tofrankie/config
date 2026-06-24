import type { Linter } from 'eslint'
import jsonc from 'eslint-plugin-jsonc'

const commandOrder = [
  'name',
  'mode',
  'title',
  'subtitle',
  'icon',
  'description',
  'interval',
  'disabledByDefault',
  'keywords',
  'arguments',
  'preferences',
]

const preferenceOrder = [
  'name',
  'type',
  'required',
  'title',
  'label',
  'description',
  'placeholder',
  'default',
  'data',
]

const argumentOrder = ['name', 'type', 'required', 'placeholder', 'data']

const toolOrder = ['name', 'title', 'icon', 'description']

const packageJsonOrder = [
  '$schema',
  'name',
  'title',
  'type',
  'version',
  'private',
  'packageManager',
  'description',
  'icon',

  'author',
  'owner',
  'access',
  'contributors',
  'pastContributors',
  'license',
  'funding',
  'homepage',
  'repository',
  'bugs',
  'categories',
  'keywords',
  'platforms',

  'external',
  'sideEffects',
  'imports',
  'exports',
  'main',
  'module',
  'browser',
  'unpkg',
  'jsdelivr',
  'types',
  'typesVersions',
  'bin',
  'man',
  'directories',
  'files',
  'engines',
  'os',
  'cpu',
  'libc',
  'devEngines',
  'publishConfig',

  'scripts',
  'gypfile',
  'config',
  'peerDependencies',
  'peerDependenciesMeta',
  'dependencies',
  'optionalDependencies',
  'bundleDependencies',
  'bundledDependencies',
  'devDependencies',
  'workspaces',
  'pnpm',
  'overrides',
  'resolutions',

  'preferences',
  'commands',
  'tools',
  'ai',

  'husky',
  'simple-git-hooks',
  'lint-staged',
  'eslintConfig',
]

const raycastConfig: Linter.Config = {
  name: 'tofrankie/raycast/package-json',
  files: ['**/package.json'],
  plugins: {
    jsonc,
  },
  language: 'jsonc/json',
  rules: {
    'jsonc/sort-array-values': [
      'error',
      { pathPattern: '^files$', order: { type: 'asc' } },
      { pathPattern: '^keywords$', order: { type: 'asc' } },
      {
        pathPattern: '^commands\\[\\d+\\]\\.keywords$',
        order: { type: 'asc' },
      },
      { pathPattern: '^categories$', order: { type: 'asc' } },
      { pathPattern: '^platforms$', order: ['macOS', 'Windows'] },
      { pathPattern: '^external$', order: { type: 'asc' } },
    ],
    'jsonc/sort-keys': [
      'error',
      {
        pathPattern: '^$',
        order: packageJsonOrder,
      },
      { pathPattern: '^commands\\[\\d+\\]$', order: commandOrder },
      {
        pathPattern: '^(?:preferences|commands\\[\\d+\\]\\.preferences)\\[\\d+\\]$',
        order: preferenceOrder,
      },
      {
        pathPattern: '^commands\\[\\d+\\]\\.arguments\\[\\d+\\]$',
        order: argumentOrder,
      },
      { pathPattern: '^tools\\[\\d+\\]$', order: toolOrder },
      { pathPattern: '^ai$', order: ['instructions', 'evals'] },
      {
        pathPattern:
          '^(?:preferences|commands\\[\\d+\\]\\.preferences|commands\\[\\d+\\]\\.arguments)\\[\\d+\\]\\.data\\[\\d+\\]$',
        order: ['title', 'value'],
      },
      {
        pathPattern: '^(?:dev|peer|optional|bundled|bundle)?[Dd]ependencies(Meta)?$',
        order: { type: 'asc' },
      },
      {
        pathPattern: '^(?:resolutions|overrides|pnpm\\.overrides)$',
        order: { type: 'asc' },
      },
      { pathPattern: '^workspaces\\.catalog$', order: { type: 'asc' } },
      {
        pathPattern: '^workspaces\\.catalogs\\.[^.]+$',
        order: { type: 'asc' },
      },
      {
        pathPattern: '^exports.*$',
        order: ['types', 'import', 'require', 'default'],
      },
      {
        pathPattern: '^(?:gitHooks|husky|simple-git-hooks)$',
        order: [
          'pre-commit',
          'prepare-commit-msg',
          'commit-msg',
          'post-commit',
          'pre-rebase',
          'post-rewrite',
          'post-checkout',
          'post-merge',
          'pre-push',
          'pre-auto-gc',
        ],
      },
    ],
  },
}

export default raycastConfig
