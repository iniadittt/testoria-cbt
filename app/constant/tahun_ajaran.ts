let TahunAjaran: string[] = []
const range: number = 2
const currentYear: number = new Date().getFullYear()
for (let i = -range; i <= range; i++) {
  const year = currentYear + i
  TahunAjaran.push(`${year}/${year + 1} Genap`, `${year}/${year + 1} Ganjil`)
}
TahunAjaran.sort((a, b) => Number.parseInt(b) - Number.parseInt(a))

export default TahunAjaran
