/* eslint-disable filenames/match-exported, sort-keys */

const parseCommits = () => () => {};
const angularFormatParser = () => {};
const util = {
  foreach: () => {}
};

const config = {
  'commit-list': [
    'git-commit-list',
    parseCommits(angularFormatParser)
  ],
  changelog: [
    'group-commits-by-package':
    [
      'github-changelog',
      'file-changelog'
    ]
  ],
  'prepare-next-release': [
    'next-release-commits',
    'group-commits-by-package',
    util.foreach([
      'infer-semantic-version',
      'go-to-package',
      'update-package-version'
    ])
  ],
  release: [
    'yarn lint',
    'yarn test',
    'yarn build',
    'commit-list',
    [
      'changelog',
      'prepare-next-release'
    ],
    'package-list',
    util.foreach([
      'npm publish'
    ]),
    'git-push'
  ]
};

module.exports = config;
