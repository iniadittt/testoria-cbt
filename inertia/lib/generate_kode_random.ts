export const GenerateKodeRandom = (length: number) => {
  const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789'
  let kode = ''
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * characters.length)
    kode += characters[randomIndex]
  }
  return kode
}
