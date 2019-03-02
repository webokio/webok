import path from 'path'
import packageJson from 'package-json'
import { table } from 'table'
import { findPackages, isPackage } from '../find-packages'
import Progress from 'progress'

// `lerna outdated` may be available later, see https://github.com/lerna/lerna/issues/1334, so this is just a temporary solution.

interface VersionInfo {
  version: string
  dependents: string[]
}

class DependencyInfo {
  readonly versionInfos: VersionInfo[] = []

  constructor (readonly name: string) {}

  updateVersion (version: string, dependent: string) {
    const versionInfo: VersionInfo = this.getOrCreateVersionInfo(version)
    versionInfo.dependents.push(dependent)
  }

  private getOrCreateVersionInfo (dependencyVersion: string): VersionInfo {
    const existingVersionInfo = this.versionInfos.find(({ version }) => version === dependencyVersion)
    if (existingVersionInfo) {
      return existingVersionInfo
    }
    const versionInfo = { version: dependencyVersion, dependents: [] }
    this.versionInfos.push(versionInfo)
    return versionInfo
  }
}

const getOrCreateDependencyInfo = (dependencyInfos: DependencyInfo[], dependencyName: string): DependencyInfo => {
  const existingDependencyInfo = dependencyInfos.find(({ name }) => name === dependencyName)
  if (existingDependencyInfo) {
    return existingDependencyInfo
  }
  const dependencyInfo = new DependencyInfo(dependencyName)
  dependencyInfos.push(dependencyInfo)
  return dependencyInfo
}

const findDependencies = (
  dependencyInfos: DependencyInfo[],
  internalPackage: Record<string, boolean>,
  pkgPath: string,
) => {
  const pkgJson = require(path.join(pkgPath, 'package.json'))
  internalPackage[pkgJson.name] = true
  const dependencyConfigs = [pkgJson.dependencies, pkgJson.devDependencies]
  dependencyConfigs
    .filter((dependencyConfig) => !!dependencyConfig)
    .forEach((dependencyConfig) => {
      Object.keys(dependencyConfig).forEach((dependencyName: string) => {
        const dependencyVersion = dependencyConfig[dependencyName]
        const dependencyInfo: DependencyInfo = getOrCreateDependencyInfo(dependencyInfos, dependencyName)
        dependencyInfo.updateVersion(dependencyVersion, pkgJson.name)
      })
    })
}

const checkOutdated = async (dependencyInfos: DependencyInfo[]): Promise<void> => {
  const progress = new Progress('checking [:bar] :percent', { total: dependencyInfos.length })
  const report: string[][] = [['Package', 'Defined Version', 'In Range Version', 'Latest Version', 'Dependents']]
  for (const dependencyInfo of dependencyInfos) {
    for (const versionInfo of dependencyInfo.versionInfos) {
      const latestMetadata = await packageJson(dependencyInfo.name)
      if (!latestMetadata.version) {
        throw new Error(`Latest version not found: ${dependencyInfo.name}`)
      }
      const inRangeMetadata = await packageJson(dependencyInfo.name, { version: versionInfo.version })
      if (!inRangeMetadata.version) {
        throw new Error(`In range version not found: ${dependencyInfo.name}@${versionInfo.version}`)
      }
      const canUpdateInRange = versionInfo.version.indexOf(inRangeMetadata.version) === -1
      const canUpdateLatest = inRangeMetadata.version !== latestMetadata.version
      const shouldReport = canUpdateInRange || canUpdateLatest
      if (shouldReport) {
        report.push([
          dependencyInfo.name,
          versionInfo.version,
          `${inRangeMetadata.version} ${canUpdateInRange ? '*' : ''}`,
          `${latestMetadata.version} ${canUpdateLatest ? '*' : ''}`,
          versionInfo.dependents.join('\n'),
        ])
      }
    }
    progress.tick()
  }
  console.log(table(report))
}

export const checkdeps = async (argv: string[]): Promise<number> => {
  const rootPath = process.cwd()
  const packages = findPackages(rootPath)
  if (isPackage(rootPath)) {
    packages.push(rootPath)
  }
  const dependencyInfos: DependencyInfo[] = []
  const internalPackage: Record<string, boolean> = {}
  packages.forEach((pkgPath) => findDependencies(dependencyInfos, internalPackage, pkgPath))
  const dependencyInfosToCheck = dependencyInfos.filter((dependencyInfo) => !internalPackage[dependencyInfo.name])
  dependencyInfosToCheck.sort((a, b) => a.name.localeCompare(b.name))
  await checkOutdated(dependencyInfosToCheck)
  return 0
}
