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
            const E_consumptionQuery = `
                SELECT month, SUM(amount) AS totalConsumption 
                FROM consumptions 
                WHERE resourceId = (SELECT id FROM resources WHERE name = 'Електроенергія') 
                  AND buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;
            const E_costQuery = `
                SELECT month, SUM(amount * tariff) AS totalCost 
                FROM consumptions 
                WHERE resourceId = (SELECT id FROM resources WHERE name = 'Електроенергія') 
                  AND buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;
            const W_consumptionQuery = `
                SELECT month, SUM(amount) AS totalConsumption
                FROM consumptions
                WHERE resourceId = (SELECT id FROM resources WHERE name = 'Вода')
                  AND buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;
            const W_costQuery = `
                SELECT month, SUM(amount * tariff) AS totalCost 
                FROM consumptions 
                WHERE resourceId = (SELECT id FROM resources WHERE name = 'Вода') 
                  AND buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;
            const G_consumptionQuery = `
                SELECT month, SUM(amount) AS totalConsumption
                FROM consumptions
                WHERE resourceId = (SELECT id FROM resources WHERE name = 'Газ')
                  AND buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;
            const G_costQuery = `
                SELECT month, SUM(amount * tariff) AS totalCost 
                FROM consumptions 
                WHERE resourceId = (SELECT id FROM resources WHERE name = 'Газ') 
                  AND buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;
            const productionQuery = `
                SELECT month, SUM(productionVolume) AS totalProduction 
                FROM productions 
                WHERE buildingId IN (SELECT id FROM buildings WHERE buildingId = :buildingId)
                GROUP BY month
            `;

            const [E_consumptionData] = await sequelize.query(E_consumptionQuery, { replacements: { buildingId } });
            const [E_costData] = await sequelize.query(E_costQuery, { replacements: { buildingId } });
            const [W_consumptionData] = await sequelize.query(W_consumptionQuery, { replacements: { buildingId } });
            const [W_costData] = await sequelize.query(W_costQuery, { replacements: { buildingId } });
            const [G_consumptionData] = await sequelize.query(G_consumptionQuery, { replacements: { buildingId } });
            const [G_costData] = await sequelize.query(G_costQuery, { replacements: { buildingId } });
            const [productionData] = await sequelize.query(productionQuery, { replacements: { buildingId } });

            // Функція для заповнення даних по місяцях
            const fillRow = (data, field) =>
                months.map(month => data.find(item => item.month === month.month)?.[field] || 0);

            // Додавання рядків до таблиці
            table.push(
                ['Споживання електроенергії', ...fillRow(E_consumptionData, 'totalConsumption')],
                ['Витрати на електроенергію', ...fillRow(E_costData, 'totalCost')],
                ['Споживання води', ...fillRow(W_consumptionData, 'totalConsumption')],
                ['Витрати на воду', ...fillRow(W_costData, 'totalCost')],
                ['Споживання газу', ...fillRow(G_consumptionData, 'totalCost')],
                ['Витрати на газ', ...fillRow(G_costData, 'totalCost')],
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
