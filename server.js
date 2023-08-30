const express = require('express');
const PORT = process.env.PORT || 3001;
const cors = require('cors');
require('dotenv').config();
const openai = require('./src/ai.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded())
app.use(cors());

// step 1 - access the USSD
app.get('/', (_req, res) => res.send('Welcome, Get Information on Agriculture'));


app.post('/ussd', async (req, res) => {
    const { text } = req.body;

    let response = '';

    const textParts = text.split('*');

    if (text === '') {
        response = 'CON Welcome to Kilimo/Karibu kwenye Kilimo\n Please select a language to continue:/Changua Lugha ili kuendelea:\n 1. English \n 2. Kiswahili\n 0. Exit/Toka'
    } else if (textParts[0] === '1' || textParts[0] === '2') {
        const selectedLanguage = textParts[0]; // 1 for English, 2 for Kiswahili

        if (textParts.length > 1) {
            const question = textParts[1];
            let outcome = {};

            if (selectedLanguage === '1') {
                outcome = await openai.askAboutAgriculture(question);
            } else if (selectedLanguage === '2') {
                outcome = await openai.askAboutAgriculture(question);
            }

            if (outcome.status === 'success') {
                response = `END ${outcome.message}`
            } else {
                response = selectedLanguage === '1' ? 'END Sorry, an error occurred. Please try again.' : 'END Samahani, kosa limetokea. Tafadhali jaribu tena.';
            }
        } else {
            response = selectedLanguage === '1'
                ? 'CON Please ask any Agricultural related question. For example: How to plant maize'
                : 'CON Tafadhali uliza swali lolote kuhusu ukulima. Kwa mfano: Jinsi ya kupanda mahindi?';
        }
    } else if (text === '0') {
        response = 'END You have exited Kilimo. Thank you for using our service./Umefunga Kilimo. Asante kwa kutumia huduma yetu';
    } else {
        response = 'END Invalid input. Please try again/Ingizo batili. Tafadhali jaribu tena.'
    }

    res.set('Content-Type: text/plain');
    res.send(response);
});

app.use('*', (_req, res) => res.status(400).send('Invalid route. Please check your URL and try again.'));

app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
});