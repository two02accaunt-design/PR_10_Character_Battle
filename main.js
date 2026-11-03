import { Character } from './character.js';
import { randomDamage } from './utils.js';

// Створюємо два об'єкти одного класу
const hero = new Character('Герой', 100);
const monster = new Character('Монстр', 100);

const heroHP = document.querySelector('#heroHP');
const monsterHP = document.querySelector('#monsterHP');
const heroBar = document.querySelector('#heroBar');
const monsterBar = document.querySelector('#monsterBar');
const log = document.querySelector('#log');

const attackButton = document.querySelector('#attackButton');
const healButton = document.querySelector('#healButton');
const restartButton = document.querySelector('#restartButton');

// Оновлення здоров'я на сторінці
function updateScreen() {
    heroHP.textContent = hero.health;
    monsterHP.textContent = monster.health;

    heroBar.style.width = `${hero.health / hero.maxHealth * 100}%`;
    monsterBar.style.width = `${monster.health / monster.maxHealth * 100}%`;
}

// Додавання повідомлення до історії бою
function addLog(message) {
    const paragraph = document.createElement('p');
    paragraph.textContent = message;
    log.prepend(paragraph);
}

// Атака монстра
attackButton.addEventListener('click', () => {
    if (!hero.isAlive() || !monster.isAlive()) return;

    const damage = randomDamage();
    monster.takeDamage(damage);

    addLog(`Герой завдав монстру ${damage} шкоди.`);
    updateScreen();

    if (!monster.isAlive()) {
        addLog('Герой переміг! 🎉');
        finishGame();
        return;
    }

    // Монстр відповідає атакою
    const monsterDamage = randomDamage();
    hero.takeDamage(monsterDamage);

    addLog(`Монстр атакував героя на ${monsterDamage} шкоди.`);
    updateScreen();

    if (!hero.isAlive()) {
        addLog('Монстр переміг. Спробуй ще раз!');
        finishGame();
    }
});

// Лікування героя
healButton.addEventListener('click', () => {
    if (!hero.isAlive() || !monster.isAlive()) return;

    hero.heal(15);
    addLog('Герой відновив 15 одиниць здоров’я.');
    updateScreen();

    const damage = randomDamage();
    hero.takeDamage(damage);
    addLog(`Поки герой лікувався, монстр завдав ${damage} шкоди.`);
    updateScreen();

    if (!hero.isAlive()) {
        addLog('Монстр переміг. Спробуй ще раз!');
        finishGame();
    }
});

// Завершення бою
function finishGame() {
    attackButton.disabled = true;
    healButton.disabled = true;
}

// Початок нової гри
restartButton.addEventListener('click', () => {
    hero.health = hero.maxHealth;
    monster.health = monster.maxHealth;

    attackButton.disabled = false;
    healButton.disabled = false;
    log.innerHTML = '';

    addLog('Новий бій починається!');
    updateScreen();
});

updateScreen();
