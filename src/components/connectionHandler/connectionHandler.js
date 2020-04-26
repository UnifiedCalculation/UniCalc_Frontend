import axios from 'axios';

let instance;

if(process.env.NODE_ENV === 'development') {
    instance = axios.create({baseURL: 'http://localhost:800'});
  }else if(process.env.NODE_ENV === 'production') {
    instance = axios;
  }

function handleErrors(error, callback){
    if(error.response){
        callback("Konnte nicht verbinden HTTP" + error.response.status);
    } else if (error.request) {
        callback("Anweisung konnte nicht ausgeführt werden HTTP" + error.request.status);
    } else {
        callback("Kritischer Fehler: " +error.message);
    }
}

export async function getEntriesFromOffer(projectId, offerId, onError, callback){
    instance.get('projects/' + projectId + '/offers/' + offerId + '/entries')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getUserProjects(onError, callback) {
    instance.get('projects')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function postNewOfferToProject(projectId, offer, callback) {
    axios.post('projects/' + projectId + "/offers", offer)
    .then(()=> callback ? callback() : null);
}

export async function getProjectData(projectId, callback) {
    axios.get('projects/' + projectId)
        .then(res => {
            console.log(res);
            console.log(res.data);
            if (callback) {
                callback(res.data);
            }
        });
}

export async function getOffersFromProject(projectId, callback) {
    axios.get('projects/' + projectId + '/offers')
        .then(res => {
            console.log(res);
            console.log(res.data);
            if (callback) {
                callback(res.data);
            }
        });

}

export async function saveOfferToProject(projectId, offer, callback) {
    offer.id ?
        axios.put('projects/' + projectId + '/offers/' + offer.id, { offer })
            .then(res => {
                if (callback) {
                    callback();
                }
            })
        :
        axios.post('projects/' + projectId + '/offers', { offer })
            .then(res => {
                if (callback) {
                    callback();
                }
            });
}

export async function getOfferAsPDF(projectId, offer) {
    if(offer.id){
        axios.get('projects/' + projectId + '/offers/' + offer.id);
    }
}

export async function getArticles(callback) {

    axios.get('articles')
        .then(res => {
            console.log(res);
            console.log(res.data);
            if (callback) {
                callback(res.data);
            }
        });



}

export async function getOfferData(projectId, offerId, callback) {
    axios.get('projects/' + projectId + '/offers/' + offerId)
    .then(res => {
        console.log(res);
        console.log(res.data);
        if (callback) {
            callback(res.data);
        }
    });

            }
}

export async function submitNewProject(projectData, callback) {
    axios.post('projects', projectData)
        .then(callback);
}

export async function getCustomers(callback) {
    axios.get('companies/customers')
    .then(res => {
        console.log(res);
        console.log(res.data);
        if(callback){
            callback(res.data);
        }
    });

