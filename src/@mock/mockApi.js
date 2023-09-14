// mock-api/mockApi.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import keys from '../config/keys';
import validateLoginInput from './validation/user_v'

// Create a mock Axios instance
const mockApi = axios.create();

const mock = new MockAdapter(mockApi);

// Define mock data
const mockData = {
    items: [
        {
            id: 1,
            name: 'Item 1'
        }, {
            id: 2,
            name: 'Item 2'
        }, {
            id: 3,
            name: 'Item 3'
        },
    ]
};

const payload = {
    email: "test@email.com",
    password: "12345678"
}

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdEBlbWFpbC5jb20iLCJpYXQiOjE2OTQ1OTkwMTAsImV4cCI6MTY5NDYwMjYxMH0.engACKa5bHIT4pF9E-93-x6vnludhoH9qncvZHvHHnk"

// Intercept GET requests to /items and return mock data
mock.onGet('/items').reply(200, mockData.items);

mock.onPost('/test').reply(config => { // Get the data from the request body

    const requestData = JSON.parse(config.data);

    // Access specific POST parameters
    const {param1, param2} = requestData;

    // Customize the response based on the POST parameters
    if (param1 === 'value1' && param2 === 'value2') {
        return [
            200, {
                message: 'Success'
            }
        ];
    } else {
        return [
            400, {
                error: 'Invalid parameters'
            }
        ];
    }
});


mock.onPost('/api/users/login').reply(config => { // Get the data from the request body
    const requestData = JSON.parse(config.data);
    const {email, password, remember} = requestData;

    const {errors, isValid} = validateLoginInput(requestData);

    // Check validation
    if (!isValid) { // return res.status(400).json(errors);
        return [
            400, {
                ...errors
            }
        ]
    }

    if (email != "test@email.com" || password != "321321321") {
        errors.login_failed = "Wrong email or password";
        return [
            400, {
                ...errors
            }
        ]
    }

    return [
        200, {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdEBlbWFpbC5jb20iLCJpYXQiOjE2OTQ3MTkyNDMsImV4cCI6MTcyNTgyMzI0M30.AaLTDnCBaDrNy1bKdHKIY7MsSOFogy_u3PC1awhLd0c"
        }
    ]
});

export default mockApi;
