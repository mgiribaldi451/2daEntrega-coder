let admin = require('firebase-admin')
let FieldValue = require('firebase-admin').firestore.FieldValue
// let { FIRESTORE_FILE } = require('../config/globals')
// const FIRESTORE_PATH_FILE = require(FIRESTORE_FILE)
const GOOGLE_APPLICATION_CREDENTIALS ={
    "type": "service_account",
    "project_id": "backend-coder-9bf30",
    "private_key_id": "fe4ed7cb6897c22057db78590b81ad8ddc2ad0cd",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCOsjvEkRQZncQt\n3yWrSIz1Kh5WJQMCQknxbBAnJ5Qc10jNkPNwUoMXYPh8AFrE0gB8hSKC6EyGq8cL\nvR94cjfe7SYOHxWjOqkn/GEYsCf8tYmNvMbQ1qZDgycKwZfKd5cNNGUoJWxO6ClY\nsTv0fFAHAvUHQ7C+qltX2ztoa9VO+/pwgQHAfeITN/Um27tIDxmHEIqlNYjgvzE/\nTdQEuPl1GI3a/hz1O/HarchWtTFhTJLMfvwPJQM5NyF6nKneaJ4PhdljLsv4kCMQ\nE96rvpciwPWeA0/tFdD1JB43/Bv49sYB7dudpZ38w3dFvsIjL+RF0alOiPBpGkg/\nfMfNalYnAgMBAAECggEAL5yiupyZs05jxdZ98B++AJN0GdQxo9BQccBXx2i6T8E5\nZnWl9GVjnipZ3q4TmzZiuSmG8VznI8wvFuicloitwbEpEG8ovhT1mgTotN8aCITe\nB6/kOoxUX5RkM3+S0RiECwDfe7y43b8zBIfmdFYCMcS30xuv3n5jCfZ5ZQcN3lNP\nheIU4D2C2KCNsVL32qGxnHXUDt+PE1qa0JZW6i/uA7NEw7AYgWhOR/vOnamfWJR7\n/n1vHiQ/FVbQWg2ypE4fFAHiBH9dIGfMEbn9h1GRdhGjcIzcxIHNl6fBhDq2Hgqf\nT54LCd7jMDoWsaMoh3vw37h6izFP8un58upgvr9tOQKBgQDF9vND3z2UFbEVjJYZ\nyrFl4URYEu30v0Z7/XlXxFRsWT9LDpI/2Zp3Lo644vVxZ3BjSJLaoTZySpicf7kk\nkU12w1+7zIDncHfJtbeUxGXnF03hLCtkFpexjmdk+/RfNST31nAqT0iFanDcB9JM\nvB+F0ySphEKQpOOrcO3cfJcm2wKBgQC4h3FmzGVwTWZk48v61+ETj/trBtch1cDk\nbEc+m3bk2K53RTqcCKTdvxj6MryKw8NuFB08I2xkTzFOoxWqe6gLX9o6yCAxozWx\nemn4qgv2L7qRxHUJ/bpyyTCuRttOAa7g+v7xhVFdX4KtRirPEl52i5Kesen9zGjB\nfJHBnQlRpQKBgHg4Et0Z2fRvA95ZROIe1IJRPcbaoAUsj2pGsQTapoYx4Jz9GVWL\nGSHddTDUK0eWEItKjFwW4NChenI3okCRuOAxn5aVh4aFJ0mof/bpGhUvcs0WnLco\nfTCHkUSjOXED/hI/+FfJU/opfKYyXcTZza7gXXhQaHgcmmIHr3thcg1XAoGATTJU\nbbYKpc2rjX+DAUC4528vthmZfI0o8iaeM4HkXl6Ltlfe6hHvrtjYQStilwbIxk9h\n35vOJ7S9ovE1CipLJd8Gs9qvJTTrLIFSvfWdpXNYMM0oTXK5QnYKiI4aButLVtGK\nQE4OuOpRB9434IMFw8AmKX+yrTuLg45yh7YDhQUCgYB6yyhZmoZqcz+3eeFBU99/\noWXpX6AmxGs2dZAPnOWQ074xTulA8CFEHZh5Dl/1sP2d8A8UQTW9hiPzGibnm/Qt\nrXaAkhnUViVoG1+HsEOIrsmPUxKpfc/P6VtE0y3VM8uXqxxD5tpJcyzcNp4dvcd1\nlgMqTM+UA39mPRpy0Bp4eQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-2y1xx@backend-coder-9bf30.iam.gserviceaccount.com",
    "client_id": "108069784813636869526",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2y1xx%40backend-coder-9bf30.iam.gserviceaccount.com"
  }
admin.initializeApp({
  credential: admin.credential.cert(GOOGLE_APPLICATION_CREDENTIALS)
})

const db = admin.firestore()

class ContainerFirestore {
  constructor(collection){
    this.collection = db.collection(collection)
    console.log(`Base conectada con la collection ${collection}`)
  }

  async save(document, id){
    let doc = this.collection.doc(`${id}`)
    let item = await doc.create(document)
    return item
  }

  async getAll(){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    return result
  }

  async getById(id){
    let result = await this.collection.get()
    result = result.docs.map(doc => ({ 
      id: doc.id,
      data: doc.data()
    }))
    let item = result.find(elem => elem.id == id)
    return item
  }

  async delete(id){
    let doc = this.collection.doc(`${id}`)
    let item = doc.delete()
    return ({ status: 'Deleted' })
  }

  async update(content, id){
    let doc = this.collection.doc(`${id}`)
    let item = await doc.update(content)
    return item
  }

  async addProdToCart(content, id){
    let doc = this.collection.doc(`${id}`)
     const upd = []
     upd.push(content)
    let item = await doc.update({products:FieldValue.arrayUnion(...upd)})
    return item
  }
}

module.exports = { ContainerFirestore }