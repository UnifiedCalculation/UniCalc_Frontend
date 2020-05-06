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

export async function getEntriesFromContract(projectId, contractId, onError, callback) {
  axios.get('projects/' + projectId + '/contracts/' + contractId + '/entries')
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function getEntriesFromInvoice(projectId, invoiceId, onError, callback) {
  axios.get('projects/' + projectId + '/invoices/' + invoiceId + '/entries')
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function getProjects(onError, callback) {
  axios.get('projects')
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function getUserProjects(onError, callback) {
  axios.get('user/projects')
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function getContracts(onError, callback) {
  axios.get('contracts')
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function getUserContracts(onError, callback) {
  axios.get('user/contracts')
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

export async function getContractsFromProject(projectId, onError, callback) {
  axios.get('projects/' + projectId + '/contracts')
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function getInvoicesFromProject(projectId, onError, callback) {
  axios.get('projects/' + projectId + '/invoices')
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function deleteOfferFromProject(projectId, offerId, onError, callback){
  axios.delete('projects/' + projectId + '/offers/' + offerId)
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function deleteInvoiceFromProject(projectId, invoiceId, onError, callback){
  axios.delete('projects/' + projectId + '/invoices/' + invoiceId)
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function turnOfferIntoContract(projectId, offerId, onError, callback) {
  axios.post('projects/' + projectId + '/contracts', {offer_id: offerId})
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function turnContractIntoInvoice(projectId, contractId, onError, callback) {
  axios.post('projects/' + projectId + '/invoices', {contract_id: contractId})
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

export async function saveContractToProject(projectId, contract, onError, callback) {
  axios.post('projects/' + projectId + '/contracts', contract)
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

export async function deleteContractFromProject(projectId, contractId, onError, callback) {
  axios.delete('projects/' + projectId + '/contracts/' + contractId)
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function getUserData(onError, callback){
    axios.get('user')
        .then(res => {
            if (callback) {
                callback(res.data);
            }
        })
        .catch(error => handleErrors(error, onError));
}

export async function addArticleToEntry(projectId, offerId, entryId, article, onError, callback) {
  axios.post('projects/' + projectId + '/offers/' + offerId + '/entries/' + entryId + '/products', article)
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

export async function getOfferAsPDF(projectId, offerId, onError, callback) {
  if (offerId) {
    axios.get('projects/' + projectId + '/offers/' + offerId + '/pdf')
        .catch(error => handleErrors(error, onError));
  } else {
    onError("Can't get Offer as PDF as it has no ID!")
  }
}

export async function getContractAsPDF(projectId, contracId, onError, callback) {
  if (contracId) {
    axios.get('projects/' + projectId + '/contracts/' + contracId + '/pdf')
        .catch(error => handleErrors(error, onError));
  } else {
    onError("Can't get Offer as PDF as it has no ID!")
  }
}

export async function getInvoiceAsPDF(projectId, invoiceId, onError, callback) {
  if (invoiceId) {
    axios.get('projects/' + projectId + '/invoices/' + invoiceId + '/pdf')
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

export async function getNpks(onError, callback) {
  axios.get('npks')
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function getProducts(onError, callback) {
  axios.get('products')
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function submitNewProduct(articleData, onError, callback) {
  axios.post('products', articleData)
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

export async function getContractData(projectId, contractId, onError, callback) {
  axios.get('projects/' + projectId + '/contracts/' + contractId)
      .then(res => {
        if (callback) {
          callback(res.data);
        }
      })
      .catch(error => handleErrors(error, onError));
}

export async function getInvoiceData(projectId, invoiceId, onError, callback) {
  axios.get('projects/' + projectId + '/invoices/' + invoiceId)
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
