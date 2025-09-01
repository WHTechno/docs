import { aaronNetworkContent } from "./mainnet/aaron-network"
import { bitbadgesContent } from "./mainnet/bitbadges"
import { dillContent } from "./testnet/dill"
import type { ProjectContent } from "./types"

export { ProjectContent } from "./types"

export const projectContent: Record<string, ProjectContent> = {
  aaron: aaronNetworkContent,
  bitbadges: bitbadgesContent,
  dill: dillContent,
  // Add more projects here as needed
}

export const getProjectContent = (projectId: string): ProjectContent | null => {
  return projectContent[projectId] || null
}

export const getAllProjects = (): ProjectContent[] => {
  return Object.values(projectContent)
}

export const getProjectsByNetwork = (network: "mainnet" | "testnet"): ProjectContent[] => {
  return Object.values(projectContent).filter((project) => project.network === network)
}
