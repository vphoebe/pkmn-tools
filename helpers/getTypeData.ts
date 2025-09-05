import Pokedex from "pokedex-promise-v2"

const P = new Pokedex()

export interface GenTypeData {
  id: number
  name: string
  half: string[]
  double: string[]
  none: string[]
}

export function parseGenFromApiUrl(url: string): number | null {
  const lastDigitTest = /(\d)\/$/
  const typeIntroducedGenNumberMatches = url.match(lastDigitTest)
  if (typeIntroducedGenNumberMatches) {
    return parseInt(typeIntroducedGenNumberMatches[1])
  } else {
    return null
  }
}

export function getTypeDataForGen(
  types: Pokedex.Type[],
  generation: number,
): GenTypeData[] {
  // filter out types that didn't exist yet
  const genTypeData = types.filter((type) => {
    const parsedGen = parseGenFromApiUrl(type.generation.url)
    return generation >= parsedGen
  })

  return genTypeData.map((obj) => {
    let damageObject = obj.damage_relations

    if (obj.past_damage_relations.length) {
      const found = obj.past_damage_relations.find((r) => {
        const relGenNumber = parseGenFromApiUrl(r.generation.url)
        return relGenNumber >= generation
      })
      if (found) {
        damageObject = found.damage_relations
      }
    }

    return {
      id: obj.id,
      name: obj.name,
      half: damageObject.half_damage_to.map((a: { name: string }) => a.name),
      double: damageObject.double_damage_to.map(
        (a: { name: string }) => a.name,
      ),
      none: damageObject.no_damage_to.map((a: { name: string }) => a.name),
    }
  })
}

export async function getTypeList() {
  const list = await P.getTypesList()
  // pokeapi returns glitch types, need to filter them out
  const regex = /type\/\d{1,2}\/$/
  const realTypes = list.results.filter((result) => regex.test(result.url))
  return realTypes
}

export async function getAllTypeData() {
  const list = await getTypeList()
  const promises = list.map((t) => P.getTypeByName(t.name))
  const responses = await Promise.all(promises)
  return responses
}
