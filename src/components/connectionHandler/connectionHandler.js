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

export async function updateEntryData(projectId, offerId, entryId, entry, onError, callback) {
    instance.put('projects/' + projectId + '/offers/' + offerId + '/entries/' + entryId, entry)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getEntryData(projectId, offerId, entryId, onError, callback) {
    instance.get('projects/' + projectId + '/offers/' + offerId + '/entries/' + entryId)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getProjectData(projectId, onError, callback) {
    instance.get('projects/' + projectId)
        .then(res => {
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
        })
        .catch(error => handleErrors(error, onError));
}

export async function getArticles(callback) {

    axios.get('articles')
export async function getOffersFromProject(projectId, onError, callback) {
    instance.get('projects/' + projectId + '/offers')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getOfferData(projectId, offerId, callback) {
    axios.get('projects/' + projectId + '/offers/' + offerId)
export async function turnOfferIntoContract(projectId, offerId, onError, callback) {
    instance.post('projects/' + projectId + '/contracts', { offer_id: offerId })
    .then(res => {
        if (callback) {
            callback(res.data);
        }
    })
    .catch(error => handleErrors(error, onError));
}

export async function saveOfferToProject(projectId, offer, onError, callback) {
    instance.post('projects/' + projectId + '/offers', offer)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function deleteEntryFromOffer(projectId, offerId, entryId, onError, callback) {
    instance.delete('projects/' + projectId + '/offers/' + offerId + '/entries/' + entryId)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function addArticleToEntry(projectId, offerId, entryId, article, onError, callback) {
    instance.post('projects/' + projectId + '/offers/' + offerId + '/entries/' + entryId +'/articles', article)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
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

