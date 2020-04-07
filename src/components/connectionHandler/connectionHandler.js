import axios from 'axios';


export async function loginUser(username, password, callback) {
    axios.post('/user/login', { username, password })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(error => console.log(error));
}

export async function getUserProjects(callback) {
    /*
    axios.get('company/projects')
    .then(res => {
        console.log(res);
        console.log(res.data);
        if(callback){
            callback(res.data);
        }
    });
    */
    const testProjectData = [
        {
            project_id: 1272,
            project_name: "Villa am See",
            description: "Neubau in Zürich"
        },
        {
            project_id: 1273,
            project_name: "Villa am Berg",
            description: "Neubau in Chur"
        },
        {
            project_id: 1274,
            project_name: "Villa am See",
            description: "Neubau in Zürich"
        },
        {
            project_id: 1275,
            project_name: "Villa am Berg",
            description: "Neubau in Chur"
        }
    ]
    callback(testProjectData);
}

export async function getProjectData(projectId, callback) {
    /*
    axios.get('company/projects/' + projectId)
    .then(res => {
        console.log(res);
        console.log(res.data);
        if(callback){
            callback(res.data);
        }
    });
    */

    const projectData = {
        "id": 1,
        "customer_id": 1,
        "company_id": 1,
        "name": "Testproject",
        "address": "Teststreet 123",
        "zip": "8001",
        "city": "Zurich",
        "created_at": "2020-04-07T15:44:02.921Z",
        "updated_at": "2020-04-07T15:44:02.921Z",
        "description": "This is a test Project",
        "payment_target": "30 Tage"
    }

    callback(projectData);
}

export async function getOffersFromProject(projectId, callback) {
    const offerData = [
        {
            offer_name: "name 1",
            description: "beschreibung"
        },
        {
            offer_name: "name 2",
            description: "beschreibung"
        }
    ]

    callback(offerData);
}

export async function submitNewProject(projectData, callback) {
    axios.post('projects/new', projectData)
        .then(callback);
}

export async function getCustomers(callback) {
    /*
    axios.get('company/customers')
    .then(res => {
        console.log(res);
        console.log(res.data);
        if(callback){
            callback(res.data);
        }
    });
    */
    const testCustomerData = [
        {
            name: "Name one",
            customer_id: 1234
        },
        {
            name: "Name two",
            customer_id: 1235
        },
        {
            name: "Name three",
            customer_id: 1236
        }
    ]
    callback(testCustomerData);
}