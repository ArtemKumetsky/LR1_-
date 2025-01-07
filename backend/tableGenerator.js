const { sequelize } = require('./models'); // Підключення до бази даних
const Table = require('cli-table3'); // Імпорт бібліотеки для створення таблиць

async function getbuildingDataWithMonths() {
    try {
        // Отримання списку підприємств
        const [buildings] = await sequelize.query(`
            SELECT id, name
            FROM buildings
        `);

        for (const building of buildings) {
            const buildingId = building.id;
            const buildingName = building.name;

            console.log(`\nПідприємство: ${buildingName}`);

            // Отримання списку місяців
            const [months] = await sequelize.query(`
                SELECT DISTINCT month 
                FROM productions 
                WHERE buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                ORDER BY month
            `, { replacements: { buildingId } });

            // Формування заголовків таблиці
            const monthHeaders = months.map(month => `Місяць ${month.month}`);
            const table = new Table({
                head: ['Показник', ...monthHeaders], // Заголовки таблиці
                colWidths: [35, ...monthHeaders.map(() => 13)], // Ширина колонок
            });

            // Запити до бази даних для кожного показника
            const consumptionQuery = `
                SELECT month, SUM(amount) AS totalConsumption 
                FROM consumptions 
                WHERE resourceId = (SELECT id FROM resources WHERE name = 'Електроенергія') 
                  AND buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;
            const costQuery = `
                SELECT month, SUM(amount * tariff) AS totalCost 
                FROM consumptions 
                WHERE resourceId = (SELECT id FROM resources WHERE name = 'Електроенергія') 
                  AND buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;
            const productionQuery = `
                SELECT month, SUM(productionVolume) AS totalProduction 
                FROM productions 
                WHERE buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;

            const [consumptionData] = await sequelize.query(consumptionQuery, { replacements: { buildingId } });
            const [costData] = await sequelize.query(costQuery, { replacements: { buildingId } });
            const [productionData] = await sequelize.query(productionQuery, { replacements: { buildingId } });

            // Функція для заповнення даних по місяцях
            const fillRow = (data, field) =>
                months.map(month => data.find(item => item.month === month.month)?.[field] || 0);

            // Додавання рядків до таблиці
            table.push(
                ['Споживання електроенергії', ...fillRow(consumptionData, 'totalConsumption')],
                ['Витрати на електроенергію', ...fillRow(costData, 'totalCost')],
                ['Обсяги виробництва продукції', ...fillRow(productionData, 'totalProduction')]
            );

            // Виведення таблиці
            console.log(table.toString());
        }
    } catch (error) {
        console.error('Помилка під час отримання даних:', error);
        throw error;
    }
}

// Виклик функції
getbuildingDataWithMonths()
    .then(() => console.log('Вивід завершено'))
    .catch(err => console.error('Помилка:', err));
