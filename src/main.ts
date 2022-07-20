import * as core from '@actions/core'
import { promises as fs } from 'fs'
import yaml from 'js-yaml';

const run = async () => {
    try {
        const file = core.getInput('file')
        // const keys: string[] = JSON.parse(core.getInput('key-path'))

        const content = await fs.readFile(file, 'utf8')

        let yamlData: any = {}
        yamlData = yaml.load(content)

        if (yamlData == null || yamlData == undefined) {
            core.setFailed('Error in reading the yaml file')
            return
        }

        console.log(yamlData)
        // console.log(yamlData.RUNTIME)

        let k: keyof typeof yamlData
        for (k in yamlData) {
            console.log(k + ": " + yamlData[k])
            core.setOutput(k, yamlData[k])
        }
    } catch (error) {
        core.setFailed((error as Error).message)
    }
}

run()