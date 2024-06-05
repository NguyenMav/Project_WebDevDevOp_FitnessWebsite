const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    }
    console.log('Connected to the database.');
});

app.use(express.static(path.join(__dirname, 'public_html')));

app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    db.run('INSERT INTO Subscribers (email) VALUES (?)', [email], (err) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Subscription successful');
    });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    db.run('INSERT INTO Contacts (name, email, message) VALUES (?, ?, ?)', [name, email, message], (err) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Contact form submitted successfully');
    });
});

app.post('/book-coaching', (req, res) => {
    const { name, email, phone, session, goal } = req.body;
    db.run('INSERT INTO Coaching (name, email, phone, session, goal) VALUES (?, ?, ?, ?, ?)', [name, email, phone, session, goal], (err) => {
        if (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
        }
        res.status(201).send('Coaching session booked successfully');
    });
});

app.get('/subscribers', (req, res) => {
    db.all('SELECT * FROM Subscribers', [], (err, rows) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.send(renderTable('Subscribers', rows));
    });
});
  
app.get('/contacts', (req, res) => {
    db.all('SELECT * FROM Contacts', [], (err, rows) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.send(renderTable('Contacts', rows));
    });
});
  
app.get('/coaching-bookings', (req, res) => {
    db.all('SELECT * FROM Coaching', [], (err, rows) => {
        if (err) {
        return res.status(500).send('Internal Server Error');
        }
        res.send(renderTable('Coaching Bookings', rows));
    });
});

function renderTable(title, rows) {
    let html = `
        <html>
        <head>
            <title>${title}</title>
            <style>
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            </style>
        </head>
        <body>
            <h1>${title}</h1>
            <table>
            <tr>`;

    if (rows.length > 0) {
        Object.keys(rows[0]).forEach(column => {
        html += `<th>${column}</th>`;
        });
        html += `</tr>`;
        rows.forEach(row => {
        html += `<tr>`;
        Object.values(row).forEach(value => {
            html += `<td>${value}</td>`;
        });
        html += `</tr>`;
        });
    } else {
        html += `<tr><td>No data available</td></tr>`;
    }

    html += `
            </table>
        </body>
        </html>`;
    return html;
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'about.html'));
});

app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'blog.html'));
});

app.get('/coaching', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'coaching.html'));
});

app.get('/merchandise', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'merchandise.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public_html', 'contact.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public_html', '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});