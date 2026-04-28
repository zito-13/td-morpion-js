let grid = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""]
]

const gridp4 = [
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""],
  ["", "", "", "", "", "", ""]
]

const zone = document.querySelector('#zonedejeu')
let tour = 0
let nbrplayer = 0

function randomize(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function victoire() {
  const img = document.createElement('img')
  img.classList = "imgvictoire"
  img.src = "./assets/images/victoire.png"
  zone.appendChild(img)

  const btnzonefin = document.createElement('div')
  btnzonefin.classList = 'btndivfin'
  zone.appendChild(btnzonefin)

  const btnreturn = document.createElement('button')
  btnreturn.textContent = "Menu"
  btnreturn.classList = "btnrestart"
  btnzonefin.appendChild(btnreturn)

  btnreturn.addEventListener('click', function () {
    menu()
  })
}

function menu() {
  zone.innerHTML = ""

  const img = document.createElement('img')
  img.classList = "imgvictoire"
  img.src = "./assets/images/morpionv2.png"
  zone.appendChild(img)

  const btnzone = document.createElement('div')
  btnzone.classList = 'btndiv'
  zone.appendChild(btnzone)

  const btn1player = document.createElement('button')
  btn1player.textContent = '1 joueur'
  btn1player.classList = 'btngame'
  btnzone.appendChild(btn1player)

  const btnjcj = document.createElement('button')
  btnjcj.textContent = '2 joueurs'
  btnjcj.classList = 'btngame'
  btnzone.appendChild(btnjcj)

  btnjcj.addEventListener('click', function () {
    nbrplayer = 2
    zone.innerHTML = ""
    grid = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    tour = 0
    party()
  })

  btn1player.addEventListener('click', function () {
    nbrplayer = 1
    zone.innerHTML = ""
    grid = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ]
    tour = 0
    party()
  })

  const img2 = document.createElement('img')
  img2.classList = "imgp4"
  img2.src = "./assets/images/puissance4.png"
  zone.appendChild(img2)

  const btnzone2 = document.createElement('div')
  btnzone2.classList = 'btndiv2'
  zone.appendChild(btnzone2)

  const btnjcjp4 = document.createElement('button')
  btnjcjp4.textContent = 'Jouer'
  btnjcjp4.classList = 'btngame'
  btnzone2.appendChild(btnjcjp4)

  btnjcjp4.addEventListener('click', function () {
    zone.innerHTML = ""
    partyp4()
    tour = 0
    const gridp4 = [
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""],
      ["", "", "", "", "", "", ""]
    ]
  })
}

// ── MORPION ──────────────────────────────────────────────
function party() {
  zone.innerHTML = ""

  grid.forEach((row, i) => {
    const div = document.createElement("div")
    zone.appendChild(div)
    div.classList.add('ligne')

    row.forEach((cell, j) => {
      const img = document.createElement('img')

      switch (cell) {
        case "x":
          img.src = "./assets/images/skeleton-cadre.jpg"
          break
        case "o":
          img.src = "./assets/images/creeper-cadre.jpg"
          break
        default:
          img.src = "./assets/images/cadre.jpg"
          break
      }

      // ✅ CORRECTION : suppression de nbrplayer = 2
      img.addEventListener('click', function () {
        choice(i, j)
      })

      div.appendChild(img)
    })
  })
}

function choice(i, j) {
  if (grid[i][j] !== "") return

  if (nbrplayer === 1) {
    grid[i][j] = "x"
    tour++ // ✅ CORRECTION : incrémentation du tour en mode 1 joueur

    if (checkWin()) {
      party()
      victoire()
      return
    }

    if (tour >= 9) {
      party()
      return matchnul()
    }

    choicecpu()

  } else if (nbrplayer === 2) {
    if (tour % 2 === 0) {
      grid[i][j] = "x"
    } else {
      grid[i][j] = "o"
    }

    if (checkWin()) {
      party()
      victoire()
      return
    }

    tour++
    party()

    if (tour >= 9) {
      return matchnul()
    }
  }
}

function choicecpu() {
  let i = randomize(0, 2)
  let j = randomize(0, 2)

  if (grid[i][j] === "") {
    grid[i][j] = "o"
    tour++ // ✅ CORRECTION : incrémentation du tour après le coup du CPU

    if (checkWin()) {
      party()
      victoire()
      return
    }

    if (tour >= 9) {
      party()
      return matchnul()
    }

    party()

  } else {
    choicecpu()
  }
}

function checkWin() {
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][0] != "" && grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2]) {
      return true
    }
    if (grid[0][i] != "" && grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i]) {
      return true
    }
  }
  if (grid[0][0] != "" && grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) {
    return true
  }
  if (grid[0][2] != "" && grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]) {
    return true
  }
}

function matchnul() {
  const img = document.createElement('img')
  img.classList = "imgnul"
  img.src = "./assets/images/matchnul.png"
  zone.appendChild(img)

  const btnreturn = document.createElement('button')
  btnreturn.textContent = "Menu"
  btnreturn.classList = "btnrestart"
  zone.appendChild(btnreturn)

  btnreturn.addEventListener('click', function () {
    menu()
  })
}



function partyp4() {
  zone.innerHTML = ""

  gridp4.forEach((row, i) => {
    const div = document.createElement("div")
    zone.appendChild(div)
    div.classList.add('ligne')

    row.forEach((cell, j) => {
      const img = document.createElement('img')

      switch (cell) {
        case "x":
          img.src = "./assets/images/skeleton-cadre.jpg"
          break
        case "o":
          img.src = "./assets/images/creeper-cadre.jpg"
          break
        default:
          img.src = "./assets/images/cadre.jpg"
          break
      }

      img.addEventListener('click', function () {
        choicep4(i, j)
      })
      div.appendChild(img)
    })
  })

}
function choicep4(i, j) {

  // chercher la première case vide en bas de la colonne
  for (let k = 5; k >= 0; k--) {

    if (gridp4[k][j] === "") {

      if (tour % 2 === 0) {
        gridp4[k][j] = "x"
      } else {
        gridp4[k][j] = "o"
      }

      break
    }

  }

  if (checkWinp4()) {
    partyp4()
    victoire()
    return
  }

  tour++
  partyp4()

}
function checkWinp4() {

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j <= 3; j++) {
      if (gridp4[i][j] != "" &&
        gridp4[i][j] == gridp4[i][j + 1] &&
        gridp4[i][j] == gridp4[i][j + 2] &&
        gridp4[i][j] == gridp4[i][j + 3]) {
        return true
      }
    }
  }

  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j < 7; j++) {
      if (gridp4[i][j] != "" &&
        gridp4[i][j] == gridp4[i + 1][j] &&
        gridp4[i][j] == gridp4[i + 2][j] &&
        gridp4[i][j] == gridp4[i + 3][j]) {
        return true
      }
    }
  }

  for (let i = 0; i <= 2; i++) {
    for (let j = 0; j <= 3; j++) {
      if (gridp4[i][j] != "" &&
        gridp4[i][j] == gridp4[i + 1][j + 1] &&
        gridp4[i][j] == gridp4[i + 2][j + 2] &&
        gridp4[i][j] == gridp4[i + 3][j + 3]) {
        return true
      }
    }
  }

  for (let i = 3; i < 6; i++) {
    for (let j = 0; j <= 3; j++) {
      if (gridp4[i][j] != "" &&
        gridp4[i][j] == gridp4[i - 1][j + 1] &&
        gridp4[i][j] == gridp4[i - 2][j + 2] &&
        gridp4[i][j] == gridp4[i - 3][j + 3]) {
        return true
      }
    }
  }

  return false
}

menu()

