const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const playerScore = document.querySelector('[data-your-score]')
const SELECTIONS = [
  {
    name: 'rock',
    emoji: '✊',
    beats: 'scissors'
  },{
    name: 'paper',
    emoji: '✋',
    beats: 'rock'
  },

  {
    name: 'scissors',
    emoji: '✌',
    beats: 'paper'}
]
selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
})

function makeSelection(selection) {
  const compChoice = randomSelection()
  const yourWinner = theWinner(selection, compChoice)
  const computerWinner = theWinner(compChoice, selection)

  selectResultAdd(compChoice, computerWinner)
  selectResultAdd(selection, yourWinner)

  if (yourWinner) increaseScore(playerScore)
  if (computerWinner) increaseScore(computerScoreSpan)
}

function increaseScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
  }
function selectResultAdd (selection, winner) {
  const div = document.createElement('div')
  div.innerText = selection.emoji
  div.classList.add('result-selection')
  if (winner) div.classList.add('winner')
  finalColumn.after(div)
}

function theWinner (selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

