// Клас для створення персонажів гри
export class Character {
    constructor(name, health) {
        this.name = name;
        this.maxHealth = health;
        this.health = health;
    }

    // Персонаж отримує шкоду
    takeDamage(damage) {
        this.health = Math.max(0, this.health - damage);
    }

    // Відновлення здоров'я
    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    // Перевірка, чи персонаж живий
    isAlive() {
        return this.health > 0;
    }
}
