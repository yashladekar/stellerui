import { z } from "zod"

export const registryItemTypeSchema = z.enum([
    "registry:lib",
    "registry:block",
    "registry:component",
    "registry:ui",
    "registry:hook",
    "registry:page",
    "registry:file",
    "registry:style",
    "registry:theme",
    "registry:example",
    "registry:internal",
])

export const registryItemFileSchema = z.discriminatedUnion("type", [
    z.object({
        path: z.string(),
        constent: z.string().optional(),
        type: z.enum([
            "registry:file",
            "registry:page",]),
        target: z.string(),
    }),
    z.object({
        path: z.string(),
        content: z.string().optional(),
        type: registryItemTypeSchema.exclude(["registry:file", "registry:page"]),
        target: z.string().optional(),
    })
])

export const registryItemTailwindSchema = z.object({
    config: z.object({
        content: z.array(z.string()).optional(),
        theme:z.record(z.string(),z.any()).optional(),
        plugins:z.array(z.string()).optional(),
    }).optional()
})


export const registryItemCssVarsSchema = z.object({
    light: z.record(z.string(), z.string()).optional(),
    dark: z.record(z.string(), z.string()).optional(),
})

export const registryItemSchema =z.object({$schema:z.string().optional(),
    name:z.string(),
    type:registryItemTypeSchema,
    title:z.string().optional(),
    author:z.string().min(2).optional(),
    description:z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    devDependencies: z.array(z.string()).optional(),
    registryDependencies:z.array(z.string()).optional() ,
    files:z.array(registryItemFileSchema).optional(),
    tailwind:registryItemTailwindSchema.optional(),
    cssVars: registryItemCssVarsSchema.optional(),
    meta: z.record(z.string(), z.any()).optional(),
    docs: z.string().optional(),
    categories: z.array(z.string()).optional(),
})

export type registryItem =z.infer<typeof registryItemSchema>

export const registrySchema = z.object({
    name: z.string(),
    homepage: z.string(),
    items: z.array(registryItemSchema),
})


export type Registry = z.infer<typeof registrySchema>

export const registryIndexSchema = z.array(registryItemSchema)

export const stylesSchema = z.array(
    z.object({
        name: z.string(),
        label: z.string(),
    })
)

export const iconsSchema = z.record(
    z.string(),
    z.record(z.string(),z.string())
)

export const registryBaseColorSchema = z.object({
    inlineColors: z.object({
        light: z.record(z.string(), z.string()),
        dark: z.record(z.string(), z.string()),
    }),
    cssVars: z.object({
        light: z.record(z.string(), z.string()),
        dark: z.record(z.string(), z.string()),
    }),
    cssVarsV4: z
        .object({
            light: z.record(z.string(), z.string()),
            dark: z.record(z.string(), z.string()),
        })
        .optional(),
    inlineColorsTemplate: z.string(),
    cssVarsTemplate: z.string(),
})

export const registryResolvedItemsTreeSchema = registryItemSchema.pick({
    dependencies: true,
    devDependencies: true,
    files: true,
    tailwind: true,
    cssVars: true,
    docs: true,
})
