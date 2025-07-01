import { PrismaClient } from './generated/prisma/client.js'
import {data} from '../src/makeData.ts'
/* import { faker } from '@faker-js/faker'
 */
const prisma = new PrismaClient()

export async function main(){

const lojasData = data.map(loja => ({
  nomeDaloja: loja.nomeDaloja,
  franqueado: loja.franqueado,
  cidade: loja.Cidade,
  estado: loja.Estado,
  dataDeInauguracao: loja.dataDeInauguracao
}))

await prisma.loja.createMany({
  data: lojasData
})

/*  await prisma.loja.createManyAndReturn({
  data:Array.from({length: 10}, () => {
    return{
      nomeDaloja: faker.company.buzzAdjective(),
      franqueado: faker.person.firstName(),
      cidade: faker.location.city(),
      estado:faker.location.state(),
     dataDeInauguracao: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2024-01-01T00:00:00.000Z'})
    }
  }),
  select:{id: true}
}); */

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })



