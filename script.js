const canvas = document.getElementById("plot")
canvas.onclick = handleClick
const ctx = canvas.getContext("2d")

const iterations = 192

let center = [0,0]
let viewSize = 4

function render() {
  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      let location = getLocation([x,y],canvas.width, canvas.height)
      let n = f([0,0], location, iterations)
      if (n == 0) {
        ctx.fillStyle = "rgb(0,0,0)"
      } else {
        ctx.fillStyle = `hsl(${(n * 10) % 360},100%,50%)`
      }
      ctx.fillRect(x,y,1,1)
    }
  }
}

render()

function getLocation(pos,width,height) {
  return [(pos[0] / width) * viewSize - viewSize / 2 + center[0], (pos[1] / height) * viewSize - viewSize / 2 + center[1]]
}

function square(pos) {
  return [pos[0] * pos[0] - pos[1] * pos[1], 2 * pos[0] * pos[1]]
}

function add(pos1, pos2) {
  return [pos1[0] + pos2[0], pos1[1] + pos2[1]]
}

function magnitude(pos) {
  return pos[0] * pos[0] + pos[1] * pos[1]
}

function f(z,c,n) {
  let next = add(square(z),c)
  let dist = magnitude(next)
  if (dist > 4) {
    return n
  }
  if (n == 0) {
    return 0
  }

  return f(add(square(z),c),c,n-1)
}

function handleClick(event) {
  const x = event.layerX
  const y = event.layerY
  const location = getLocation([x,y],canvas.width,canvas.height)
  center = location
  viewSize /= 2
  render()
}

console.log(f([0,0],[0.5,0.5],24))
