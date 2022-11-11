# Get Version

A GitHub Action which gets version from the current github repository considering:

- optional tag **matching** (default match is `*` - any latest tag).
- optional version **bumping** (default bump is `none` - no bumping).
- optional version **formatting** (default format is semver format).

## Usage

```yml
steps:
  - uses: actions/checkout@v3
    with:
      fetch-depth: 0 # <-- This is required!

  - id: get-version
    uses: muravjev/get-version-action

  - run: echo ${{ steps.get-version.outputs.version }}
```

## Workflow

1. Tag is determined

   - Match the latest tag that satisfy provided pattern (`match` parameter).
   - If provided pattern is `*` (default) then the latest tag is taken.
   - If there is no matched tag found then a default value (`default` parameter) used as a tag.

2. Version parameters determined

   - `prefix`, `major`, `minor`, `patch`, `prerelease` and `metadata` parameters are extracted from the tag, considering that the tag has **semver** format with optional prefix.
   - `hash` parameter is determined as the latest commit hash.
   - `commits` parameter is calculated as a number of commits between latest commit and matched tag. If there is no matched tag, total number of commits is taken.

3. Bumping (optional)

   Version parameters `major`, `minor`, `patch` are adjusted in accordance with provided bumping scheme (`bump` parameter).

4. Version is formatted

   Version is formatted in accordance with provided pattern (`format` and `trim` parameters) where version parameters placeholders are replaced with actual version parameters.

## Inputs

- **match** - pattern to match the latest tag to extract the version from.\
  format: [glob(7)][glob] pattern.\
  default: `*`.

- **default** - tag to extract version if no tag exists or matched by `match` pattern.\
  values: semver version tag (e.g. `1.2.3`), semver tag with prefix (`package@1.2.3-beta.4+build.567`).\
  default: `1.0.0`

- **bump** - type of the bump to perform over version values.\
  values: `major`, `minor`, `patch` or `none` \
  default: `none` - no bump.

  <details>
  <summary>details</summary>
  <br>

  **Example:**\
  Consider that we have the following version values:

  | major | minor | patch |
  | :---: | :---: | :---: |
  |   1   |   2   |   3   |

  Then the following will be true:

  |  bump   | major | minor | patch |
  | :-----: | :---: | :---: | :---: |
  | `none`  |   1   |   2   |   3   |
  | `major` |  `2`  |  `0`  |  `0`  |
  | `minor` |   1   |  `3`  |  `0`  |
  | `patch` |   1   |   2   |  `4`  |

  <br>
  </details>

- **format** - format of the output version.\
  format: `{prefix}{major}.{minor}.{patch}-{prerelease}+{metadata}#{commits}@{hash}`.\
  default: `{major}.{minor}.{patch}-{prerelease}+{metadata}`.

- **trim** - fields which prefixes should be removed if its value is 'empty'.\
  values: pipe separated version fields.\
  default: `prerelease|metadata|commits`.

  <details>
  <summary>details</summary>
  <br>

  Available fields to trim and its corresponded values considered as 'empty':

  | field      | 'empty' value |
  | :--------- | :------------ |
  | prefix     | `''`          |
  | prerelease | `''`          |
  | metadata   | `''`          |
  | patch      | `''` or `0`   |
  | commits    | `''` or `0`   |

  **Example:**\
  Consider that we have provided the following format\
  `{major}.{minor}.{patch}+build.{commits}`,\
  then the following will be true:

  | major | minor | patch | commits | trim             | result        |
  | :---: | :---: | :---: | :-----: | :--------------- | :------------ |
  |   1   |   2   |   3   |    4    | doesn't matter   | 1.2.3+build.4 |
  |   1   |   3   |   0   |    0    | none             | 1.2.0+build.0 |
  |   1   |   2   |   0   |    0    | `patch\|commits` | 1.2           |
  |   1   |   2   |   0   |    0    | `patch`          | 1.2+build.0   |
  |   1   |   2   |   0   |    0    | `commits`        | 1.2.0         |

  </details>

## Outputs

- **version** - Formatted version.

## Contributing

Want to contribute? Awesome! The most basic way to show your support is to star ⭐ the project, or to raise issues. If you want to open a pull request, please read the [Contributing Guidelines][guidelines].

## Donation

<!-- prettier-ignore-start -->

| If you found this project helpful, consider |
| :---: |
[**buying me a coffee**][buymeacoffee], [**donate by paypal**][paypal] or just [**leave a star**](../..)⭐
Thanks for your support, it is much appreciated!

<!-- prettier-ignore-end -->

## License

[MIT](LICENSE) © [Sergey Muravjev][muravjev]

[glob]: https://man7.org/linux/man-pages/man7/glob.7.html
[guidelines]: https://github.com/muravjev/.github/blob/main/CONTRIBUTING.md
[buymeacoffee]: https://www.buymeacoffee.com/muravjev
[paypal]: https://www.paypal.me/muravjev
[muravjev]: https://github.com/muravjev
