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
    axios.get('company/projects')
        .then(res => {
            console.log(res);
            console.log(res.data);
            if (callback) {
                callback(res.data);
            }
        });
    /*
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
    */
}

export async function postNewOfferToProject(projectId, offer, callback) {
    axios.post('company/projects/' + projectId + "/offer/new", offer)
    .then(()=> callback ? callback() : null);
}

export async function getProjectData(projectId, callback) {
    axios.get('company/projects/' + projectId)
        .then(res => {
            console.log(res);
            console.log(res.data);
            if (callback) {
                callback(res.data);
            }
        });
    /*
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
    */
}

export async function getOffersFromProject(projectId, callback) {
    axios.get('company/projects/' + projectId + '/offers')
        .then(res => {
            console.log(res);
            console.log(res.data);
            if (callback) {
                callback(res.data);
            }
        });
    /*
    const offerData = [
        {
          id: 2,
          project_id: 1,
          name: "Offer 1",
          created_at: "2020-04-07T17:57:37.468Z",
          updated_at: "2020-04-07T17:57:37.468Z",
          discount: null,
          employee_id: null
        },
        {
          id: 3,
          project_id: 1,
          name: "Offer 2",
          created_at: "2020-04-07T17:58:24.185Z",
          updated_at: "2020-04-07T17:58:24.185Z",
          discount: null,
          employee_id: null
        }
      ]

    callback(offerData);
      */
}

export async function saveOfferToProject(projectId, offer, callback) {
    offer.id ?
        axios.post('company/projects/' + projectId + '/offers/' + offer.id, { offer })
            .then(res => {
                if (callback) {
                    callback();
                }
            })
        :
        axios.post('company/projects/' + projectId + '/offers', { offer })
            .then(res => {
                if (callback) {
                    callback();
                }
            });
}

export async function getOfferAsPDF(projectId, offer) {
    if(offer.id){
        axios.get('company/projects/' + projectId + '/offers/' + offer.id);
    }
}

export async function getArticles(callback) {

    axios.get('company/articles')
        .then(res => {
            console.log(res);
            console.log(res.data);
            if (callback) {
                callback(res.data);
            }
        });


    /*
    const articles = [
        {
            name: "Steckdose T13 3-fach UP weiss",
            article_id: 1234123,
            unit: "Stk.",
            price: 125.80,
        },
        {
            name: "Steckdose T13 3-fach AP weiss",
            article_id: 1234124,
            unit: "Stk.",
            price: 220.25,
        }
    ]

    callback(articles);
    */
}

export async function getOfferData(projectId, offerId, callback) {
    axios.get('company/projects/' + projectId + '/offers/' + offerId)
    .then(res => {
        console.log(res);
        console.log(res.data);
        if (callback) {
            callback(res.data);
        }
    });

    /*
    const offer = {
        name: "offer 1",
        entries: [
            {
                name: "badezimmer",
                discount: null,
                articles: [
                    {
                        name: "Steckdose T13 3-fach UP weiss",
                        article_id: 1234123,
                        unit: "Stk.",
                        price: 125.80,
                        amount: 15,
                        discount: null
                    },
                    {
                        name: "Steckdose T13 3-fach AP weiss",
                        article_id: 1234124,
                        unit: "Stk.",
                        price: 220.25,
                        amount: 120,
                        discount: 7.35
                    }
                ]
            },
            {
                name: "wohnzimmer",
                discount: 50,
                articles: [
                    {
                        name: "Steckdose T13 3-fach UP weiss",
                        article_id: 1234123,
                        unit: "Stk.",
                        price: 125.80,
                        amount: 235,
                        discount: 13.37
                    },
                    {
                        name: "Steckdose T13 3-fach AP weiss",
                        article_id: 1234124,
                        unit: "Stk.",
                        price: 220.25,
                        amount: 120,
                        discount: 7.35
                    }
                ]
            }
        ]
    }

    callback(offer);
    */
}

export async function submitNewProject(projectData, callback) {
    axios.post('projects/new', projectData)
        .then(callback);
}

export async function getCustomers(callback) {
    axios.get('company/customers')
    .then(res => {
        console.log(res);
        console.log(res.data);
        if(callback){
            callback(res.data);
        }
    });

    /*
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
    */
}