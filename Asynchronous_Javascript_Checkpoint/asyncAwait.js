let array = ["People", "Who", "Have", "Assembly", "As", "Their", "Favourite", "Language", "Are", "F*cking", "Insane" ]

const awaitOneSecond = (ms) =>
  new Promise((resolve, reject) =>
    setTimeout(() => { resolve()}, ms)
  )

const iterateWithAsyncAwait = async () => {
  for (const a of array) {
    console.log(a)
    await awaitOneSecond(1000)
  }
}

iterateWithAsyncAwait()