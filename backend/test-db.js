// Script untuk test koneksi database dan mapping field
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function testDatabaseConnection() {
    try {
        console.log('🔄 Testing database connection...');
        
        // Test koneksi
        const client = await pool.connect();
        console.log('✅ Database connected successfully');
        
        // Test query professors
        console.log('\n🔄 Testing professors query...');
        const result = await client.query(`
            SELECT id, name, photo_url, nuptk, position, start_date, verified, faculty 
            FROM professors 
            LIMIT 3
        `);
        
        console.log(`✅ Found ${result.rows.length} professors`);
        
        // Show raw data
        console.log('\n📊 Raw data from database:');
        result.rows.forEach((row, index) => {
            console.log(`\n--- Professor ${index + 1} ---`);
            console.log(`ID: ${row.id}`);
            console.log(`Name: ${row.name}`);
            console.log(`Photo URL: ${row.photo_url || 'NULL'}`);
            console.log(`Position: ${row.position}`);
            console.log(`Start Date: ${row.start_date}`);
        });
        
        // Test mapping transformation
        console.log('\n🔄 Testing field mapping...');
        const mappedData = result.rows.map(p => ({
            ...p,
            photoUrl: p.photo_url,
            startDate: p.start_date,
            photo_url: undefined,
            start_date: undefined,
        }));
        
        console.log('\n📊 Mapped data (like frontend receives):');
        mappedData.forEach((row, index) => {
            console.log(`\n--- Mapped Professor ${index + 1} ---`);
            console.log(`ID: ${row.id}`);
            console.log(`Name: ${row.name}`);
            console.log(`PhotoURL (camelCase): ${row.photoUrl || 'NULL'}`);
            console.log(`photo_url (should be undefined): ${row.photo_url}`);
            console.log(`Position: ${row.position}`);
            console.log(`StartDate (camelCase): ${row.startDate}`);
        });
        
        client.release();
        
    } catch (err) {
        console.error('❌ Database test failed:', err);
    } finally {
        await pool.end();
    }
}

// Run test
testDatabaseConnection();
