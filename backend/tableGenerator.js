const { sequelize } = require('./models'); // Підключення до бази даних
const Table = require('cli-table3'); // Імпорт бібліотеки для створення таблиць

async function getSummaryData() {
    try {
        // Запити до бази даних
        const [totalConsumption] = await sequelize.query(`
            SELECT SUM(amount) AS totalConsumption
            FROM consumptions
            WHERE resourceId = (SELECT id FROM resources WHERE name = 'Електроенергія')
        `);

        const [totalCost] = await sequelize.query(`
            SELECT SUM(amount * tariff) AS totalCost
            FROM consumptions
            WHERE resourceId = (SELECT id FROM resources WHERE name = 'Електроенергія')
        `);

        const [totalProduction] = await sequelize.query(`
            SELECT SUM(productionVolume) AS totalProduction
            FROM productions
        `);

        // Формування об'єкта data
        const data = {
            "Споживання електроенергії": totalConsumption[0]?.totalConsumption || 0,
            "Витрати на електроенергію": Math.floor(totalCost[0]?.totalCost || 0),
            "Обсяги виробництва продукції та послуг": totalProduction[0]?.totalProduction || 0,
        };

        return data;
    } catch (error) {
        console.error('Помилка під час отримання даних:', error);
        throw error;
    }
}

// Виклик функції для отримання даних та малювання таблиці
getSummaryData()
    .then(data => {
        // Ініціалізація таблиці
        const table = new Table({
            head: ['Показник', 'Значення'], // Заголовки таблиці
            colWidths: [40, 20], // Ширина колонок
        });

        // Додавання даних до таблиці
        for (const [key, value] of Object.entries(data)) {
            table.push([key, value]);
        }

        // Виведення таблиці у консоль
        console.log(table.toString());
    })
    .catch(err => console.error('Помилка:', err));
