import path from "path"
// import{Config,getTargetStyleFromConfig} from "@/src/"
import { handleError } from "@/src/utils/handle-error"
import { highlighter } from "@/src/utils/highlighter"
import { logger } from "@/src/utils/logger"
import deepmerge from "deepmerge"
import { HttpProxyAgent } from "http-proxy-agent"
import fetch from "node-fetch"
import { z } from "zod"

import {
    iconsSchema,
    registryBaseColorSchema,
    registryIndexSchema,
    registryItemSchema,
    registryResolvedItemsTreeSchema,
    stylesSchema

} from "./schema"

// const REGISTRY_URL = process.env.REGISTRY_URL 

const registryCache = new Map<string, Promise<any>>()

export const BASE_COLOR = [
    { name: "neutral", label: "Neutral" },
    { name: "gray", label: "Gray" },
    { name: "zinc", label: "Zinc" },
    { name: "slate", label: "Slate" },
    { name: "stone", label: "Stone" },
] as const

export async function getRegistryIndex() {
    try {
        const [result] = await fetchRegistry(["index.json"])
        return registryIndexSchema.parse(result)
    }
    catch (error) {
        logger.error('\n')
        handleError(error)
    }
}

export async function getRegistryStyles(){
    try{
        const [result] = await fetchRegistry(["styles/index.json"])
        return stylesSchema.parse(result)
    }
    catch (error){
        logger.error('\n')
        handleError(error)  
        return []
    }
}

export async function getRegistryIcons(){
    try{
        const [result] = await fetchRegistry(["icons/index.json"])
        return iconsSchema.parse(result)
    }
    catch(error){
        handleError(error)
        return{}
    }
}


export async function getRegistryItem(name:string, style:string){
    try{
        const [result] = await fetchRegistry([
            isUrl(name)? name:`styles/${style}/${name}.json`,
        ])
        return registryItemSchema.parse(result)
    }
    catch(error){
    logger.break()
    handleError(error)
    return null
    }
}

export async function getRegistryBasecolors(baseColor:string){
    try{
        const [result]  = await fetchRegistry([`colors/${baseColor}.json`])
        return registryBaseColorSchema.parse(result)
    }
    catch(error){
        handleError(error)
    }
}


export async function resolveTree(
    index: z.infer<typeof registryIndexSchema>,
    names: string[]
) {
    const tree: z.infer<typeof registryIndexSchema> = []

    for (const name of names) {
        const entry = index.find((entry) => entry.name === name)

        if (!entry) {
            continue
        }

        tree.push(entry)

        if (entry.registryDependencies) {
            const dependencies = await resolveTree(index, entry.registryDependencies)
            tree.push(...dependencies)
        }
    }

    return tree.filter(
        (component, index, self) =>
            self.findIndex((c) => c.name === component.name) === index
    )
}