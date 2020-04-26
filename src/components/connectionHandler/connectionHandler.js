import axios from 'axios';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:800';
}

function handleErrors(error, callback) {
    if (error.response) {
        callback("Konnte nicht verbinden HTTP" + error.response.status);
    } else if (error.request) {
        callback("Anweisung konnte nicht ausgeführt werden HTTP" + error.request.status);
    } else {
        callback("Kritischer Fehler: " + error.message);
    }
}

export async function getEntriesFromOffer(projectId, offerId, onError, callback) {
    axios.get('projects/' + projectId + '/offers/' + offerId + '/entries')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getUserProjects(onError, callback) {
    axios.get('projects')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}


export async function updateEntryData(projectId, offerId, entryId, entry, onError, callback) {
    axios.put('projects/' + projectId + '/offers/' + offerId + '/entries/' + entryId, entry)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getEntryData(projectId, offerId, entryId, onError, callback) {
    axios.get('projects/' + projectId + '/offers/' + offerId + '/entries/' + entryId)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getProjectData(projectId, onError, callback) {
    axios.get('projects/' + projectId)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getOffersFromProject(projectId, onError, callback) {
    axios.get('projects/' + projectId + '/offers')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function turnOfferIntoContract(projectId, offerId, onError, callback) {
    axios.post('projects/' + projectId + '/contracts', { offer_id: offerId })
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function saveOfferToProject(projectId, offer, onError, callback) {
    axios.post('projects/' + projectId + '/offers', offer)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function deleteEntryFromOffer(projectId, offerId, entryId, onError, callback) {
    axios.delete('projects/' + projectId + '/offers/' + offerId + '/entries/' + entryId)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function addArticleToEntry(projectId, offerId, entryId, article, onError, callback) {
    axios.post('projects/' + projectId + '/offers/' + offerId + '/entries/' + entryId + '/articles', article)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function addNewEntryToOffer(projectId, offerId, entry, onError, callback) {
    axios.post('projects/' + projectId + '/offers/' + offerId + '/entries', entry)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function updateOffer(projectId, offer, onError, callback) {
    axios.put('projects/' + projectId + '/offers/' + offer.id, offer)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getOfferAsPDF(projectId, offer, onError, callback) {
    if (offer.id) {
        axios.get('projects/' + projectId + '/offers/' + offer.id)
            .catch(error => handleErrors(error, onError));
    } else {
        onError("Can't get Offer as PDF as it has no ID!")
    }
}


export async function getArticles(onError, callback) {
    axios.get('articles')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getOfferData(projectId, offerId, onError, callback) {
    axios.get('projects/' + projectId + '/offers/' + offerId)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function submitNewProject(projectData, onError, callback) {
    axios.post('projects', projectData)
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function getCustomers(onError, callback) {
    axios.get('customers')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}
