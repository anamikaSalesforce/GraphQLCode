import { LightningElement,wire } from 'lwc';
import {gql,graphql} from 'lightning/uiGraphQLApi';

export default class GraphQLAccounts extends LightningElement {
  results;
  errors;

 @wire(graphql, {
    query: gql`
      query GetContacts {
        uiapi {
          query {
            Contact(where:{Account:{
              Rating:{eq:"Hot"}}}) {
              edges {
                node {
                  Id
                  Name {
                    value
                  }
                }
              }
            }
          }
        }
    }`,
 })
   
  graphqlQueryResult({ data, errors }) {
    if (data) {
      this.results = data.uiapi.query.Contact.edges.map((edge) => edge.node);
      console.log("🚀 ~ this.results:", JSON.stringify(this.results));
    }
    this.errors = errors;
  }
}