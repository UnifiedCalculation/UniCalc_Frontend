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
        })
        .catch(error => handleErrors(error, onError));
}

export async function getOffersFromProject(projectId, onError, callback) {
    instance.get('projects/' + projectId + '/offers')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

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


