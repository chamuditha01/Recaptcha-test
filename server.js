const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

// Your Google reCAPTCHA Secret Key
const secretKey = '6Lec-icqAAAAAPSJuF7JScv6FC8MVybGowxB2w_h';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/login', async (req, res) => {
    const { username, password, 'g-recaptcha-response': captcha } = req.body;

    // Log the received data
    console.log('Received data:', { username, password, captcha });

    if (!captcha) {
        console.log('No reCAPTCHA response provided.');
        return res.send('Please complete the reCAPTCHA.');
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    try {
        // Log the verification URL
        console.log('Verifying reCAPTCHA with URL:', verifyUrl);

        const response = await axios.post(verifyUrl);
        console.log('reCAPTCHA verification response:', response.data);

        const { success } = response.data;

        if (!success) {
            console.log('reCAPTCHA verification failed.');
            return res.send('Failed reCAPTCHA verification.');
        }

        // Check username and password (this is just a placeholder)
        if (username === 'admin' && password === 'password') {
            console.log('Login successful for:', username);
            return res.send('Login successful!');
        } else {
            console.log('Invalid login attempt for:', username);
            return res.send('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error during reCAPTCHA verification:', error);
        return res.status(500).send('An error occurred during reCAPTCHA verification.');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
